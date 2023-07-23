import { Box } from "@mui/material";
import { Button, TextField } from "@mui/material";
import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase-config";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!email) {
        return;
      }
      sendPasswordResetEmail(auth, email)
        .then(() => {
          alert("We have sent you a reset password email");
        })
        .catch((e) => {
          console.log(e);
        });
    },
    [email]
  );

  return (
    <Box
      margin={"100px auto"}
      sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: "background.paper" }}
    >
      <h1>Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          name="email"
          variant="outlined"
          label="Enter your email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "12px" }}
        >
          Send reset passord email
        </Button>
        <Link to="/" style={{ paddingLeft: "100px", textDecoration: "none" }}>
          Back to sing in
        </Link>
      </form>
    </Box>
  );
};

export default ForgotPassword;
