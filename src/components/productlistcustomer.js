import React, { Component } from "react";
import { Product } from "./product";

class ProductListCustomer extends Component {
  render() {
    return (
      <section className="py-5">
          <div className="row">
            <Product />
          </div>
      </section>
    );
  }
}
export { ProductListCustomer };

