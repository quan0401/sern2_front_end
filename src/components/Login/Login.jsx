import { useState } from "react";
import "./Login.scss";
import { LoginUser } from "../../service/userService";
import { Navigate, useNavigate } from "react-router-dom";

const defaultUserData = {
  username: "",
  email: "",
  phone: "",
  sex: "male",
  address: "",
  password: "",
  groupId: 1,
};

function Login() {
  const [user, setUser] = useState(defaultUserData);
  const navigate = useNavigate();

  const loginUser = async () => {
    const result = await LoginUser(user);
    if (result.EC === 0) navigate("/user-table");
  };

  return (
    <>
      <div>
        <div className="login">
          <div className="form">
            <h2>Hello User</h2>
            <div className="form-field">
              <label htmlFor="login-mail">
                <i className="fa fa-user"></i>
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="E-Mail/Phone"
                required
                value={user.email}
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, email: e.target.value }))
                }
              />
              {/* <svg><use href="#svg-check" /></svg> */}
            </div>
            <div className="form-field">
              <label htmlFor="login-password">
                <i className="fa fa-lock"></i>
              </label>
              <input
                id="login-password"
                type="password"
                name="password"
                placeholder="Password"
                pattern=".{6,}"
                required
                value={user.password}
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, password: e.target.value }))
                }
              />
              {/* <svg><use href="#svg-check" /></svg> */}
            </div>
            <button onClick={() => loginUser()} className="button">
              <div className="arrow-wrapper">
                <span className="arrow"></span>
              </div>
              <p className="button-text">SIGN IN</p>
            </button>
          </div>
          <div className="finished">
            {/* <svg><use href="#svg-check" /></svg> */}
          </div>
        </div>
      </div>

      {/* <!-- //--- ## SVG SYMBOLS ############# --> */}
      <svg>
        <symbol id="svg-check" viewBox="0 0 130.2 130.2">
          <polyline points="100.2,40.2 51.5,88.8 29.8,67.5 " />
        </symbol>
      </svg>
    </>
  );
}

export default Login;
