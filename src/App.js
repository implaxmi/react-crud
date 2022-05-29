import React, { useState, useEffect } from "react";
import User from "./components/User";
import AddUser from "./components/AddUser";
import "./App.css";

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  //retrieving data from api
  const fetchData = async () => {
    await fetch(`https://mockend.com/implaxmi/react-crud/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => {
        console.log(err);
      });
  };

  //adding data
  const onAdd = async (name, capacity, status, image) => {
    if (status === "on") {
      status = true;
    } else {
      status = false;
    }
    await fetch(`https://mockend.com/implaxmi/react-crud/users`, {
      method: "POST",
      body: JSON.stringify({
        name: name,
        capacity: capacity,
        status: status,
        image: image,
      }),
      headers: {
        "Content-type": "application/json; charset=utf-8",
      },
    })
      .then((res) => {
        if (res.status !== 201) {
          return;
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setUsers((users) => [...users, data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //deleting data
  const onDelete = async (id) => {
    await fetch(`https://mockend.com/implaxmi/react-crud/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.status !== 200) {
          return;
        } else {
          setUsers(
            users.filter((user) => {
              return user.id !== id;
            })
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(
      e.target.name.value,
      e.target.capacity.value,
      e.target.status.value,
      e.target.image.value
    );
    e.target.name.value = "";
    e.target.capacity.value = "";
    e.target.status.checked = "";
    e.target.image.value = "";
  };

  const onEdit = async (id, name, capacity, status, image) => {
    if (status === "on") {
      status = true;
    } else {
      status = false;
    }
    await fetch(`https://mockend.com/implaxmi/react-crud/users/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        name: name,
        capacity: capacity,
        status: status,
        image: image,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          return;
        } else {
          return response.json();
        }
      })
      .then((data) => {
        // setUsers((users) => [...users, data]);
        const updatedUsers = users.map((user) => {
          if (user.id === id) {
            user.name = name;
            user.capacity = capacity;
            user.status = status;
            user.image = image;
          }

          return user;
        });
        setUsers((users) => updatedUsers);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="container">
        <h4 className="header">Create Table</h4>
        <hr></hr>
        <div className="form-container">
          <AddUser handleSubmit={handleSubmit} />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Capacity</th>
            <th>Status</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
      </table>
      {users.map((user) => (
        <User
          key={user.id}
          id={user.id}
          name={user.name}
          capacity={user.capacity}
          status={user.status}
          image={user.image}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </>
  );
};

export default App;
