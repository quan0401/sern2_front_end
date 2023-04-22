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

const defaultValidationStatus = {
  username: null,
  email: null,
  phone: null,
  address: null,
  password: null,
};
function AddUserModal({ ...props }) {
  const [groups, setGroups] = useState([]);
  const [newUser, setNewUser] = useState(defaultUserData);
  const [validationStatus, setValidationStatus] = useState(
    defaultValidationStatus
  );

  const handleSubmitNewUser = async () => {
    submitValidation();
  };

  useEffect(() => {
    const submitNewUser = async () => {
      const keys = Object.keys(validationStatus);
      const result = keys.every((key) => {
        return validationStatus[key] === true;
      });
      if (result) {
        await createNewUser(newUser);
        props.onHide();
      }
    };
    submitNewUser();
  }, [validationStatus]);
  // Set it back to the defaultValue when the modal is shown/unshown
  useEffect(() => {
    setValidationStatus(defaultValidationStatus);
  }, [props.show]);

  // User input validation
  const submitValidation = () => {
    const keys = Object.keys(validationStatus);
    keys.forEach((key) => {
      setValidationStatus((prev) => ({ ...prev, [key]: true }));
      if (newUser[key].trim() === "")
        setValidationStatus((prev) => ({ ...prev, [key]: false }));
      switch (key) {
        case "email":
          const { email } = newUser;
          const validateEmail = (email) => {
            return email.match(
              /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
          };
          if (!validateEmail(email))
            setValidationStatus((prev) => ({ ...prev, [key]: false }));
          break;
        case "password":
          const { password } = newUser;
          if (password.trim() === "" || password.length < 8) {
            setValidationStatus((prev) => ({ ...prev, [key]: false }));
          }
      }
    });
  };
  // use in className
  const isValid = (fieldName) => {
    if (validationStatus[fieldName] === null) return "";
    if (validationStatus[fieldName]) return " is-valid";
    else return " is-invalid";
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
                required
                onChange={(e) =>
                  setNewUser((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                type="email"
                className={"form-control" + isValid("email")}
                id="email"
                value={newUser.email}
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
                required
                onChange={(e) =>
                  setNewUser((prev) => ({
                    ...prev,
                    username: e.target.value,
                  }))
                }
                type="text"
                className={"form-control" + isValid("username")}
                id="username"
                value={newUser.username}
                placeholder="Username"
              />
              <div className="valid-feedback">Looks good</div>
              <div className="invalid-feedback"></div>
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
                className={"form-control" + isValid("address")}
                id="address"
                value={newUser.address}
                placeholder="Address"
              />
            </div>
            <div className="form-group col-6">
              <label htmlFor="phone">Phone</label>
              <input
                required
                onChange={(e) =>
                  setNewUser((prev) => ({
                    ...prev,
                    phone: e.target.value,
                  }))
                }
                type="text"
                className={"form-control" + isValid("phone")}
                id="phone"
                value={newUser.phone}
                placeholder="Phone"
              />
            </div>
            <div className="form-group col-6">
              <label htmlFor="password">Password</label>
              <input
                required
                onChange={(e) =>
                  setNewUser((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                type="password"
                className={"form-control" + isValid("password")}
                id="password"
                value={newUser.password}
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
