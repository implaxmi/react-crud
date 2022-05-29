import React, { useState } from "react";
import "./User.css";

const User = ({ id, name, capacity, status, image, onEdit, onDelete }) => {
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  const handleOnEditSubmit = (evt) => {
    evt.preventDefault();
    onEdit(
      id,
      evt.target.name.value,
      evt.target.capacity.value,
      evt.target.status.value,
      evt.target.image.value
    );
    setIsEdit(!isEdit);
  };

  return (
    <>
      {isEdit ? (
        <form onSubmit={handleOnEditSubmit}>
          <input
            type="text"
            placeholder="Name"
            name="name"
            defaultValue={name}
          />
          <input
            type="number"
            placeholder="Capacity"
            name="capacity"
            defaultValue={capacity}
          />
          <input type="checkbox" placeholder="Status" name="status" />
          <input placeholder="Image" name="image" defaultValue={image} />
          <button className="update-btn" onSubmit={handleOnEditSubmit}>
            Update
          </button>
        </form>
      ) : (
        <table>
          <tbody>
            <tr>
              <td>{id}</td>
              <td>{name}</td>
              <td>{capacity}</td>
              <td>{status === true ? "true" : "false"}</td>
              <td>
                <img height="100px" width="100px" src={image} alt="" />
              </td>
              <td>
                <button className="update-btn" onClick={handleEdit}>
                  Update
                </button>
                <button className="delete-btn" onClick={handleDelete}>
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </>
  );
};

export default User;
