import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import { Button, Modal } from "react-bootstrap";


function Read() {
    const [data, setData] = useState({})
    const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const { id } = useParams();
  console.log({ id });
  async function fetchData() {
      const result = await axios.get('https://jsonplaceholder.typicode.com/users/'+ id)
        setData(result.data)
  }
  useEffect(() => {
    fetchData()
  },[])
  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
      
    >
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Details of User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
              <div>
                <strong>userId : {data.id}</strong>
              </div>
              <div>
                <strong>name : {data.name}</strong>
              </div>
              <div>
                <strong>email : {data.email}</strong>
              </div>
              <Link to={`/update/${id}`}><Button variant="success" className="me-2">Edit</Button></Link>
              <Link><Button variant="primary">Back</Button></Link>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Read;
