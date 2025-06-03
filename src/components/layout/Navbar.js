import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { isAuthenticated, signOut } from "../../API/userAPI";
import "./navbar.css";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const { user } = isAuthenticated();
  const navigate = useNavigate();
  const signout = () => {
    signOut().then((data) => {
      console.log(data.message);
      navigate("/");
    });
  };

  const [searchQuery, setSearchQuery] = React.useState("");
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <>
      <div className="row pt-1 bg-dark">
        <div className="col-md-3 text-center">
          <Link className="navbar-brand fs-3 fw-bold text-white" to="/">
            Art Gallery
          </Link>
        </div>
        <div className="col-md-6">
          <form onSubmit={handleSearchSubmit} className="d-flex">
            <input
              value={searchQuery}
              onChange={handleSearchChange}
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-warning" type="submit">
              Search
            </button>
          </form>
        </div>
        <div className="col-md-3 d-flex justify-content-evenly">
          {!user && (
            <>
              <Link to="/signin">
                <i class="bi bi-box-arrow-in-left fs-3 fw-bold text-white"></i>
              </Link>
              <Link to="/signup">
                <i class="bi bi-person-plus-fill fs-3 fw-bold text-white"></i>
              </Link>
            </>
          )}

          {(!user || (user && user.role === 0)) && (
            <Link to="/cart">
              <i class="bi bi-cart fs-3 fw-bold text-white"></i>
            </Link>
          )}

          {user && user.role === 0 && (
            <>
              <Link to="/user/profile">
                <i class="bi bi-person-circle fs-3 fw-bold text-white "></i>
              </Link>
            </>
          )}

          {user && user.role === 1 && (
            <>
              <Link to="/admin/dashboard">
                <i class="bi bi-speedometer fs-3 fw-bold text-white "></i>
              </Link>
            </>
          )}

          {user && (
            <Link to="index.js">
              {" "}
              <i
                class="bi bi-box-arrow-right fs-3 fw-bold text-white"
                onClick={signout}
              ></i>{" "}
            </Link>
          )}
        </div>
      </div>
      <PremiumNavbar />
    </>
  );
};

export default Navbar;

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const navItems = [
  { label: "Home", path: "/" },
  { label: "Products", path: "/products" },
  { label: "Contact", path: "/contact" },
];

const PremiumNavbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const location = useLocation();

  return (
    <>
      <AppBar
        position="sticky"
        elevation={3}
        sx={{
          bgcolor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid",
          borderColor: "divider",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 3,
            py: 1.5,
            minHeight: 72,
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255,255,255,0.7)",
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <Box sx={{ display: "flex", gap: 4 }}>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <Button
                  key={item.label}
                  component={Link}
                  to={item.path}
                  disableRipple
                  sx={{
                    px: 1,
                    py: 0.5,
                    position: "relative",
                    fontSize: "1rem",
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? "primary.main" : "text.primary",
                    textTransform: "none",
                    letterSpacing: 0.3,
                    transition: "color 0.3s ease",

                    "&::before": {
                      content: '""',
                      position: "absolute",
                      bottom: 4,
                      left: 0,
                      width: "100%",
                      height: "2px",
                      background: isActive
                        ? "linear-gradient(to right, #007fff, #00b8ff)"
                        : "transparent",
                      transition: "background 0.4s ease",
                      borderRadius: 2,
                    },

                    "&:hover": {
                      color: "primary.dark",
                      "&::before": {
                        background:
                          "linear-gradient(to right, #007fff, #00b8ff)",
                      },
                    },
                  }}
                >
                  {item.label}
                </Button>
              );
            })}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};
