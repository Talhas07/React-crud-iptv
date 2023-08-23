import "./App.css";
import axios from "axios";
import React from "react";
import {
  Typography,
  AppBar,
  Toolbar,
  TextField,
  Button as MuiButton,
} from "@mui/material";

import { Table, Button as AntDButton } from "antd";

const token = localStorage.getItem("token");

const headers = {
  Authorization: `Bearer ${token}`,
};
const apiUrl = "https://tiny-fly-sweatshirt.cyclic.cloud";

function Genre() {
  const [genres, setGenres] = React.useState([]);
  const [editedGenre, setEditedGenre] = React.useState(null);

  React.useEffect(() => {
    console.log("the use effect hook is working");
    axios
      .get(apiUrl + "/genres", { headers })
      .then((response) => {
        setGenres(response.data);
      })
      .catch((error) => {
        const defaultGenre = {
          _id: "1",
          name: "Default genre",
        };
        setGenres([defaultGenre]);
      });
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const genre = {
      name: e.target.name.value,
    };
    axios
      .post(apiUrl + "/genres", genre, { headers })
      .then(async (res) => {
        const genreList = await axios.get(apiUrl + "/genres", { headers });
        setGenres(genreList.data);
      })
      .catch((err) => {
        genre._id = (genres.length + 1).toString();
        const tempGenres = [...genres, genre];
        setGenres(tempGenres);
      })
      .finally(() => {
        e.target.name.value = "";
      });
  };

  const deleteGenre = async (id) => {
    axios
      .delete(apiUrl + "/genres/${id}", { headers })
      .then(async (res) => {
        const genreList = await axios.get(apiUrl + "/genres", { headers });
        setGenres(genreList.data);
      })
      .catch((err) => {
        const tempGenres = genres.filter((genre) => genre._id !== id);
        setGenres(tempGenres);
      });
  };

  const editGenre = (genre) => {
    setEditedGenre(genre);
  };
  //changed nothing
  const saveEditedGenre = async () => {
    if (editedGenre) {
      const updatedGenre = {
        name: editedGenre.name,
      };

      axios
        .patch(apiUrl + "/genres/${editedGenre._id}", updatedGenre, { headers })
        .then(async (res) => {
          const genreList = await axios.get(apiUrl + "/genres", { headers });
          setGenres(genreList.data);
        })
        .catch((err) => {})
        .finally(() => {
          setEditedGenre(null);
        });
    }
  };

  const cancelEdit = () => {
    setEditedGenre(null);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <>
          <AntDButton color="primary" onClick={() => editGenre(record)}>
            Edit
          </AntDButton>
          <AntDButton color="secondary" onClick={() => deleteGenre(record._id)}>
            Delete
          </AntDButton>
        </>
      ),
    },
  ];

  const customStyle = {
    margin: "5px",
    marginTop: "10px",
    marginBottom: "10px",
    width: "100%",
    height: "50px",
    borderRadius: "5px",
    fontSize: "16px",
  };

  return (
    <div className="App">
      <div style={{ marginTop: "50px" }} />
      <Typography variant="h5" color="primary">
        Add Genre
      </Typography>

      <form onSubmit={onSubmit}>
        <TextField
          style={customStyle}
          type="text"
          label="Name"
          variant="outlined"
          name="name"
          required
        />

        <MuiButton
          style={customStyle}
          variant="contained"
          color="primary"
          type="submit"
        >
          Save
        </MuiButton>
      </form>

      {/* Edit form */}
      {editedGenre && (
        <div>
          <TextField
            style={customStyle}
            type="text"
            label="Name"
            variant="outlined"
            name="editedName"
            required
            value={editedGenre.name}
            onChange={(e) =>
              setEditedGenre({ ...editedGenre, name: e.target.value })
            }
          />
          <MuiButton
            style={customStyle}
            variant="contained"
            color="primary"
            onClick={saveEditedGenre}
          >
            Save
          </MuiButton>
          <MuiButton
            style={customStyle}
            variant="outlined"
            color="secondary"
            onClick={cancelEdit}
          >
            Cancel
          </MuiButton>
        </div>
      )}

      <Typography variant="h5" color="primary">
        Genre
      </Typography>
      <Table columns={columns} dataSource={genres} />
    </div>
  );
}
export default Genre;
