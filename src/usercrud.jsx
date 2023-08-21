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

function Users() {
  const [users, setusers] = React.useState([]);
  const [editusers, seteditusers] = React.useState(null);
  React.useEffect(() => {
    axios
      .get("https://tiny-fly-sweatshirt.cyclic.cloud/users")
      .then((response) => {
        console.log(response.data);
        setusers(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const submitdata = async (e) => {
    e.preventDefault();
    const user = {
      first_name: e.target.first_name.value,
      last_name: e.target.last_name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    axios
      .post("https://tiny-fly-sweatshirt.cyclic.cloud/users/registration", user)
      .then(async (res) => {
        const newdata = await axios.get(
          "https://tiny-fly-sweatshirt.cyclic.cloud/users"
        );
        setusers(newdata.data);
      })
      .finally(() => {
        (e.target.first_name.value = ""),
          (e.target.last_name.value = ""),
          (e.target.email.value = ""),
          (e.target.password.value = "");
      });
  };
  const deleteuser = async (id) => {
    axios
      .delete("https://tiny-fly-sweatshirt.cyclic.cloud/users/" + id)
      .then(async (response) => {
        const newdata = await axios.get(
          "https://tiny-fly-sweatshirt.cyclic.cloud/users"
        );
        setusers(newdata.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const edituser = (user) => {
    seteditusers(user);
  };

  const canceledit = () => {
    seteditusers(null);
  };
  const saveuser = async () => {
    if (editusers) {
      const newdata = {
        first_name: editusers.first_name,
        last_name: editusers.last_name,
        email: editusers.email,
        password: editusers.password,
      };

      console.log(
        "https://tiny-fly-sweatshirt.cyclic.cloud/users/" + editusers._id
      );
      axios
        .patch(
          "https://tiny-fly-sweatshirt.cyclic.cloud/users/" + editusers._id,
          newdata
        )
        .then(async (res) => {
          const newdata = await axios.get(
            "https://tiny-fly-sweatshirt.cyclic.cloud/users/"
          );
          setusers(newdata.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          seteditusers(null);
        });
    }
  };
  const columns = [
    {
      title: "First Name",
      key: "first_name",
      dataIndex: "first_name",
    },
    {
      title: "Last Name",
      key: "last_name",
      dataIndex: "last_name",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Password",
      key: "password",
      dataIndex: "password",
    },
    {
      title: "action",
      key: "action",
      render: (text, record) => (
        <>
          <AntDButton color="primary" onClick={() => edituser(record)}>
            EDIT
          </AntDButton>

          <AntDButton color="primary" onClick={() => deleteuser(record._id)}>
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
      {/* <AppBar>
        <Toolbar>
          <Typography variant="h6" color="inherit">
            USERS
          </Typography>
        </Toolbar>
      </AppBar> */}
      <div style={{ marginTop: "90px" }} />
      <Typography variant="h5" color="primary">
        Add user
      </Typography>

      <form onSubmit={submitdata}>
        <TextField
          style={customStyle}
          type="text"
          label="First Name"
          variant="outlined"
          name="first_name"
          required
        />
        <TextField
          style={customStyle}
          type="text"
          label="Last Name"
          variant="outlined"
          name="last_name"
          required
        />
        <TextField
          style={customStyle}
          type="text"
          label="Email"
          variant="outlined"
          name="email"
          required
        />
        <TextField
          style={customStyle}
          type="text"
          label="Password"
          variant="outlined"
          name="password"
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
      {editusers && (
        <div>
          <hr></hr>
          <Typography variant="h5" color="primary">
            Edit user
          </Typography>
          <TextField
            style={customStyle}
            type="text"
            label="First Name"
            variant="outlined"
            name="editedName"
            required
            value={editusers.first_name}
            onChange={(e) =>
              seteditusers({ ...editusers, first_name: e.target.value })
            }
          />
          <TextField
            style={customStyle}
            type="text"
            label="Last Name"
            variant="outlined"
            name="editedlast"
            required
            value={editusers.last_name}
            onChange={(e) =>
              seteditusers({ ...editusers, last_name: e.target.value })
            }
          />
          <TextField
            style={customStyle}
            type="text"
            label="Email"
            variant="outlined"
            name="editedemail"
            required
            value={editusers.email}
            onChange={(e) =>
              seteditusers({ ...editusers, email: e.target.value })
            }
          />
          <TextField
            style={customStyle}
            type="text"
            label="Password"
            variant="outlined"
            name="editedpassword"
            required
            value={editusers.password}
            onChange={(e) =>
              seteditusers({ ...editusers, password: e.target.value })
            }
          />

          <MuiButton
            style={customStyle}
            variant="contained"
            color="primary"
            onClick={saveuser}
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
        USERS
      </Typography>

      <Table columns={columns} dataSource={users} />
    </div>
  );
}

export default Users;
