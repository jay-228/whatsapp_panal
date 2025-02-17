import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Cleint.css"

const API_URL = "http://147.93.107.44:5000";

const View_Client = () => {
  const token = JSON.parse(localStorage.getItem("authToken"));
  const [ClientData, setClientData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showActiveOnly, setShowActiveOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentClient, setCurrentClient] = useState({
    _id: "",
    WhaClientName: "",
    WhaCount: "",
    WhaBalCount: "",
    IsAdmin: false,
    IsActive: false,
    StaticIP: "",
    IsOWNWhatsapp: false,
    Database: "",
    Password: "",
    UserName: "",
    Port: "",
    AdminID: null, // Ensure AdminID is part of the state
    Server: "",
  });

  const navigate = useNavigate();
  const [adminName, setAdminNames] = useState([]);

  // Fetch client and admin data
  const fetchData = () => {
    axios
      .get(`${API_URL}/client_view_All`, {
        headers: {
          Authorization: token,
          "Cache-Control": "no-store",
        },
      })
      .then((res) => {
        setClientData(res.data.data);
        console.log("Client Data:", res.data.data);
      })
      .catch((error) => {
        toast.error("Error fetching client data");
      });

    axios
      .get(`${API_URL}/admin_view`)
      .then((response) => {
        console.log("Admin Data:", response.data);
        setAdminNames(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching admin names:", error);
        setAdminNames([]);
      });
  };

  // Delete a client
  const deleteClient = (clientId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this client?"
    );
    if (isConfirmed) {
      axios
        .get(`${API_URL}/client_delete/${clientId}`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          setClientData(ClientData.filter((client) => client._id !== clientId));
          toast.success("Client deleted successfully");
        })
        .catch((error) => {
          toast.error("Error deleting client");
        });
    }
  };

  // Update a client
  const updateClient = () => {
    const updatedClient = {
      ...currentClient,
      AdminID: currentClient.AdminID ? currentClient.AdminID._id : null, 
    };
  
    axios
      .put(`${API_URL}/client_update/${currentClient._id}`, updatedClient, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log("Update response:", res.data);
  
        // Update the client list properly
        setClientData(
          ClientData.map((client) =>
            client._id === currentClient._id
              ? { ...updatedClient, AdminID: currentClient.AdminID } // Ensure AdminID is fully updated
              : client
          )
        );
  
        setShowModal(false);
        toast.success("Client updated successfully");
      })
      .catch((error) => {
        console.error("Error updating client:", error);
        toast.error("Error updating client");
      });
  };
  
  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "Adminname") {
      // Find the selected admin object from the adminName array
      const selectedAdmin = adminName.find((admin) => admin._id === value);

      // Update the currentClient state with the selected admin's ID and name
      setCurrentClient((prevState) => ({
        ...prevState,
        AdminID: selectedAdmin
          ? { _id: selectedAdmin._id, AdminName: selectedAdmin.AdminName }
          : null,
        [name]: value,
      }));
    } else {
      setCurrentClient((prevState) => ({
        ...prevState,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  // Open the update modal and set the current client data
  const openUpdateModal = (client) => {
    setCurrentClient({
      ...client,
      Adminname: client?.AdminID?._id || "", // Set the Adminname to the AdminID's _id
    });
    setShowModal(true);
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, [token]);

  // Filter client data based on search term
  const filteredClientData = ClientData.filter((client) =>
    client.WhaClientName.toLowerCase().includes(searchTerm.toLowerCase())
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
              View Client Detail
            </h3>
          </div>
        </div>
      </div>

      {/* Buttons for toggling active clients and navigating */}
      <div className="d-flex justify-content-center mt-5">
        <button
          className="btn btn-primary"
          onClick={() => setShowActiveOnly(!showActiveOnly)}
          style={{ marginRight: "10px" }}
        >
          {showActiveOnly ? "Show All Clients" : "Show Active Clients"}
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/View_CleintDT")}
        >
          Client DT details
        </button>
      </div>

      {/* Search Bar */}
      <div className="container-fluid my-4" style={{ overflowX: "auto" }}>
        <div className="d-flex align-items-center mb-3">
          <label
            htmlFor="searchClient"
            className="form-label me-2 mb-0 fw-bold"
          >
            Search Client:
          </label>
          <input
            type="text"
            className="form-control"
            id="searchClient"
            placeholder="Search by client name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: "200px" }}
          />
        </div>

        {/* Client Data Table */}
        <div className="table-responsive">
          <table className="table table-bordered table-hover text-left w-100">
            <thead className="table-primary text-center">
              <tr>
                <th>NO</th>
                <th>CLIENT NAME</th>
                <th>ADMIN NAME</th>
                <th>COUNT</th>
                <th>BALANCE COUNT</th>
                <th>IS ADMIN</th>
                <th>IS ACTIVE</th>
                <th>STATIC IP</th>
                <th>IS OWN WHATSAPP</th>
                <th>DATABASE</th>
                <th>USERNAME</th>
                <th>PORT</th>
                <th>SERVER</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filteredClientData.length > 0 ? (
                filteredClientData.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item?.WhaClientName?.toUpperCase() || "N/A"}</td>
                    <td>{item?.AdminID?.AdminName?.toUpperCase() || "N/A"}</td>
                    <td>{item?.WhaCount ? parseFloat(item?.WhaBalCount).toFixed(2): "0.00"}</td>
                    <td>{item?.WhaBalCount? parseFloat(item?.WhaBalCount).toFixed(2): "0.00"}</td>
                    <td>
                      {item?.IsAdmin !== undefined
                        ? item.IsAdmin.toString().toUpperCase()
                        : "N/A"}
                    </td>
                    <td>
                      {item?.IsActive !== undefined
                        ? item.IsActive.toString().toUpperCase()
                        : "N/A"}
                    </td>
                    <td>{item?.StaticIP || "N/A"}</td>
                    <td>
                      {item?.IsOWNWhatsapp !== undefined
                        ? item.IsOWNWhatsapp.toString().toUpperCase()
                        : "N/A"}
                    </td>
                    <td>{item?.Database?.toUpperCase() || "N/A"}</td>
                    <td>{item?.UserName?.toUpperCase() || "N/A"}</td>
                    <td>{item?.Port || "N/A"}</td>
                    <td>{item?.Server?.toUpperCase() || "N/A"}</td>
                    <td>
                      <div className="d-flex justify-content-center">
                        <button
                          className="btn btn-warning me-2"
                          onClick={() => openUpdateModal(item)}
                        >
                          UPDATE
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteClient(item._id)}
                        >
                          DELETE
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="14" className="text-center text-danger fw-bold">
                    No matching records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Update Client Modal */}
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          tabIndex="-1"
          aria-labelledby="modalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="modalLabel">
                  UPDATE CLIENT
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-6 mb-3">
                    <label htmlFor="clientName" className="form-label">
                      CLIENT NAME
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="clientName"
                      name="WhaClientName"
                      value={currentClient.WhaClientName}
                      onChange={handleInputChange}
                    />
                  </div>









                  <div className="col-6 mb-3">
                    <label htmlFor="adminName" className="form-label">
                      ADMIN NAME
                    </label>
                    <select
                      className="form-select"
                      id="Adminname"
                      name="Adminname"
                      value={currentClient.Adminname}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Admin</option>
                      {adminName.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.AdminName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>











                <div className="row">
                  <div className="col-6 mb-3">
                    <label htmlFor="whatsappCount" className="form-label">
                      WHATSAPP COUNT
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="whatsappCount"
                      name="WhaCount"
                      value={parseFloat(currentClient.WhaCount).toFixed(2)}
                      onChange={handleInputChange}
                      readOnly
                    />
                  </div>
                  <div className="col-6 mb-3">
                    <label
                      htmlFor="whatsappBalanceCount"
                      className="form-label"
                    >
                      WHATSAPP BALANCE COUNT
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="whatsappBalanceCount"
                      name="WhaBalCount"
                      value={parseFloat(currentClient.WhaBalCount).toFixed(2)}
                      onChange={handleInputChange}
                      readOnly
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-4 mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="isAdmin"
                      name="IsAdmin"
                      checked={currentClient.IsAdmin}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label" htmlFor="isAdmin">
                      IS ADMIN
                    </label>
                  </div>
                  <div className="col-4 mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="isActive"
                      name="IsActive"
                      checked={currentClient.IsActive}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label" htmlFor="isActive">
                      IS ACTIVE
                    </label>
                  </div>
                  <div className="col-4 mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="isOwnWhatsapp"
                      name="IsOWNWhatsapp"
                      checked={currentClient.IsOWNWhatsapp}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label" htmlFor="isOwnWhatsapp">
                      IS OWN WHATSAPP
                    </label>
                  </div>
                </div>

                <div className="row">
                  <div className="col-6 mb-3">
                    <label htmlFor="userName" className="form-label">
                      USERNAME
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="userName"
                      name="UserName"
                      value={currentClient.UserName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-6 mb-3">
                    <label htmlFor="password" className="form-label">
                      PASSWORD
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="password"
                      name="Password"
                      value={currentClient.Password}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-6 mb-3">
                    <label htmlFor="database" className="form-label">
                      DATABASE
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="database"
                      name="Database"
                      value={currentClient.Database}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-6 mb-3">
                    <label htmlFor="port" className="form-label">
                      PORT
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="port"
                      name="Port"
                      value={currentClient.Port}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-6 mb-3">
                    <label htmlFor="staticIP" className="form-label">
                      STATIC IP
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="staticIP"
                      name="StaticIP"
                      value={currentClient.StaticIP}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-6 mb-3">
                    <label htmlFor="Server" className="form-label">
                      SERVER
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="Server"
                      name="Server"
                      value={currentClient.Server}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  CLOSE
                </button>
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={updateClient}
                >
                  UPDATE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </>
  );
};

export default View_Client;
