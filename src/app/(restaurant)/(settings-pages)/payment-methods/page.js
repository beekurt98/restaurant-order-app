"use client";
import PageHeader from "@/app/components/PageHeader";

export default function PaymentMethods() {

  return (
    <>
      <PageHeader name={"Payment Method"} />
      <div className="page">
        <div className="card-mockup">
          <p>**** **** **** **56
            <br />
            VISA
          </p>
        </div>
      </div>
    </>
  )
}