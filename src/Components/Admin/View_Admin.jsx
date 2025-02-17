import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Admin.css"; // Import external CSS file for media queries

const API_URL = "http://147.93.107.44:5000";

const View_Admin = () => {
  const [adminData, setAdminData] = useState([]);
  const [editData, setEditData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch admin data from the API
  const viewData = () => {
    axios
      .get(`${API_URL}/admin_view`)
      .then((res) => {
        setAdminData(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
        toast.error("Failed to load admin data");
      });
  };

  // Fetch data on component mount
  useEffect(() => {
    viewData();
  }, []);

  // Delete an admin
  const deleteAdmin = (id) => {
    if (window.confirm("Are you sure you want to delete this Admin?")) {
      axios
        .get(`${API_URL}/admin_delete/${id}`)
        .then(() => {
          toast.success("Admin deleted successfully");
          setAdminData(adminData.filter((admin) => admin._id !== id));
        })
        .catch(() => {
          toast.error("Failed to delete admin");
        });
    }
  };

  // Set the admin data to be edited
  const handleEdit = (admin) => {
    setEditData(admin);
  };

  // Update admin data
  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`${API_URL}/admin_update/${editData._id}`, editData)
      .then(() => {
        toast.success("Admin updated successfully");
        setEditData(null);
        viewData();
      })
      .catch(() => {
        toast.error("Failed to update admin");
      });
  };

  // Filter admin data based on search term
  const filteredAdminData = adminData.filter((admin) =>
    admin.AdminName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Header Section */}
      <div
        className="addadmin_header"
        style={{
          height: "80px",
          backgroundColor: "#D6DCEC",
          marginTop: "60px",
        }}
      >
        <div style={{ backgroundColor: "rgba(97, 158, 208, 1)" }}>
          <div className="d-flex justify-content-center py-4">
            <h3
              className="rounded-2 m-0 px-5 text-white"
              style={{ backgroundColor: "black" }}
            >
              View Admin
            </h3>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="container mt-4" style={{ maxWidth: "1000px" }}>
        {/* Search Bar with Label in One Line */}
        <div className="d-flex align-items-center mb-3">
          <label htmlFor="searchAdmin" className="form-label me-2 mb-0 fw-bold">
            Search Admin:
          </label>
          <input
            type="text"
            id="searchAdmin"
            className="form-control"
            placeholder="Search by Admin Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: "200px" }} // Set width to 200px
          />
        </div>

        {/* Table Section */}
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-primary text-center">
              <tr>
                <th>NO</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredAdminData.length > 0 ? (
                filteredAdminData.map((item, index) => (
                  <tr key={item._id} className="text-start align-middle">
                    <td>{index + 1}</td>
                    <td>{item.AdminName.toUpperCase()}</td>
                    <td>{item.PhoneNumber}</td>
                    <td className="d-flex justify-content-center flex-wrap gap-2">
                      <button
                        className="btn btn-warning"
                        onClick={() => handleEdit(item)}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteAdmin(item._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                      <td colSpan="7" className="text-center text-danger fw-bold">
                    No matching records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal Section */}
      {editData && (
        <div
          className="modal fade show"
          style={{
            display: "block",
            position: "fixed",
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1050,
          }}
          tabIndex="-1"
          aria-labelledby="updateAdminLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="updateAdminLabel">
                  Update Admin
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEditData(null)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editData.AdminName}
                    onChange={(e) =>
                      setEditData({ ...editData, AdminName: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editData.PhoneNumber}
                    onChange={(e) =>
                      setEditData({ ...editData, PhoneNumber: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editData.Password}
                    onChange={(e) =>
                      setEditData({ ...editData, Password: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setEditData(null)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={handleUpdate}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Container for Notifications */}
      <ToastContainer />
    </>
  );
};

export default View_Admin;