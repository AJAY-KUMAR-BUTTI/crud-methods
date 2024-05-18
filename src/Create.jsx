import React, { useState } from "react";

import { Form, Modal, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Creact() {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const { name, email, phone } = values;
  function changeHandler(e) {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  }
  function submitHandler(e) {
    e.preventDefault();
    axios.post("http://localhost:3000/users", values)
    .then(res => {
      console.log(res);
      navigate("/");
    })
    .catch(err => console.log(err))
  }
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add a New User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-2" controlId="formGroupName">
            <Form.Label className="m-0">Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={name}
              placeholder="Enter Name"
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={email}
              placeholder="Enter email"
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="formGroupPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={phone}
              placeholder="Enter Phone Number"
              onChange={changeHandler}
            />
          </Form.Group>
          <Button type="submit" variant="success" className="me-2">
            Submit
          </Button>
          <Link to="/">
            <Button variant="primary">Back</Button>
          </Link>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default Creact;
