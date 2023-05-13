import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { CheckUserLoginContext, UserContext } from "../../App";
import { setUserIsLogin } from "../../duck/IsUserLoginSlices";

export default function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [isauthenticat, setIsauthenticat] = useState(true);
  const [users, setUsers] = useState([]);
  const [userErr, setUserErr] = useState({
    email: "*",
    password: "*",
  });

  //const [contextUsers, setContextUsers] = useContext(UserContext);
 // const [isUserLogin, setIsUserLogin] = useContext(CheckUserLoginContext);
  const Users =  useSelector(state =>state.Users);
  const isUserLogin = useSelector((state) => state.checkIsUserLogin.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const isUserLoggedIn = isUserLogin//JSON.parse(localStorage.getItem("isUserLoggedIn"));
    isUserLoggedIn ? navigate("/") : <></>;
    const local_users = Users//contextUsers//JSON.parse(localStorage.getItem("users"));
    users ? setUsers(local_users) : setUsers([]);
  }, []);

  const isEmapty = (element) => {
    if (element.value.trim() === "") {
      setUserErr((prev) => {
        return { ...prev, [element.name]: "this field is required" };
      });
      return true;
    } else {
      setUserErr((prev) => {
        return { ...prev, [element.name]: "" };
      });
      return false;
    }
  };

  const setUserValue = (element) => {
    setUser((prev) => {
      return { ...prev, [element.name]: element.value };
    });
  };

  const handelOnclick = ({ target }) => {
    const { email, password } = target;

    let isValid = true;
    isValid = !isEmapty(email) && isValid;
    isValid = !isEmapty(password) && isValid;

    if (isValid) {
      console.log(users);
      const userData = users && users.find((user) => user.email === email.value);

      if (userData && userData.password === password.value) {
        //localStorage.setItem("isUserLoggedIn", true);
        //localStorage.setItem("currentLoginuser", JSON.stringify(userData));
      //setIsUserLogin(true)
      dispatch(setUserIsLogin(true));
    
        navigate("/");
      } else {
        setIsauthenticat(false);
      }
    }
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handelOnclick(e);
        }}
      >
        <div className="formContainer">
          <h1>Login</h1>
          {!isauthenticat && <span>Email and password is not match</span>}

          <div className="input_div">
            <div className="left_div">
              <label htmlFor="">Email:</label>
            </div>
            <div className="right_div">
              <input
                type="text"
                name="email"
                onChange={(e) => {
                  isEmapty(e.target);
                  setUserValue(e.target);
                }}
              />
            </div>
            <span>{userErr.email}</span>
          </div>

          <div className="input_div">
            <div className="left_div">
              <label htmlFor="">Password:</label>
            </div>
            <div className="right_div">
              <input
                type="password"
                name="password"
                onChange={(e) => {
                  isEmapty(e.target);
                  setUserValue(e.target);
                }}
              />
            </div>
            <span>{userErr.password}</span>
          </div>

          <input type="submit" value="Login" />
          <p>
            {" "}
            Don't have Acount ? <Link to="/registration">Registration</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
