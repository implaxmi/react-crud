import React from "react";

const AddUser = ({ handleSubmit }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-labels">
          <label>Layout:</label>
          <label>Name:</label>
          <label>Capacity:</label>
          <label>Status:</label>
          <label>Image:</label>
        </div>
        <div className="form-inputs">
          <select name="layout">
            <option value="">Select Layout</option>
            <option value="auto">auto</option>
            <option value="fixed">fixed</option>
            <option value="initial">initial</option>
            <option value="inherit">inherit</option>
          </select>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter Name"
            required
          />
          <input
            type="number"
            id="capacity"
            name="capacity"
            placeholder="Enter number of capacity"
            required
          />
          <input
            className="input-checkbox"
            type="checkbox"
            id="status"
            name="status"
          />
          <input type="file" id="image" name="image" />
          <div className="btn-container">
            <button type="submit" className="submit-btn">
              Create Table
            </button>
            <button type="reset" className="cancel-btn">
              Cancel
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddUser;
