import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
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

export default function MediumTodo() {
  const [dataSource, setDataSource] = useState([]);
  const [dataJsData, setDataJsData] = useState([]);
  const [formValue, setFormValue] = useState({
    name: "",
  });
  const [editingItemId, setEditingItemId] = useState(null);
  const [dense, setDense] = React.useState(false);

  const handleFormChange = (e) => {
    setFormValue((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSave = () => {
    if (editingItemId) {
      // Eğer editingItemId varsa, mevcut veriyi güncelle.
      updateData(editingItemId);
    } else {
      // Eğer editingItemId yoksa, yeni veri ekle.
      addNewData();
    }
  };

  const handleEdit = (id) => {
    setFormValue(dataSource.find((item) => item.ID === id));
    setEditingItemId(id);
  };

  const handleDelete = (id) => {
    deleteData(id);
  };

  const addNewData = () => {
    const data = { ...formValue, ID: uuid() };
    setDataSource((prevState) => {
      const newList = [...prevState, data];
      localStorage.setItem("datasource", JSON.stringify(newList));
      return newList;
    });
    setFormValue({ name: "" });
  };

  const updateData = (id) => {
    setDataSource((prevState) => {
      const updatedList = prevState.map((item) =>
        item.ID === id ? { ...item, name: formValue.name } : item
      );
      localStorage.setItem("datasource", JSON.stringify(updatedList));
      return updatedList;
    });
    setFormValue({ name: "" });
    setEditingItemId(null);
  };

  const deleteData = (id) => {
    setDataSource((prevState) => {
      const newList = prevState.filter((item) => item.ID !== id);
      localStorage.setItem("datasource", JSON.stringify(newList));
      return newList;
    });
  };

  useEffect(() => {
    if (localStorage.getItem("datasource")) {
      setDataSource(JSON.parse(localStorage.getItem("datasource")));
    }
  }, []);

  useEffect(() => {
    setDataJsData(dataSource);
  }, [dataSource]);

  return (
    <div>
      <div>
        <Box sx={{ flexGrow: 1, maxWidth: 952 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                Medium List
              </Typography>
              <Demo>
                <List>
                  <ListItem>
                    <List>
                      <TextField
                        id="standard-basic"
                        label="Add todo..."
                        variant="standard"
                        name="name"
                        value={formValue.name}
                        onChange={handleFormChange}
                      />
                    </List>
                    <IconButton onClick={handleSave}>
                      {editingItemId ? <CheckIcon /> : <AddIcon />}
                    </IconButton>
                  </ListItem>
                </List>
                {dataJsData.map((item) => (
                  <List dense={dense} key={item.ID}>
                    <ListItem>
                      <ListItemIcon>
                        <IconButton edge="end" aria-label="edit">
                          <EditIcon onClick={() => handleEdit(item.ID)} />
                        </IconButton>
                      </ListItemIcon>
                      <ListItemIcon>
                        <IconButton edge="end" aria-label="delete">
                          <DeleteIcon onClick={() => handleDelete(item.ID)} />
                        </IconButton>
                      </ListItemIcon>
                      <ListItemAvatar>
                        <Avatar>
                          <NotesIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.name}
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
