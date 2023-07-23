/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import { db, auth } from "../../firebase-config";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import NotesIcon from "@mui/icons-material/Notes";
import TextField from "@mui/material/TextField";
import { ListItemIcon } from "@mui/material";

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function AddTodo() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [tempUidd, setTempUidd] = useState("");
  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars
  const [dense, setDense] = React.useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // read
        onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
          setTodos([]);
          const data = snapshot.val();
          if (data !== null) {
            // eslint-disable-next-line array-callback-return
            Object.values(data).map((todo) => {
              setTodos((oldArray) => [...oldArray, todo]);
            });
          }
        });
      } else if (!user) {
        navigate("/");
      }
    });
  }, []);

  const writeToDatabase = () => {
    const uidd = uid();
    set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
      todo: todo,
      uidd: uidd,
    });

    setTodo("");
  };

  // update
  const handleUpdate = (todo) => {
    setIsEdit(true);
    setTodo(todo.todo);
    setTempUidd(todo.uidd);
  };

  const handleEditConfirm = () => {
    update(ref(db, `/${auth.currentUser.uid}/${tempUidd}`), {
      todo: todo,
      tempUidd: tempUidd,
    });

    setTodo("");
    setIsEdit(false);
  };

  // delete
  const handleDelete = (uid) => {
    remove(ref(db, `/${auth.currentUser.uid}/${uid}`));
  };

  return (
    <div className="high_list">
      <div>
        <Box sx={{ flexGrow: 1, maxWidth: 952 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                High List
              </Typography>
              <Demo>
                <List>
                  <ListItem>
                    <List>
                      <TextField
                        id="standard-basic"
                        label="Add todo..."
                        variant="standard"
                        value={todo}
                        onChange={(e) => setTodo(e.target.value)}
                      />
                    </List>
                    <IconButton>
                      {isEdit ? (
                        <div>
                          <CheckIcon
                            onClick={handleEditConfirm}
                            className="add-confirm-icon"
                          />
                        </div>
                      ) : (
                        <div>
                          <AddIcon
                            onClick={writeToDatabase}
                            className="add-confirm-icon"
                          />
                        </div>
                      )}
                    </IconButton>
                  </ListItem>
                </List>
                {todos.map((todo) => (
                  <List dense={dense}>
                    <ListItem>
                      <ListItemIcon>
                        <IconButton edge="end" aria-label="edit">
                          <EditIcon onClick={() => handleUpdate(todo)} />
                        </IconButton>
                      </ListItemIcon>
                      <ListItemIcon>
                        <IconButton edge="end" aria-label="delete">
                          <DeleteIcon onClick={() => handleDelete(todo.uidd)} />
                        </IconButton>
                      </ListItemIcon>
                      <ListItemAvatar>
                        <Avatar>
                          <NotesIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={todo.todo}
                        style={{
                          overflowWrap: "anywhere",
                          wordWrap: "break-word",
                        }}
                      />
                    </ListItem>
                  </List>
                ))}
              </Demo>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
}
