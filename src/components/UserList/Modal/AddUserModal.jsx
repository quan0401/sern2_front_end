import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { createNewUser, getAllGroups } from "../../../setup/axios";

const defaultUserData = {
  username: "",
  email: "",
  phone: "",
  sex: "male",
  address: "",
  password: "",
  groupId: 1,
};

function AddUserModal({ ...props }) {
  const [groups, setGroups] = useState([]);
  const [newUser, setNewUser] = useState(defaultUserData);
  console.log(newUser.groupId);

  const handleSubmitNewUser = async () => {
    const result = await createNewUser(newUser);
    props.onHide();
  };

  // Get groups
  useEffect(() => {
    const fetchGroups = async () => {
      const result = await getAllGroups();
      setGroups(result.DT);
    };
    if (props.show) {
      fetchGroups();
    }
  }, [props.show]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="row ">
            <div className="form-group col-6">
              <label htmlFor="email">Email address</label>
              <input
                onChange={(e) =>
                  setNewUser((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group col-6">
              <label htmlFor="username">Username</label>
              <input
                onChange={(e) =>
                  setNewUser((prev) => ({
                    ...prev,
                    username: e.target.value,
                  }))
                }
                type="text"
                className="form-control"
                id="username"
                placeholder="Username"
              />
            </div>
            <div className="form-group col-12 mb-3">
              <label htmlFor="address">Address</label>
              <input
                onChange={(e) =>
                  setNewUser((prev) => ({
                    ...prev,
                    address: e.target.value,
                  }))
                }
                type="text"
                className="form-control"
                id="address"
                placeholder="Address"
              />
            </div>
            <div className="form-group col-6">
              <label htmlFor="phone">Phone</label>
              <input
                onChange={(e) =>
                  setNewUser((prev) => ({
                    ...prev,
                    phone: e.target.value,
                  }))
                }
                type="text"
                className="form-control"
                id="phone"
                placeholder="Phone"
              />
            </div>
            <div className="form-group col-6">
              <label htmlFor="password">Password</label>
              <input
                onChange={(e) =>
                  setNewUser((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
              />
            </div>

            <div className="col-6 mt-3">
              <select
                onChange={(e) =>
                  setNewUser((prev) => ({
                    ...prev,
                    sex: e.target.value,
                  }))
                }
                className="form-select "
                aria-label="Default select example"
              >
                <option defaultValue value="male">
                  Male
                </option>
                <option defaultValue value="female">
                  Female
                </option>
                <option defaultValue value="other">
                  Other
                </option>
              </select>
            </div>

            <div className="col-6 mt-3">
              <select
                onChange={(e) =>
                  setNewUser((prev) => ({
                    ...prev,
                    groupId: +e.target.value,
                  }))
                }
                className="form-select "
                aria-label="Default select example"
              >
                {groups.map((group, index) => {
                  if (index === 0)
                    return (
                      <option key={index} defaultValue value={index + 1}>
                        {group.name}
                      </option>
                    );
                  return (
                    <option key={index} value={index + 1}>
                      {group.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmitNewUser}>Submit</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default AddUserModal;
