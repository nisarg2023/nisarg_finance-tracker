import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CheckUserLoginContext, UserContext } from "../../App";

export default function Registration() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [users, setUsers] = useState([]);
  const [userErr, setUserErr] = useState({
    userName: "*",
    email: "*",
    password: "*",
  });

  const [contextUsers,setContextUsers] = useContext(UserContext)
  const [isUserLogin] = useContext(CheckUserLoginContext)

  useEffect(() => {
    const isUserLoggedIn = isUserLogin //JSON.parse(localStorage.getItem("isUserLoggedIn"));
    isUserLoggedIn ? navigate("/") : <></>;

    const local_users = contextUsers//JSON.parse(localStorage.getItem("users"));
    local_users ? setUsers(local_users) : setUsers([]);

    const id = local_users
      ? contextUsers.length +1 //JSON.parse(localStorage.getItem("users")).length + 1
      : 1;

    setUser({ ...user, id: id });
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

  const isEmailAlreadyExists = (element) => {
   
    const email = users.find(({ email }) => element.value.trim() === email);
 console.log(email);
    if (email) {
      setUserErr((prev) => {
        return { ...prev, [element.name]: "this email already exists" };
      });
      return true;
    } else {
      setUserErr((prev) => {
        return { ...prev, [element.name]: "" };
      });
      return false;
    }
  };

  const handelOnclick = ({ target }) => {
    const { userName, email, password } = target;

    let isFormValid = true;

    isFormValid = !isEmapty(userName) && isFormValid;
    isFormValid = !isEmapty(email) && isFormValid;
    isFormValid = !isEmapty(password) && isFormValid;
    isFormValid = !isEmailAlreadyExists(email) && isFormValid;

    if (isFormValid) {
      const cloneUsers = users;
      console.log(user)
      cloneUsers.push(user);
      setContextUsers(cloneUsers)
      //localStorage.setItem("users", JSON.stringify(cloneUsers));
      navigate("/login");
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
          <h1>Registration</h1>
          <div className="input_div">
            <div className="left_div">
              <label htmlFor="">user Name:</label>
            </div>
            <div className="right_div">
              <input
                type="text"
                name="userName"
                onChange={(e) => {
                  isEmapty(e.target);
                  setUserValue(e.target);
                }}
              />
            </div>
            <span>{userErr.userName}</span>
          </div>

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
                  isEmailAlreadyExists(e.target);
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

          <input type="submit" value="Registration" />
        <p>
          {" "}
          Don't have Acount ? <Link to="/login">login</Link>
        </p>
        </div>
      </form>
    </div>
  );
}
