import {
  Typography,
  AppBar,
  Toolbar,
  TextField,
  Button as MuiButton,
} from "@mui/material";
import { Table, Button as AntDButton } from "antd";
import axios from "axios";
import React from "react";
import "./App.css";

function Seasons() {
  const [seasons, setseasons] = React.useState([]);
  const [editseasons, seteditseasons] = React.useState(null);

  React.useEffect(() => {
    axios
      .get("http://localhost:2022/seasons")
      .then((response) => {
        console.log(response.data);
        setseasons(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const submitdata = async (e) => {
    e.preventDefault();
    const seasons = {
      name: e.target.name.value,
      description: e.target.description.value,
    };
    console.log(seasons);
    axios
      .post("http://localhost:2022/seasons", seasons)
      .then(async (res) => {
        const newdata = await axios.get("http://localhost:2022/seasons");
        setseasons(newdata.data);
      })
      .finally(() => {
        (e.target.name.value = ""), (e.target.description.value = "");
      });
  };

  const deleteseasons = async (id) => {
    axios
      .delete("http://localhost:2022/seasons/" + id)
      .then(async (response) => {
        const newdata = await axios.get("http://localhost:2022/seasons");
        setseasons(newdata.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editseason = (seasons) => {
    seteditseasons(seasons);
  };

  const canceledit = () => {
    seteditseasons(null);
  };
  const saveseasons = async () => {
    if (editseasons) {
      const newdata = {
        name: editseasons.name,
        description: editseasons.description,
      };

      console.log("http://localhost:2022/seasons/" + editseasons._id);
      axios
        .patch("http://localhost:2022/seasons/" + editseasons._id, newdata)
        .then(async (res) => {
          const newdata = await axios.get("http://localhost:2022/seasons/");
          setseasons(newdata.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          seteditseasons(null);
        });
    }
  };
  const columns = [
    {
      title: " Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Description",
      key: "description",
      dataIndex: "description",
    },
    {
      title: "action",
      key: "action",
      render: (text, record) => (
        <>
          <AntDButton color="primary" onClick={() => editseason(record)}>
            EDIT
          </AntDButton>

          <AntDButton color="primary" onClick={() => deleteseasons(record._id)}>
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
        Add season
      </Typography>

      <form onSubmit={submitdata}>
        <TextField
          style={customStyle}
          type="text"
          label="Name"
          variant="outlined"
          name="name"
          required
        />
        <TextField
          style={customStyle}
          type="text"
          label="Description"
          variant="outlined"
          name="description"
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

      {editseasons && (
        <div>
          <hr></hr>
          <Typography variant="h5" color="primary">
            Edit season
          </Typography>
          <TextField
            style={customStyle}
            type="text"
            label=" Name"
            variant="outlined"
            name="editedName"
            required
            value={editseasons.name}
            onChange={(e) =>
              seteditseasons({ ...editseasons, name: e.target.value })
            }
          />
          <TextField
            style={customStyle}
            type="text"
            label="Description"
            variant="outlined"
            name="editeddescription"
            required
            value={editseasons.description}
            onChange={(e) =>
              seteditseasons({ ...editseasons, description: e.target.value })
            }
          />

          <MuiButton
            style={customStyle}
            variant="contained"
            color="primary"
            onClick={saveseasons}
          >
            Save
          </MuiButton>
          <MuiButton
            style={customStyle}
            variant="outlined"
            color="secondary"
            onClick={canceledit}
          >
            Cancel
          </MuiButton>
        </div>
      )}
      <Typography variant="h5" color="primary">
        seasons
      </Typography>

      <Table columns={columns} dataSource={seasons} />
    </div>
  );
}

export default Seasons;
