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

function Streams() {
  const [streams, setstreams] = React.useState([]);
  const [editstreams, seteditstreams] = React.useState(null);
  React.useEffect(() => {
    axios
      .get("https://tiny-fly-sweatshirt.cyclic.cloud/streams")
      .then((response) => {
        console.log(response.data);
        setstreams(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const submitdata = async (e) => {
    e.preventDefault();
    const stream = {
      time: e.target.time.value,
    };
    axios
      .post("https://tiny-fly-sweatshirt.cyclic.cloud/streams", stream)
      .then(async (res) => {
        const newdata = await axios.get(
          "https://tiny-fly-sweatshirt.cyclic.cloud/streams"
        );
        setstreams(newdata.data);
      })
      .finally(() => {
        e.target.time.value = "";
      });
  };
  const deletestream = async (id) => {
    axios
      .delete("https://tiny-fly-sweatshirt.cyclic.cloud/streams/" + id)
      .then(async (response) => {
        const newdata = await axios.get(
          "https://tiny-fly-sweatshirt.cyclic.cloud/streams"
        );
        setstreams(newdata.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editstream = (streams) => {
    seteditstreams(streams);
  };

  const canceledit = () => {
    seteditstreams(null);
  };
  const savestream = async () => {
    if (editstreams) {
      const newdata = {
        time: editstreams.time,
      };

      console.log(
        "https://tiny-fly-sweatshirt.cyclic.cloud/streams/" + editstreams._id,
        newdata
      );
      axios
        .patch(
          "https://tiny-fly-sweatshirt.cyclic.cloud/streams/" + editstreams._id,
          newdata
        )
        .then(async (res) => {
          const newdata = await axios.get(
            "https://tiny-fly-sweatshirt.cyclic.cloud/streams/"
          );
          setstreams(newdata.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          seteditstreams(null);
        });
    }
  };
  const columns = [
    {
      title: "Time",
      key: "time",
      dataIndex: "time",
    },
    {
      title: "action",
      key: "action",
      render: (text, record) => (
        <>
          <AntDButton color="primary" onClick={() => editstream(record)}>
            EDIT
          </AntDButton>

          <AntDButton color="primary" onClick={() => deletestream(record._id)}>
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
        Add stream
      </Typography>

      <form onSubmit={submitdata}>
        <TextField
          style={customStyle}
          type="text"
          label="Time"
          variant="outlined"
          name="time"
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
      {editstreams && (
        <div>
          <hr></hr>
          <Typography variant="h5" color="primary">
            Edit Stream
          </Typography>
          <TextField
            style={customStyle}
            type="text"
            label="Time"
            variant="outlined"
            name="editedtime"
            required
            value={editstreams.time}
            onChange={(e) =>
              seteditstreams({ ...editstreams, time: e.target.value })
            }
          />

          <MuiButton
            style={customStyle}
            variant="contained"
            color="primary"
            onClick={savestream}
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
        Streams
      </Typography>

      <Table columns={columns} dataSource={streams} />
    </div>
  );
}

export default Streams;
