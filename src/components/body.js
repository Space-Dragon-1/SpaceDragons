import React from "react";
import { Heading } from "./Heading";
import { Navbar } from "./navBar";
import { ProductListAdmin } from "./productListAdmin";

function Body() {
  return(
    <div className="container">
      <Navbar />
      <Heading />
      <ProductListAdmin />
    </div>
  )
}

export { Body };

