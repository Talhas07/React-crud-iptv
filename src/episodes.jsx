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

function Episodes() {
  const [episodes, setepisodes] = React.useState([]);
  const [editepisodes, seteditepisodes] = React.useState(null);

  React.useEffect(() => {
    axios
      .get("http://localhost:2022/episodes")
      .then((response) => {
        console.log(response.data);
        setepisodes(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const submitdata = async (e) => {
    e.preventDefault();
    const episodes = {
      name: e.target.name.value,
      description: e.target.description.value,
    };
    console.log(episodes);
    axios
      .post("http://localhost:2022/episodes", episodes)
      .then(async (res) => {
        const newdata = await axios.get("http://localhost:2022/episodes");
        setepisodes(newdata.data);
      })
      .finally(() => {
        (e.target.name.value = ""), (e.target.description.value = "");
      });
  };

  const deleteepisodes = async (id) => {
    axios
      .delete("http://localhost:2022/episodes/" + id)
      .then(async (response) => {
        const newdata = await axios.get("http://localhost:2022/episodes");
        setepisodes(newdata.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editepisode = (episodes) => {
    seteditepisodes(episodes);
  };

  const canceledit = () => {
    seteditepisodes(null);
  };
  const saveepisodes = async () => {
    if (editepisodes) {
      const newdata = {
        name: editepisodes.name,
        description: editepisodes.description,
      };

      console.log("http://localhost:2022/episodes/" + editepisodes._id);
      axios
        .patch("http://localhost:2022/episodes/" + editepisodes._id, newdata)
        .then(async (res) => {
          const newdata = await axios.get("http://localhost:2022/episodes/");
          setepisodes(newdata.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          seteditepisodes(null);
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
          <AntDButton color="primary" onClick={() => editepisode(record)}>
            EDIT
          </AntDButton>

          <AntDButton
            color="primary"
            onClick={() => deleteepisodes(record._id)}
          >
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
        Add Episode
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

      {editepisodes && (
        <div>
          <hr></hr>
          <Typography variant="h5" color="primary">
            Edit Episode
          </Typography>
          <TextField
            style={customStyle}
            type="text"
            label=" Name"
            variant="outlined"
            name="editedName"
            required
            value={editepisodes.name}
            onChange={(e) =>
              seteditepisodes({ ...editepisodes, name: e.target.value })
            }
          />
          <TextField
            style={customStyle}
            type="text"
            label="Description"
            variant="outlined"
            name="editeddescription"
            required
            value={editepisodes.description}
            onChange={(e) =>
              seteditepisodes({ ...editepisodes, description: e.target.value })
            }
          />

          <MuiButton
            style={customStyle}
            variant="contained"
            color="primary"
            onClick={saveepisodes}
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
        Episodes
      </Typography>

      <Table columns={columns} dataSource={episodes} />
    </div>
  );
}

export default Episodes;
