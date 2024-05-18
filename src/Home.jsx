import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
    const [data, setData] = useState([])
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);
  function handleDelete(id) {
    const confirm = window.confirm('Would you like to Delete?');
    if(confirm) {
        axios.delete('http://localhost:3000/users/' + id)
        .then(res => {
           location.reload()
        })
        .catch(err => console.log(err))
    }
  }
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh=100">
      <h2>UsersList : </h2>
      <div className="w-80 rounded bg-white border shadow p-4">
        <div className="d-flex justify-content-end mb-3 mt-0">
          <Link to="/create">
            <Button variant="success" size="sm">
              add +
            </Button>
          </Link>
        </div>
        <Table bordered hover variant="white">
          <thead>
            <tr className="text-center">
              <th>ID</th>
              <th>Name</th>
              <th>email</th>
              <th>Phone</th>
              <th>actions</th>
            </tr>
          </thead>
              <tbody className="bg-light text-white">
                {data.map((d,i) => (
                <tr className="text-center align-middle" key={i}>
                  <td>{d.id}</td>
                  <td>{d.name}</td>
                  <td>{d.email}</td>
                  <td>{d.phone}</td>
                  <td>
                    <Link to={`/read/${d.id}`}>
                      <Button variant="primary" size="sm" className="me-2">
                        Read
                      </Button>
                    </Link>
                    <Link to={`/update/${d.id}`}>
                      <Button variant="info" size="sm" className="me-2">
                        Edit
                      </Button>
                    </Link>
                      <Button variant="danger" size="sm" onClick={e => handleDelete(d.id)}>
                        Delete
                      </Button>
                  </td>
                </tr>
                ))}
              </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Home;
