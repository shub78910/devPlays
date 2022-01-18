import React, { useContext, useState } from "react";
import "../styles/addNewVideo.css";
import videoContext from "../Context/videoContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

//think of how you can add validatons here
//user should not be able to add any random id which is not from yt.

const AddNewVideo = () => {
  const { userId, jwttoken, isShowErrorMsg, change, addNewVideo, userName } =
    useContext(videoContext);
  const navigate = useNavigate();

  //just to know who posted which video, the initial value of the form will be the username property.
  const [form, setForm] = useState({ userName: userName });

  useEffect(() => {
    alert("Please add valid data by copying and pasting from youtube");
  }, []);

  useEffect(() => {
    if (!jwttoken) navigate("/login");
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "category") {
      let categoryArr = e.target.value.split(",");
      categoryArr = categoryArr.map(function (el) {
        return el.trim();
      });
      setForm({ ...form, [e.target.name]: categoryArr });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //validating if the video is legit or no.
    const url = `http://img.youtube.com/vi/${form._id}/mqdefault.jpg`;
    const { status } = await fetch(url);
    if (status === 404) {
      toast.error("Invalid video ID");
      return;
    }

    let response = await addNewVideo(form);
    if (response.status === 200) {
      setForm({ userName: userName });
      toast.success("Video added succesfully");
    } else {
      toast.info(response.data.message);
    }
  };

  return (
    <>
      <div className="mainPage">
        <h1 style={{ textAlign: "center" }}>Add new video</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Video title</Form.Label>
            <Form.Control
              className="addNewVidInputs"
              onChange={handleChange}
              name="name"
              type="name"
              placeholder="Enter title"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Creator name</Form.Label>
            <Form.Control
              className="addNewVidInputs"
              onChange={handleChange}
              name="creator"
              type="creator"
              placeholder="Creator/Channel name"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Video ID (from YouTube)</Form.Label>
            <Form.Control
              onChange={handleChange}
              className="addNewVidInputs"
              name="_id"
              type="_id"
              placeholder="uMCSdgkdOJc"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Categories (Comma seperated)</Form.Label>
            <Form.Control
              onChange={handleChange}
              className="addNewVidInputs"
              name="category"
              type="text"
              placeholder="music, comedy, science"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Upload date</Form.Label>
            <Form.Control
              onChange={handleChange}
              className="addNewVidInputs"
              name="date"
              type="text"
              placeholder="Jan 18, 2022"
            />
          </Form.Group>
          <div className="d-grid gap-2">
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default AddNewVideo;
//add all the validations first
//check if there is a better way than using useeffect in each file.
