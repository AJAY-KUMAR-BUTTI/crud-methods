import React, {useState, useEffect} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Modal,Form,Button } from 'react-bootstrap';
import axios from 'axios';
function Update() {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const {name, email, phone} = values
  const navigate = useNavigate()
  const { id } = useParams();
  console.log({ id });
  function changeHandler(e) {
    const {name, value} = e.target;
    setValues({
      ...values,
      [name] : value
    })
  }
  async function fetchData() {
      const result = await axios.get('https://jsonplaceholder.typicode.com/users/'+ id)
        setValues(result.data)
  }
  useEffect(() => {
    fetchData()
  },[]);

  function submitHandler(e) {
    e.preventDefault();
    axios.put('http://localhost:3000/users/'+ id, values)
    .then(res => {
      console.log(res.data);
      navigate('/')
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
          Update
        </Button>
        <Link to="/">
          <Button variant="primary">Back</Button>
        </Link>
      </Form>
    </Modal.Body>
  </Modal>
  );
}

export default Update
