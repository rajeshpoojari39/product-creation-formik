import React, { useEffect, useState } from "react";
import { Table, Button } from "reactstrap";

const ProductsList = (props) => {
  const url = "https://625bca1850128c5702076f16.mockapi.io/users/products/";
  const [productsData, setProductsData] = useState([]);

  const getProductsList = () => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setProductsData(data));
  };

  useEffect(() => {
    getProductsList();
  }, []);

  const deleteHandler = (id) => {
    fetch(url + id, {
      method: "DELETE",
    })
      .then((data) => data.json())
      .then((data) => {
        getProductsList();
        alert("Deleted Successfully");
      });
  };

  return (
    <div>
      <Button className='home-btn' onClick={() => props.history.push("/")}>
        Home
      </Button>
      <Table bordered>
        <thead>
          <tr>
            <th>Sr.no</th>
            <th>Product Name</th>
            <th>Price $</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {productsData.map((product, index) => {
            return (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>{product.productName}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>
                  <Button
                    onClick={() => {
                      props.history.push(`/form/${product.id}`);
                    }}
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    color='danger'
                    onClick={() => deleteHandler(product.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default ProductsList;
