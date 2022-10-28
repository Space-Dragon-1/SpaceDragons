import React, { Component } from "react";
import { ProductCustomer } from "../components/ProductCustomer";


class ProductListCustomerPage extends Component {
  render() {
    return (
      <div className="container">
        <section className="py-5">
        <div className="row">
          <ProductCustomer />
        </div>
      </section>
      </div>
      
    );
  }
}
export { ProductListCustomerPage };

