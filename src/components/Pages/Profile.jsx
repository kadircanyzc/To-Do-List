import * as React from "react";
import AvatarProfile from "../Navbar/AvatarProfile";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase-config";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyIcon from "@mui/icons-material/Key";
import DraftsIcon from "@mui/icons-material/Drafts";
import "../../styles/Profile.css";

const Profile = () => {
  const [user, isLoading] = useAuthState(auth);

  if (isLoading) {
    return <h1>Loading..</h1>;
  }

  return (
    <div className="profile">
      <div>
        <AvatarProfile />
      </div>
      <Box
        sx={{
          width: "100%",
          maxWidth: 360,
          margin: "auto",
          marginTop: "150px",
          bgcolor: "rgba(251,248,204 ,0.5)",
          borderRadius: "10px",
        }}
      >
        <nav aria-label="main mailbox folders">
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary={user.displayName} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary={user.email} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <KeyIcon />
                </ListItemIcon>
                <ListItemText primary="********" />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
        <Divider />
        <nav aria-label="secondary mailbox folders">
          <List>
            <ListItem disablePadding>
              <ListItemButton component="a" href="/forgot-password">
                <ListItemText primary="Change password" />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
      </Box>
    </div>
  );
};

export default Profile;
