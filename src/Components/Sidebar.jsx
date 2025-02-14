import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { Box, Button, ListItemButton, styled } from "@mui/material";
import { Link } from "react-router-dom";
import { Style } from "@mui/icons-material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

// Dummy Log Component

export default function Sidebar() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(null);
  const [activeLink, setActiveLink] = useState("");
  const [activeComponent, setActiveComponent] = useState(""); // Track the active component
  const location = useLocation();

  const sidebardata = [
    {
      name: "Admin",
      listofdata: [
        { name: "Add Admin", pate: "/Add_Admin", component: "Admin" },
        { name: "View Admin", pate: "/View_Admin", component: "Admin" },
      ],
    },
    {
      name: "Client",
      listofdata: [
        { name: "Add Client", pate: "/Add_Cleint", component: "Client" },
        { name: "Client Details", pate: "/CleintDT", component: "Client" },
        { name: "View Client", pate: "/View_Cleint", component: "Client" },
      ],
    },
    {
      name: "Slab",
      listofdata: [
        { name: "Add Slab", pate: "/Add_Slab", component: "Slab" },
        { name: "Slab Details", pate: "/SlabDT", component: "Slab" },
        { name: "View Slab", pate: "/View_Slab", component: "Slab" },
      ],
    },
    {
      name: "Log Report",
      listofdata: [{ name: "View Log Report", pate: "/Log", component: "log" }],
    },
    {
      name: "WhatsApp Api Setup",
      listofdata: [
        {
          name: "WhatsApp Setup Main",
          pate: "/WpSetup_Main",
          component: "Wpoffcialwa",
        },
        {
          name: "WhatsApp Setup Details",
          pate: "/WpSetupDT",
          component: "WpOffcialWaDT",
        },
        {
          name: "View WhatsApp Setup",
          pate: "/View_WpSetup_Main",
          component: "View_Wpofficeal",
        },
      ],
    },
    {
      name: "Document Link Setup",
      listofdata: [
        {
          name: "Document Link Main",
          pate: "/DocumentLink_main",
          component: "WHADOcLink",
        },
        {
          name: "Document Link Details",
          pate: "/DocumentLinkDT",
          component: "WHADOcLinkDT",
        },
        {
          name: "View Document Link Setup",
          pate: "/View_DocumentLink_main",
          component: "View_WhaDocLink",
        },
      ],
    },

    {
      name: "Template",
      listofdata: [
        {
          name: "Add Template",
          pate: "/Add_Template",
          component: "Template",
        },
        {
          name: "View Template",
          pate: "/View_Template",
          component: "Template",
        },
   
      ],
    },



  ];

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  const handleLinkClick = (path, component) => {
    setActiveLink(path);
    setActiveComponent(component); // Update active component when link is clicked
  };

  const handelLogout = () => {
    localStorage.clear();

    navigate("/Login_Page"); // Navigate to the LoginPage
    window.location.reload();
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "72%" }}>
      {/* Sidebar content */}
      <Box sx={{ flexGrow: 1 }}>
        <div className="">
          {sidebardata.map((item, index) => (
            <Box key={index} sx={{ margin: "auto" }}>
              <Accordion
                expanded={expanded === index}
                onChange={handleChange(index)}
                sx={{ backgroundColor: "transparent", boxShadow: "none" }}
              >
                <AccordionSummary>
                  <Typography
                    sx={{
                      width: "100%",
                      backgroundColor: "white",
                      color: "black",
                      borderRadius: "10px",
                      textAlign: "center",
                      padding: "5px",
                      fontSize: "20px",
                      fontWeight: "500",
                    }}
                  >
                    {item.name}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails style={{ padding: "10px" }}>
                  {item?.listofdata ? (
                    item.listofdata.map((item2, index2) => (
                      <React.Fragment key={index2}>
                        <ListItemButton
                          onClick={() => {
                            handleLinkClick(item2.pate, item2.component);
                          }}
                          component={Link}
                          to={item2.pate}
                          sx={{
                            width: "90%",
                            borderRadius: "10px",
                            marginTop: "5px",
                            padding: "10px",
                            backgroundColor:
                              activeLink === item2.pate
                                ? "black"
                                : "transparent",
                            color:
                              activeLink === item2.pate ? "white" : "white",
                            "&:hover": {
                              backgroundColor: "rgba(33, 38, 49, 1)",
                            },
                          }}
                        >
                          <Box
                            sx={{
                              width: "10px",
                              height: "10px",
                              backgroundColor: "white",
                              borderRadius: "50%",
                              marginRight: "10px",
                            }}
                          ></Box>
                          <Box>{item2.name}</Box>
                        </ListItemButton>
                      </React.Fragment>
                    ))
                  ) : (
                    <ListItemButton
                      onClick={() => {
                        handleLinkClick(item.pate, item.component);
                      }}
                      component={Link}
                      to={item.pate}
                      sx={{
                        width: "100%",
                        borderRadius: "20px",
                        marginTop: "5px",
                        padding: "10px",
                        backgroundColor:
                          activeLink === item.pate ? "#3c86c3" : "transparent",
                        color:
                          activeLink === item.pate
                            ? "white"
                            : "rgba(33, 38, 49, 1)",
                        "&:hover": {
                          backgroundColor: "black",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          width: "10px",
                          height: "10px",
                          backgroundColor: "white",
                          borderRadius: "50%",
                          marginRight: "10px",
                        }}
                      ></Box>
                      <Box>{item.name}</Box>
                    </ListItemButton>
                  )}
                </AccordionDetails>
              </Accordion>
            </Box>
          ))}
        </div>
      </Box>

      {/* Logout Button */}
      <Box sx={{ padding: 2, textAlign: "center" }}>
        {/* mt: 45    */}

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#70768f",
            color: "white",
            width: "98%",
            fontSize: "19px",
            fontWeight: "bold",
            borderRadius: "10px",
            "&:hover": {
              backgroundColor: "#ff3333",
            },
          }}
          onClick={handelLogout}
          startIcon={<ExitToAppIcon />} // Add the icon here
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
}
