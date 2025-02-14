import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { Row, Col } from "react-bootstrap";
import "./Dashboard.css";  // Import the custom CSS

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
        .then((res) => setData(res.data.data.length))
        .catch((error) => {
          console.error(`Error fetching ${url}`, error);
          toast.error(`Failed to load ${url} data`);
        });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="container mt-4">
        <h1 className="text-center mb-4">Dashboard Overview</h1>
        <Row className="g-4">
          {[ 
            { title: "Admin Records", value: totalAdmin, route: "/View_Admin" },
            { title: "Client Records", value: clientData, route: "/View_Client" },
            { title: "Client Details Records", value: clientDTData, route: "/ViewCleintDT" },
            { title: "Slab Records", value: whaSlabOptions, route: "/View_Slab" },
            { title: "Slab Details Records", value: slabDTData, route: "/View_Slab" },
            { title: "Log Records", value: totalLog, route: "/log" },
            { title: "Wha Official Records", value: WhaOffcial, route: "/View_Wpofficeal" },
            { title: "Wha Official DT Records", value: WhaOffcialDT, route: "/View_Wpofficeal" },
            { title: "Doc Link Records", value: DocLink, route: "/View_WhaDocLink" },
            { title: "Doc Link Details Records", value: DocLinkDT, route: "/View_WhaDocLink" }
          ].map((item, index) => (
            <Col md={3} sm={6} key={index}>
              <Link to={item.route} className="text-decoration-none">
                <div className="card text-center p-3 card-clickable shadow-sm">
                  <h5 className="card-title text-primary">{item.title}</h5>
                  <h2 className="card-value display-4">{item.value}</h2>
                </div>
              </Link>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default Dashboard;
