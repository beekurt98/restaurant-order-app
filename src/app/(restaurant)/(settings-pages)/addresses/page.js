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
      setAddresses(data);

    }

    getData();
  }, [])

  console.log(user);

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

    console.log(error);


  }

  return (
    <>
      <PageHeader name={"Addresses"} />
      <div className="page">
        {
          addNew
            ? <NewAddressForm func={insertAddress} setAddNew={setAddNew} />
            : <>
              <div>
                {
                  addresses.map(x => <div key={x?.id}>
                    <h3>{x?.title}</h3>
                    <p>{x?.city}, {x?.state}, {x?.street_address}, {x?.address_line} </p>
                    <div className="address-controls">
                      <button>Update</button>
                      <button onClick={() => deleteAddress(x?.id)}>Delete</button>

                    </div>
                  </div>)
                }
              </div>
              <button className="button" onClick={() => setAddNew(true)}>Add New</button>
            </>
        }
      </div>
    </>
  )
}

function NewAddressForm({ func, setAddNew }) {

  return (
    <>
      <button onClick={() => setAddNew(false)}>Go Back</button>
      <form className="new-address-form" onSubmit={func}>
        <Input type="text" name="title" placeholder="title" />
        <Input type="text" name="city" placeholder="city" />
        <Input type="text" name="state" placeholder="state" />
        <Input type="text" name="street_address" placeholder="Street Address" />
        <Input type="text" name="address_line" placeholder="Address Line" />
        <button className="order-button">Add</button>
      </form>
    </>
  )
}

function UpdateAddress() {

  return (
    <dialog open>

    </dialog>
  )
}