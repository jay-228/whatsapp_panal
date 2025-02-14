import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
} from "@mui/material";

const API_URL = "http://147.93.107.44:5000";

const View_Admin = () => {
  const [adminData, setAdminData] = useState([]);
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(true);

  const viewData = () => {
    setLoading(true);
    axios
      .get(`${API_URL}/admin_view`)
      .then((res) => {
        setAdminData(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
        toast.error("Failed to load admin data");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    viewData();
  }, []);

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

  const handleEdit = (admin) => {
    setEditData(admin);
  };

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

  return (
    <>
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

      <div className="container mt-5">
        {/* Box for Responsiveness */}
        <Box sx={{ overflowX: "auto" }}>
          <TableContainer component={Paper}>
            <Table aria-label="Admin Table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">NO</TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Phone Number</TableCell>
                  <TableCell align="center">Password</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : adminData.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      align="center"
                      style={{ color: "red" }}
                    >
                      No Data Found
                    </TableCell>
                  </TableRow>
                ) : (
                  adminData.map((item, index) => (
                    <TableRow key={item._id}>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">{item.AdminName}</TableCell>
                      <TableCell align="center">{item.PhoneNumber}</TableCell>
                      <TableCell align="center">{item.Password}</TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          color="warning"
                          onClick={() => handleEdit(item)}
                          style={{ marginRight: "8px" }}
                        >
                          Update
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => deleteAdmin(item._id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </div>

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

      <ToastContainer />
    </>
  );
};

export default View_Admin;
