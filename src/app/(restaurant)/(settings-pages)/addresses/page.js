"use client";
import PageHeader from "@/app/components/PageHeader";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Input from "@/app/components/Input";
import { useAuth } from "@/app/components/AuthProvider";

export default function Addresses() {
  const [addNew, setAddNew] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    async function getData() {
      let { data, error } = await supabase
        .from('addresses')
        .select('*')
        .eq('user_id', user?.id)
      setAddresses(data);
    }

    getData();
  }, [])

  async function deleteAddress(id) {
    const { error } = await supabase
      .from('addresses')
      .delete()
      .eq('id', id)
  }

  async function insertAddress(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData);
    const { title, city, state, street_address, address_line } = formObj;
    const { data, error } = await supabase
      .from('addresses')
      .insert([
        {
          title,
          city,
          state,
          street_address,
          address_line,
          user_id: user?.id
        }])
      .select()

    setAddNew(false);

  }

  return (
    <>
      <PageHeader name={"Addresses"} />
      <div className="page">
        {
          addNew
            ? <NewAddressForm func={insertAddress} setAddNew={setAddNew} />
            : (<>
              <div className="address-list">
                {
                  addresses?.length > 0
                    ? addresses?.map(x => <div className="address-item" key={x?.id}>
                      <h3>{x?.title}</h3>
                      <p>{x?.city}, {x?.state}, {x?.street_address}, {x?.address_line} </p>
                      {/* <div className="address-controls">
                      <button>Update</button>
                      <button onClick={() => deleteAddress(x?.id)}>Delete</button>
                    </div> */}
                    </div>)
                    : <p style={{ textAlign: "center", marginBottom: "15px" }}>No addresses saved.</p>
                }
              </div>
              <button className="btn" onClick={() => setAddNew(true)}>Add New Address</button>
            </>)
        }
      </div>
    </>
  )
}

function NewAddressForm({ func, setAddNew }) {

  return (
    <>
      <div className="form-cont">
        <h3 style={{ marginBottom: "10px" }}>Add New Address</h3>
        <form className="new-address-form" onSubmit={func}>
          <Input type="text" name="title" placeholder="Title" />
          <Input type="text" name="city" placeholder="City" />
          <Input type="text" name="state" placeholder="State" />
          <Input type="text" name="street_address" placeholder="Street Address" />
          <Input type="text" name="address_line" placeholder="Address Line" />
          <button type="submit" className="order-button">Add</button>
          <button type="button" onClick={() => setAddNew(false)}>Go Back</button>
        </form>
      </div>
    </>
  )
}

function UpdateAddress() {

  return (
    <dialog open>

    </dialog>
  )
}