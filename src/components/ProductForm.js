import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { Formik } from "formik";

const ProductForm = (props) => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    productName: "",
    price: "",
    quantity: "",
  });

  useEffect(() => {
    if (id) {
      fetch("https://625bca1850128c5702076f16.mockapi.io/users/products/" + id)
        .then((data) => data.json())
        .then((data) => setFormData(data));
    }
  }, []);

  return (
    <Formik
      enableReinitialize
      initialValues={formData}
      validate={(values) => {
        const errors = {};
        if (!values.productName) {
          errors.productName = "Required";
        } else if (!values.price) {
          errors.price = "Required";
        } else if (!values.quantity) {
          errors.quantity = "Required";
        }
        return errors;
      }}
      onSubmit={(values) => {
        if (id) {
          fetch(
            "https://625bca1850128c5702076f16.mockapi.io/users/products/" + id,
            {
              method: "PUT",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify(values),
            }
          )
            .then((data) => data.json())
            .then((data) => {
              alert("Data Updated Successfully");
              props.history.push("/");
            })
            .catch((err) => console.log(err));
        } else {
          fetch("https://625bca1850128c5702076f16.mockapi.io/users/products", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(values),
          })
            .then((data) => data.json)
            .then((data) => {
              alert("Data saved Successfully");
              props.history.push("/");
            })
            .catch((err) => console.log(err));
        }
      }}
    >
      {({ values, errors, touched, handleSubmit, handleChange }) => {
        return (
          <div>
            <h1>{id ? "Edit Product" : "Add Product"}</h1>
            <Form className='userForm' onSubmit={handleSubmit}>
              <FormGroup>
                <Label for='productName'>Product Name</Label>
                <Input
                  type='text'
                  value={values.productName}
                  name='productName'
                  id='productName'
                  onChange={handleChange}
                  className={
                    errors.productName && touched.productName
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.productName && touched.productName && (
                  <div className='input-feedback'>{errors.productName}</div>
                )}
              </FormGroup>
              <FormGroup>
                <Label for='price'>Price $</Label>
                <Input
                  type='number'
                  value={values.price}
                  name='price'
                  id='price'
                  onChange={handleChange}
                  className={
                    errors.price && touched.price
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.price && touched.price && (
                  <div className='input-feedback'>{errors.price}</div>
                )}
              </FormGroup>
              <FormGroup>
                <Label for='quantity'>Quantity</Label>
                <Input
                  type='number'
                  value={values.quantity}
                  name='quantity'
                  id='quantity'
                  onChange={handleChange}
                  className={
                    errors.quantity && touched.quantity
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.quantity && touched.quantity && (
                  <div className='input-feedback'>{errors.quantity}</div>
                )}
              </FormGroup>
              <Button className='submit-btn' type='Submit'>
                Submit
              </Button>
              <Button
                type='button'
                color='danger'
                onClick={() => props.history.push("/")}
              >
                Cancel
              </Button>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};

export default ProductForm;
