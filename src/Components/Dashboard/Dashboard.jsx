import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { Row, Col } from "react-bootstrap";
import "./Dashboard.css"; // Import the custom CSS

const API_URL = "https://whatsapp-backend-chth.onrender.com";

function Dashboard() {
  const [totalLog, setTotalLog] = useState(0);
  const [totalAdmin, setTotalAdmin] = useState(0);
  const [clientData, setClientData] = useState(0);
  const [clientDTData, setClientDTData] = useState(0);
  const [whaSlabOptions, setWhaSlabOptions] = useState(0);
  const [slabDTData, setSlabDTData] = useState(0);
  const [DocLink, setDocLink] = useState(0);
  const [DocLinkDT, setDocLinkDT] = useState(0);
  const [WhaOffcial, setWhaOffcial] = useState(0);
  const [WhaOffcialDT, setWhaOffcialDT] = useState(0);
  const [isDataFetched, setIsDataFetched] = useState(false); // State to track if data has been fetched

  const fetchData = () => {
    const endpoints = [
      { url: `${API_URL}/admin_view`, setData: setTotalAdmin },
      { url: `${API_URL}/log_All_view`, setData: setTotalLog },
      { url: `${API_URL}/client_view_All`, setData: setClientData },
      { url: `${API_URL}/clientdt_view_All`, setData: setClientDTData },
      { url: `${API_URL}/slab_view`, setData: setWhaSlabOptions },
      { url: `${API_URL}/slabdt_view`, setData: setSlabDTData },
      { url: `${API_URL}/wha_doclink_view_All`, setData: setDocLink },
      { url: `${API_URL}/wha_doclinkdt_view_All`, setData: setDocLinkDT },
      { url: `${API_URL}/wha_offcialwa_view_All`, setData: setWhaOffcial },
      { url: `${API_URL}/wha_offcialwadt_view_All`, setData: setWhaOffcialDT },
    ];

    endpoints.forEach(({ url, setData }) => {
      axios
        .get(url)
        .then((res) => {
          setData(res.data.data.length);
        })
        .catch((error) => {
          console.error(`Error fetching ${url}`, error);
        });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (
      !isDataFetched &&
      totalAdmin &&
      totalLog &&
      clientData &&
      clientDTData &&
      whaSlabOptions &&
      slabDTData &&
      DocLink &&
      DocLinkDT &&
      WhaOffcial &&
      WhaOffcialDT
    ) {
      toast.success("Data fetched successfully!");
      setIsDataFetched(true); // Set to true to ensure the toast is only shown once
    }
  }, [
    totalAdmin,
    totalLog,
    clientData,
    clientDTData,
    whaSlabOptions,
    slabDTData,
    DocLink,
    DocLinkDT,
    WhaOffcial,
    WhaOffcialDT,
    isDataFetched,
  ]);

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
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
              Dashboard
            </h3>
          </div>
        </div>
      </div>

      <div className="dashboard-container">
        <div className="container mt-4">
          <Row className="g-4 justify-content-center">
            {[
              {
                title: "Admin Records",
                value: totalAdmin,
                route: "/View_Admin",
              },
              {
                title: "Client Records",
                value: clientData,
                route: "/View_Client",
              },
              {
                title: "Client Details Records",
                value: clientDTData,
                route: "/ViewCleintDT",
              },
              {
                title: "Slab Records",
                value: whaSlabOptions,
                route: "/View_Slab",
              },
              {
                title: "Slab Details Records",
                value: slabDTData,
                route: "/View_Slab",
              },
              { title: "Log Records", value: totalLog, route: "/log" },
              {
                title: "Wha Official Records",
                value: WhaOffcial,
                route: "/View_Wpofficeal",
              },
              {
                title: "Wha Official DT Records",
                value: WhaOffcialDT,
                route: "/View_Wpofficeal",
              },
              {
                title: "Doc Link Records",
                value: DocLink,
                route: "/View_WhaDocLink",
              },
              {
                title: "Doc Link Details Records",
                value: DocLinkDT,
                route: "/View_WhaDocLink",
              },
            ].map((item, index) => (
              <Col lg={3} md={4} sm={6} key={index}>
                <Link to={item.route} className="text-decoration-none">
                  <div className="card text-center p-3 card-clickable shadow-sm">
                    <h5 className="card-title">{item.title}</h5>
                    <h2 className="card-value">{item.value}</h2>
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
