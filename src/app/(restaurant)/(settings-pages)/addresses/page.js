"use client";
import PageHeader from "@/app/components/PageHeader";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Input from "@/app/components/Input";
import { useAuth } from "@/app/components/AuthProvider";
import { deleteSvg } from "../../cart/page";

export default function Addresses() {
  const [isEditing, setEditing] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const { user } = useAuth();
  const [currentSection, setCurrentSection] = useState("AddressesList");
  const [currentAddress, setCurrentAddress] = useState({}); 
  const [loading, setLoading] = useState(true);

  const sections = {
    "AddressesList": <AddressesList 
                        addresses={addresses} 
                        setCurrentSection={setCurrentSection} 
                        setCurrentAddress={setCurrentAddress} 
                        deleteAddress={deleteAddress}
                      />,
    "AddNew": <NewAddressForm 
                title={"Add New Address"} 
                func={insertAddress} 
                setCurrentSection={setCurrentSection} 
              />,
    "EditAddress": <NewAddressForm 
                    title={"Update Address"} 
                    func={updateAddress} 
                    setCurrentSection={setCurrentSection} 
                    isEditing={true} 
                    currentAddress={currentAddress} 
                  />
  }

  // Fetch addresses whenever user changes or component mounts
  useEffect(() => {
    async function getData() {
      if (user?.id) {
        setLoading(true);
        let { data, error } = await supabase
          .from('addresses')
          .select('*')
          .eq('user_id', user.id);
        
        if (data) {
          setAddresses(data);
        } else if (error) {
          console.error("Error fetching addresses:", error);
        }
        setLoading(false);
      }
    }

    if (user) {
      getData();
    }
  }, [user]);

  async function deleteAddress(id) {
    const { error } = await supabase
      .from('addresses')
      .delete()
      .eq('id', id);
    
    if (!error) {
      // Update local state after successful deletion
      setAddresses(prev => prev.filter(address => address.id !== id));
    } else {
      console.error("Error deleting address:", error);
    }
  }

  async function insertAddress(e) {
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
      user_id: user?.id
    }
    const { data, error } = await supabase
      .from('addresses')
      .insert([newAddress])
      .select();
    
    if (data && data.length > 0) {
      setAddresses(prev => [...prev, data[0]]);
    } else if (error) {
      console.error("Error adding address:", error);
    }
    setCurrentSection("AddressesList");
  }

  async function updateAddress(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData);
    const { title, city, state, street_address, address_line } = formObj;
    const updatedAddress = {
      title,
      city,
      state,
      street_address,
      address_line
    }
    
    const { data, error } = await supabase
      .from('addresses')
      .update(updatedAddress)
      .eq('id', currentAddress?.id)
      .select();
    
    if (data && data.length > 0) {
      // Update addresses state with the updated address
      setAddresses(prev => 
        prev.map(address => 
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
      <div className="page">
        {loading ? (
          <p style={{ textAlign: "center" }}>Loading addresses...</p>
        ) : (
          sections[currentSection]
        )}
      </div>
    </>
  )
}

function NewAddressForm({ title, func, setCurrentSection, isEditing = false, currentAddress = {} }) {
  return (
    <>
      <div className="form-cont">
        <h3 style={{ marginBottom: "10px" }}>{title}</h3>
        <form className="new-address-form" onSubmit={(e) => func(e)}>
          <Input type="text" name="title" placeholder="Title" defaultVal={currentAddress?.title} />
          <Input type="text" name="city" placeholder="City" defaultVal={currentAddress?.city} />
          <Input type="text" name="state" placeholder="State" defaultVal={currentAddress?.state} />
          <Input type="text" name="street_address" placeholder="Street Address" defaultVal={currentAddress?.street_address} />
          <Input type="text" name="address_line" placeholder="Address Line" defaultVal={currentAddress?.address_line} />
          <button type="submit" className="order-button">{isEditing ? "Update" : "Add"}</button>
          <button type="button" onClick={() => setCurrentSection("AddressesList")}>Go Back</button>
        </form>
      </div>
    </>
  )
}

function AddressesList({ addresses, setCurrentSection, setCurrentAddress, deleteAddress }) {
  return (
    <>
      <div className="address-list">
        {
          addresses?.length > 0
            ? addresses?.map(x => <div className="address-item" key={x?.id}>
              <h3>{x?.title}</h3>
              <p>{x?.city}, {x?.state}, {x?.street_address}, {x?.address_line} </p>
              <div className="address-controls">
                <button onClick={() => {setCurrentSection("EditAddress"); setCurrentAddress(x);}}>{updateSvg}</button>
                <button onClick={() => deleteAddress(x?.id)}>{deleteSvg}</button>
              </div>
            </div>)
            : <p style={{ textAlign: "center", marginBottom: "15px" }}>No addresses saved.</p>
        }
      </div>
      <button className="btn" onClick={() => setCurrentSection("AddNew")}>Add New Address</button>
    </>
  )
}

const updateSvg = <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M13 3H7C5.89543 3 5 3.89543 5 5V10M13 3L19 9M13 3V8C13 8.55228 13.4477 9 14 9H19M19 9V19C19 20.1046 18.1046 21 17 21H10C7.79086 21 6 19.2091 6 17V17C6 14.7909 7.79086 13 10 13H13M13 13L10 10M13 13L10 16" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>