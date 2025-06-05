import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Paper,
  Typography,
  DialogContentText,
  Box,
  CircularProgress,
  Snackbar,
  Alert,
  Tooltip,
  Avatar,
} from "@mui/material";
import { Edit, Delete, Add, Person } from "@mui/icons-material";
import Navbar from "../layout/Navbar";
import Adminsidebar from "../layout/adminsidebar";
import Footer from "../layout/Footer";
import axios from "axios";
import { API } from "../../config";
import { isAuthenticated } from "../../API/userAPI";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/system";

const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: "12px",
  boxShadow: "0 8px 32px rgba(0,0,0,0.05)",
  overflow: "hidden",
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme?.palette?.action?.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const UserManagement = () => {
  const { token } = isAuthenticated();
  const theme = useTheme();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    password: false,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/userlist`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      showSnackbar("Failed to fetch users", "error");
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const errors = {
      name: !formData.name.trim(),
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
      password: !editingUser && !formData.password,
    };
    setFormErrors(errors);
    return !Object.values(errors).some(Boolean);
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      if (editingUser) {
        await axios.put(
          `${API}/updateuser/${editingUser._id}`,
          {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        showSnackbar("User updated successfully", "success");
      } else {
        await axios.post(`${API}/register`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        showSnackbar("User added successfully", "success");
      }
      fetchUsers();
      handleCloseForm();
    } catch (err) {
      console.error(err);
      const message = err.response?.data?.message || "An error occurred";
      showSnackbar(message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`${API}/deleteuser/${selectedUserId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      showSnackbar("User deleted successfully", "success");
      fetchUsers();
    } catch (err) {
      console.error(err);
      showSnackbar("Failed to delete user", "error");
    } finally {
      setLoading(false);
      setOpenConfirm(false);
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleOpenForm = (user = null) => {
    setEditingUser(user);
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      password: "",
    });
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setEditingUser(null);
    setFormData({ name: "", email: "", password: "" });
    setFormErrors({ name: false, email: false, password: false });
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // Clear error when user starts typing
    if (formErrors[e.target.name]) {
      setFormErrors((prev) => ({ ...prev, [e.target.name]: false }));
    }
  };

  const handleConfirmDelete = (id) => {
    setSelectedUserId(id);
    setOpenConfirm(true);
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          minHeight: "calc(100vh - 128px)",
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Adminsidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            padding: "2rem",
            backgroundColor: theme.palette.background.default,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography variant="h4" component="h1" fontWeight="bold">
              User Management
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => handleOpenForm()}
              sx={{
                borderRadius: "8px",
                textTransform: "none",
                padding: "8px 16px",
              }}
            >
              Add User
            </Button>
          </Box>

          <StyledPaper>
            {loading && !users.length ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "200px",
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <Table sx={{ minWidth: 650 }}>
                <TableHead sx={{ backgroundColor: theme.palette.grey[100] }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>User</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <StyledTableRow key={user._id}>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Avatar
                            sx={{ mr: 2, bgcolor: theme.palette.primary.main }}
                          >
                            <Person />
                          </Avatar>
                          <Typography>{user.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Tooltip title="Edit">
                          <IconButton
                            color="primary"
                            onClick={() => handleOpenForm(user)}
                            sx={{ mr: 1 }}
                          >
                            <Edit />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            color="error"
                            onClick={() => handleConfirmDelete(user._id)}
                          >
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </StyledPaper>

          {/* Add/Edit User Dialog */}
          <Dialog
            open={openForm}
            onClose={handleCloseForm}
            fullWidth
            maxWidth="sm"
          >
            <DialogTitle sx={{ fontWeight: "bold" }}>
              {editingUser ? "Edit User" : "Add New User"}
            </DialogTitle>
            <DialogContent dividers>
              <TextField
                fullWidth
                margin="normal"
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={formErrors.name}
                helperText={formErrors.name && "Name is required"}
                sx={{ mb: 2 }}
                inputProps={{
                  style: {
                    borderRadius: "8px",
                    padding: "10px",
                    fontSize: "16px",
                    height: "50px",
                  },
                }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={formErrors.email}
                helperText={formErrors.email && "Valid email is required"}
                sx={{ mb: 2 }}
                inputProps={{
                  style: {
                    borderRadius: "8px",
                    padding: "10px",
                    fontSize: "16px",
                    height: "50px",
                  },
                }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={formErrors.password}
                inputProps={{
                  style: {
                    borderRadius: "8px",
                    padding: "10px",
                    fontSize: "16px",
                    height: "50px",
                  },
                }}
                helperText={
                  formErrors.password && !editingUser
                    ? "Password is required"
                    : editingUser
                    ? "Leave blank to keep current password"
                    : ""
                }
              />
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button
                onClick={handleCloseForm}
                sx={{ borderRadius: "8px", textTransform: "none" }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={loading}
                sx={{ borderRadius: "8px", textTransform: "none" }}
              >
                {loading ? (
                  <CircularProgress size={24} />
                ) : editingUser ? (
                  "Update"
                ) : (
                  "Add"
                )}
              </Button>
            </DialogActions>
          </Dialog>

          {/* Delete Confirmation Dialog */}
          <Dialog
            open={openConfirm}
            onClose={() => setOpenConfirm(false)}
            maxWidth="xs"
            fullWidth
          >
            <DialogTitle sx={{ fontWeight: "bold" }}>
              Confirm Deletion
            </DialogTitle>
            <DialogContent dividers>
              <DialogContentText>
                Are you sure you want to delete this user? This action cannot be
                undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button
                onClick={() => setOpenConfirm(false)}
                sx={{ borderRadius: "8px", textTransform: "none" }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                color="error"
                variant="contained"
                disabled={loading}
                sx={{ borderRadius: "8px", textTransform: "none" }}
              >
                {loading ? <CircularProgress size={24} /> : "Delete"}
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
      <Footer />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default UserManagement;
