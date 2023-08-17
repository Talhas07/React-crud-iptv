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

function Series() {
  const [series, setseries] = React.useState([]);
  const [editseries, seteditseries] = React.useState(null);

  React.useEffect(() => {
    axios
      .get("http://localhost:2022/series")
      .then((response) => {
        console.log(response.data);
        setseries(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const submitdata = async (e) => {
    e.preventDefault();
    const series = {
      name: e.target.name.value,
      description: e.target.description.value,
    };
    console.log(series);
    axios
      .post("http://localhost:2022/series", series)
      .then(async (res) => {
        const newdata = await axios.get("http://localhost:2022/series");
        setseries(newdata.data);
      })
      .finally(() => {
        (e.target.name.value = ""), (e.target.description.value = "");
      });
  };

  const deleteseries = async (id) => {
    axios
      .delete("http://localhost:2022/series/" + id)
      .then(async (response) => {
        const newdata = await axios.get("http://localhost:2022/series");
        setseries(newdata.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editserie = (series) => {
    seteditseries(series);
  };

  const canceledit = () => {
    seteditseries(null);
  };
  const saveseries = async () => {
    if (editseries) {
      const newdata = {
        name: editseries.name,
        description: editseries.description,
      };

      console.log("http://localhost:2022/series/" + editseries._id);
      axios
        .patch("http://localhost:2022/series/" + editseries._id, newdata)
        .then(async (res) => {
          const newdata = await axios.get("http://localhost:2022/series/");
          setseries(newdata.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          seteditseries(null);
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
          <AntDButton color="primary" onClick={() => editserie(record)}>
            EDIT
          </AntDButton>

          <AntDButton color="primary" onClick={() => deleteseries(record._id)}>
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
        Add Series
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

      {editseries && (
        <div>
          <hr></hr>
          <Typography variant="h5" color="primary">
            Edit Series
          </Typography>
          <TextField
            style={customStyle}
            type="text"
            label=" Name"
            variant="outlined"
            name="editedName"
            required
            value={editseries.name}
            onChange={(e) =>
              seteditseries({ ...editseries, name: e.target.value })
            }
          />
          <TextField
            style={customStyle}
            type="text"
            label="Description"
            variant="outlined"
            name="editeddescription"
            required
            value={editseries.description}
            onChange={(e) =>
              seteditseries({ ...editseries, description: e.target.value })
            }
          />

          <MuiButton
            style={customStyle}
            variant="contained"
            color="primary"
            onClick={saveseries}
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
        series
      </Typography>

      <Table columns={columns} dataSource={series} />
    </div>
  );
}

export default Series;
