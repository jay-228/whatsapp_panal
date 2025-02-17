import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import { styled, useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import Routing from "../AllRouting/Routing";
import { Link } from "react-router-dom";

// import "../Components/TopbarMenu.css";



const drawerWidth = 270;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      marginLeft: 0,
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function MainLayout() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [greyButtonLoading, setGreyButtonLoading] = useState(false);

  useEffect(() => {
    if (window.innerWidth > 700) {
      setOpen(true);
    }
  }, []);

  const handleDrawer = () => {
    setOpen(!open);
  };

  // Handler for GREY button click
  const handleGreyButtonClick = () => {
    setGreyButtonLoading(true);
    // Simulate some action
    const timer = setTimeout(() => {
      setGreyButtonLoading(false);
    }, 2000); // Simulate loading for 2 seconds
    return () => clearTimeout(timer);
  };

  const [open1, setOpen1] = useState(false);

  const handleClickOpen = () => {
    setOpen1(true);
  };

  const handleClose = () => {
    setOpen1(false);
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  function getStyles(name, personName, theme) {
    return {
      fontWeight: personName.includes(name)
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightRegular,
    };
  }

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "rgba(28, 116, 188, 1)",
        overflowX: "hidden",
      }}
    >
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{
          paddingTop: { xs: "0px", sm: "0px" },
          backgroundColor: "rgba(28, 116, 188, 1)",
          color: "#F8F8F8",
          boxShadow: "none",
          zIndex: 999,
        }}
      >
        <Box
          sx={{
            backgroundColor: "#F2F7F8",
            borderRadius: { xs: "0px", sm: "5px 0px 0px 0px" },
          }}
        >
          <Toolbar>
            <IconButton
              color="black"
              aria-label="open drawer"
              onClick={handleDrawer}
              edge="start"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Box
              sx={{
                position: "fixed",
                bottom: 20,
                right: 20,
                zIndex: 1000,
              }}
            >
              <Dialog
                open={open1}
                onClose={handleClose}
                fullWidth
                maxWidth="sm"
              >
                <DialogTitle
                  style={{
                    fontSize: "20px",
                    fontWeight: "600",
                    textAlign: "center",
                    position: "relative",
                  }}
                >
                  Menu
                  {/* Close Button at the top right corner */}
                  <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    className="dialog-close-btn"
                    sx={{
                      position: "absolute",
                      right: 8,
                      top: 8,
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </DialogTitle>
              </Dialog>
            </Box>
          </Toolbar>
        </Box>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            border: "none",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Box sx={{ backgroundColor: "rgba(28, 116, 188, 1)", height: "100%" }}>
          <DrawerHeader sx={{ backgroundColor: "rgba(28, 116, 188, 1)" }} />
          <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                bgcolor: "white",
                borderRadius: "10px",
                marginBottom: "15px",
              }}
            >
              <Link to="/Dashboard">
                <Box
                  component={"img"}
                  src={require("./Images/daynamic_logo.png")}
                  sx={{ width: "80%" }}
                  style={{
                    marginBottom: "32px",
                    marginTop: "30px",
                    marginLeft: "20px",
                    backgroundColor: "white",
                  }}
                />
              </Link>
            </Box>
          </div>
          <Sidebar />
        </Box>
      </Drawer>

      <Main open={open} sx={{ padding: { xs: "0px", sm: "0px 0px 0px 0px" } }}>
        <Box
          sx={{
            backgroundColor: "#F2F7F8",
            height: "100vh",
            overflowX: "hidden",
            borderRadius: { xs: "0px", sm: "0px 0px 0px 5px" },
          }}
        >
          <Box sx={{ width: "100%" }}>
            <>
              <Routing />
            </>
          </Box>
        </Box>
      </Main>
    </Box>
  );
}
