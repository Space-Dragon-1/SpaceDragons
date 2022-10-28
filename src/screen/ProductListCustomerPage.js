import React, { Component } from "react";
import { ProductCustomer } from "../components/ProductCustomer";


class ProductListCustomerPage extends Component {
  render() {
    return (
      <section className="py-5">
        <div className="row">
          <ProductCustomer />
        </div>
      </section>
    );
  }
}
export { ProductListCustomerPage };

