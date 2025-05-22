"use client";
import PageHeader from "@/app/components/PageHeader";
import { useEffect, useRef, useState } from "react";
import Input from "@/app/components/Input";
import { useAuth } from "@/app/components/AuthProvider";
import { deleteSvg } from "../../cart/page";
import {
  deleteAddresses,
  getAddresses,
  insertAddresses,
  updateAddresses,
} from "@/lib/address-actions";
import { createClient } from "@/utils/supabase/client";
import DeleteDialog from "@/app/components/deleteDialog";

export default function Addresses() {
  const [addresses, setAddresses] = useState([]);
  const [currentSection, setCurrentSection] = useState("AddressesList");
  const [currentAddress, setCurrentAddress] = useState({});
  const { user } = useAuth();
  const deleteRef = useRef(null);

  const sections = {
    AddressesList: (
      <AddressesList
        addresses={addresses}
        setCurrentSection={setCurrentSection}
        setCurrentAddress={setCurrentAddress}
        deleteRef={deleteRef}
      />
    ),
    AddNew: (
      <NewAddressForm
        title={"Add New Address"}
        func={handleInsertAddress}
        setCurrentSection={setCurrentSection}
      />
    ),
    EditAddress: (
      <NewAddressForm
        title={"Update Address"}
        func={handleUpdateAddress}
        setCurrentSection={setCurrentSection}
        isEditing={true}
        currentAddress={currentAddress}
      />
    ),
  };

  useEffect(() => {
    async function getData() {
      const addressData = await getAddresses();
      setAddresses(addressData);
    }

    getData();
  }, [user]);

  async function handleDeleteAddress(id) {
    const error = await deleteAddresses(id);

    if (!error) {
      setAddresses((prev) => prev.filter((address) => address.id !== id));
    } else {
      console.error("Error deleting address:", error);
    }
  }

  async function handleInsertAddress(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData);
    const { title, city, state, street_address, address_line } = formObj;
    const newAddress = {
      title,
      city,
      state,
      street_address,
      address_line,
    };
    const { data, error } = insertAddresses(newAddress);

    console.error("Error adding address:", error);
    if (data && data.length > 0) {
      setAddresses((prev) => [...prev, data[0]]);
    } else if (error) {
      console.error("Error adding address:", error);
    }
    setCurrentSection("AddressesList");
  }

  async function handleUpdateAddress(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData);
    const { title, city, state, street_address, address_line } = formObj;
    const updatedAddress = {
      title,
      city,
      state,
      street_address,
      address_line,
      user_id: user?.id,
    };

    const { data, error } = await updateAddresses(
      updatedAddress,
      currentAddress?.id
    );

    if (data && data.length > 0) {
      setAddresses((prev) =>
        prev.map((address) =>
          address.id === currentAddress.id ? data[0] : address
        )
      );
    } else if (error) {
      console.error("Error updating address:", error);
    }

    setCurrentSection("AddressesList");
  }

  return (
    <>
      <PageHeader name={"Addresses"} />
      <div className="page">{sections[currentSection]}</div>
      <DeleteDialog
        deleteRef={deleteRef}
        handleDeleteAddress={handleDeleteAddress}
      />
    </>
  );
}

function NewAddressForm({
  title,
  func,
  setCurrentSection,
  isEditing = false,
  currentAddress = {},
}) {
  return (
    <>
      <div className="form-cont">
        <h3 style={{ marginBottom: "10px" }}>{title}</h3>
        <form className="new-address-form" onSubmit={(e) => func(e)}>
          <Input
            type="text"
            name="title"
            placeholder="Title"
            defaultVal={currentAddress?.title}
          />
          <Input
            type="text"
            name="city"
            placeholder="City"
            defaultVal={currentAddress?.city}
          />
          <Input
            type="text"
            name="state"
            placeholder="State"
            defaultVal={currentAddress?.state}
          />
          <Input
            type="text"
            name="street_address"
            placeholder="Street Address"
            defaultVal={currentAddress?.street_address}
          />
          <Input
            type="text"
            name="address_line"
            placeholder="Address Line"
            defaultVal={currentAddress?.address_line}
          />
          <button type="submit" className="order-button">
            {isEditing ? "Update" : "Add"}
          </button>
          <button
            type="button"
            onClick={() => setCurrentSection("AddressesList")}
          >
            Go Back
          </button>
        </form>
      </div>
    </>
  );
}

function AddressesList({
  addresses,
  setCurrentSection,
  setCurrentAddress,
  deleteRef,
}) {
  return (
    <>
      <div className="address-list">
        {addresses?.length > 0 ? (
          addresses?.map((x) => (
            <div className="address-item" key={x?.id}>
              <h3>{x?.title}</h3>
              <p>
                {x?.city}, {x?.state}, {x?.street_address}, {x?.address_line}{" "}
              </p>
              <div className="address-controls">
                <button
                  onClick={() => {
                    setCurrentSection("EditAddress");
                    setCurrentAddress(x);
                  }}
                >
                  {updateSvg}
                </button>
                <button onClick={() => deleteRef.current.showModal()}>
                  {deleteSvg}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", marginBottom: "15px" }}>
            No addresses saved.
          </p>
        )}
      </div>
      <button className="btn" onClick={() => setCurrentSection("AddNew")}>
        Add New Address
      </button>
    </>
  );
}

const updateSvg = (
  <svg
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      {" "}
      <path
        d="M13 3H7C5.89543 3 5 3.89543 5 5V10M13 3L19 9M13 3V8C13 8.55228 13.4477 9 14 9H19M19 9V19C19 20.1046 18.1046 21 17 21H10C7.79086 21 6 19.2091 6 17V17C6 14.7909 7.79086 13 10 13H13M13 13L10 10M13 13L10 16"
        stroke="#000000"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>{" "}
    </g>
  </svg>
);
