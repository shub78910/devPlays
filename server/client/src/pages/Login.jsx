import React, { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";

import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import videoContext from "../Context/videoContext";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

const SignUp = () => {
  const [form, setForm] = useState({});
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();
  const { signIn, signUp, jwttoken } = useContext(videoContext);

  useEffect(() => {
    if (jwttoken && jwttoken !== "undefined") navigate("/");
  }, []);

  const switchMode = () => {
    setForm({});
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignup) {
      if (Object.keys(form).length === 3) {
        const response = await signUp(form);
        if (
          response?.data?.message ===
          "Sorry a user with this email already exists"
        ) {
          toast.info("Sorry a user with this email already exists");
        } else if (response?.data?.message === "Succesfully registered") {
          console.log(response);
          toast.success("Succesfully registered");
          window.location.reload();
        }
      } else {
        toast.info("Please fill all the details");
      }
    } else {
      //sigin func
      if (
        Object.keys(form).length === 2 &&
        form.email !== "" &&
        form.pswd !== ""
      ) {
        const response = await signIn(form);
        if (
          response?.data?.message === "Email does not exist. Please register."
        ) {
          toast.error("Email does not exist. Please register.");
        } else if (response?.data?.message === "Passwords do not match") {
          toast.error("Incorrect Password");
        } else if (response?.data?.message === "Succesfully logged in") {
          navigate("/");
        } else {
          toast.error(response);
        }
      } else {
        toast.info("Please fill all the details");
      }
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="mainPage">
      <div className="loginFormWrapper">
        {isSignup ? (
          <>
            <Form onSubmit={handleSubmit}>
              <h2>SignUp</h2>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  className="loginInput"
                  name="fullName"
                  type="name"
                  placeholder="Enter full name"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  className="loginInput"
                  name="email"
                  type="email"
                  placeholder="Enter email"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  className="loginInput"
                  name="pswd"
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>
              <div className="d-grid gap-2">
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
          </>
        ) : (
          <>
            <Form onSubmit={handleSubmit}>
              <h2>SignIn</h2>

              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  className="loginInput"
                  name="email"
                  type="email"
                  placeholder="Enter email"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  className="loginInput"
                  name="pswd"
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>

              <div className="d-grid gap-2">
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
          </>
        )}

        <div style={{ textAlign: "right" }}>
          <Button className="mt-3 " onClick={switchMode}>
            {isSignup
              ? "Already have an account? Sign in"
              : "Don't have an account? Sign Up"}
          </Button>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default SignUp;
