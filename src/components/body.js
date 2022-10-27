import React from "react";
import { Heading } from "./Heading";
import { Navbar } from "./navBar";
import { ProductListCustomer } from "./productlistcustomer";

function Body() {
  return(
    <div className="container">
      <Navbar />
      <Heading />
      <ProductListCustomer/>
    </div>
  )
}

export { Body };