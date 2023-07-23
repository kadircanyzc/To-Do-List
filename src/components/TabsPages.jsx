import * as React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, TextField, Container } from "@mui/material";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, db, dbf } from "../firebase-config";
import { useNavigate, Link } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import "../styles/TabsPages.css";

const validationSchema = yup.object({
  name: yup.string("Enter your name").required("Name is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),

  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  confirmPassword: yup
    .string("Confirm your password")
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Password confirmation is required"),
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs(props) {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [open, setOpen] = useState(false);
  const [openNot, setOpenNot] = useState(false);
  const [openNotLogin, setOpenNotLogin] = useState(false);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const navigate = useNavigate();

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [error, setError] = useState("");

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword,
        registerName
      ).then((auth) => {
        updateProfile(auth.user, {
          displayName: registerName,
        });
      });
      // await addDoc(collection(dbf, "register"), {
      //   registerName,
      //   registerEmail,
      //   registerPassword,
      // });
      console.log(user);
      setOpen(true);
    } catch (error) {
      console.log(error.message);
      setOpenNot(true);
      setError(error.message);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleCloseNot = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenNot(false);
  };

  const [errorLogin, setErrorLogin] = useState("");

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      localStorage.setItem("token", "sample_token");
      props.setIsLoggedIn(true);
      console.log(user);
    } catch (error) {
      console.log(error.message);
      setOpenNotLogin(true);
      setErrorLogin(error.message);
    }
  };

  const handleCloseNotLogin = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenNotLogin(false);
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className="tab-page">
      <div className="tab-pages-box">
        <Box
          margin="100px"
          marginLeft={"auto"}
          sx={{
            width: { xs: "100%", sm: 480 },
            bgcolor: "rgba(255,193,193 ,0.5)",
            borderRadius: "10px",
          }}
        >
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Login" {...a11yProps(0)} />
              <Tab label="Sing UP" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel
            value={value}
            justifyContent={"flex-end"}
            index={0}
            onSubmit={formik.handleSubmit}
          >
            <Container maxWidth="xs" style={{ marginTop: "50px" }}>
              <h1>Login</h1>

              <TextField
                name="email"
                variant="outlined"
                label="Email"
                fullWidth
                margin="normal"
                onChange={(event) => {
                  setLoginEmail(event.target.value);
                  formik.handleChange(event);
                }}
                value={formik.values.email}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                name="password"
                type="password"
                variant="outlined"
                label="Password"
                fullWidth
                margin="normal"
                onChange={(event) => {
                  setLoginPassword(event.target.value);
                  formik.handleChange(event);
                }}
                value={formik.values.password}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: "12px" }}
                onClick={login}
              >
                Login
              </Button>
              <Link
                to="/forgot-password"
                style={{ marginLeft: "160px", textDecoration: "none" }}
              >
                Forgot password?
              </Link>
              <Snackbar
                open={openNotLogin}
                autoHideDuration={6000}
                onClose={handleCloseNotLogin}
              >
                <Alert
                  onClose={handleCloseNotLogin}
                  severity="error"
                  sx={{ width: "100%" }}
                >
                  {errorLogin}
                </Alert>
              </Snackbar>
            </Container>
          </TabPanel>

          <TabPanel value={value} index={1} onSubmit={formik.handleSubmit}>
            <Container maxWidth="xs" style={{ marginTop: "50px" }}>
              <h1>Sign Up</h1>

              <TextField
                name="name"
                variant="outlined"
                label="Name-Surname"
                fullWidth
                margin="normal"
                value={(registerName, formik.values.name)}
                onChange={(event) => {
                  setRegisterName(event.target.value);
                  formik.handleChange(event);
                }}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />

              <TextField
                name="email"
                variant="outlined"
                label="Email"
                fullWidth
                margin="normal"
                value={(registerEmail, formik.values.email)}
                onChange={(event) => {
                  setRegisterEmail(event.target.value);
                  formik.handleChange(event);
                }}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />

              <TextField
                name="password"
                type="password"
                variant="outlined"
                label="Password"
                fullWidth
                margin="normal"
                value={(registerPassword, formik.values.password)}
                onChange={(event) => {
                  setRegisterPassword(event.target.value);
                  formik.handleChange(event);
                }}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />

              <TextField
                name="confirmPassword"
                type="password"
                variant="outlined"
                label="Confirm Password"
                fullWidth
                margin="normal"
                value={formik.values.confirmPassword}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
              />

              <Button
                type="submit"
                variant="contained"
                color="secondary"
                style={{ margin: "10px" }}
                onClick={() => {
                  register();
                  formik.resetForm();
                }}
              >
                Sign Up
              </Button>
              <Stack spacing={2} sx={{ width: "100%" }}>
                <Snackbar
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                >
                  <Alert
                    onClose={handleClose}
                    severity="success"
                    sx={{ width: "100%" }}
                  >
                    Başarılı Şekilde Kayıt Oldunuz.
                  </Alert>
                </Snackbar>
                <Snackbar
                  open={openNot}
                  autoHideDuration={6000}
                  onClose={handleCloseNot}
                >
                  <Alert
                    onClose={handleCloseNot}
                    severity="error"
                    sx={{ width: "100%" }}
                  >
                    {error}
                  </Alert>
                </Snackbar>
              </Stack>
            </Container>
          </TabPanel>
        </Box>
      </div>
    </div>
  );
}
