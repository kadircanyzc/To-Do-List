import React from "react";
import AvatarProfile from "./Navbar/AvatarProfile";
import AddTodo from "./Pages/AddTodo";
import MediumTodo from "./Todo Lists/MediumTodo";
import LowTodo from "./Todo Lists/LowTodo";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import "../styles/Dashboard.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Dashboard() {
  return (
    <div className="dashboard">
      <AvatarProfile />

      <Box sx={{ width: "100%" }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid item xs={7}>
            <Item>
              <AddTodo />
            </Item>
          </Grid>
          <Grid item xs={7}>
            <Item>
              <MediumTodo />
            </Item>
          </Grid>
          <Grid item xs={7}>
            <Item>
              <LowTodo />
            </Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
