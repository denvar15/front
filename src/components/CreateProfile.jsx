import React, { useEffect, useState } from "react";
import { Button, Card, List } from "antd";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Link, Route } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { ImageUpload } from "./index";
import ImageUploading from "react-images-uploading";
import "../style.css";
import DragNDropImage from "../img/dndr.png";

export default class CreateProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "", maxNumbers: 69 };

    this.handleChangeMail = this.handleChangeMail.bind(this);
    this.handleChangePortfolio = this.handleChangePortfolio.bind(this);
    this.handleChangeTwitter = this.handleChangeTwitter.bind(this);
    this.handleChangeMessage = this.handleChangeMessage.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeMail = event => {
    console.log(event.target.value);
    this.setState({ mail: event.target.value });
  };

  handleChangePortfolio = event => {
    console.log(event.target.value);
    this.setState({ portfolio: event.target.value });
  };

  handleChangeTwitter = event => {
    console.log(event.target.value);
    this.setState({ twitter: event.target.value });
  };

  handleChangeMessage = event => {
    console.log(event.target.value);
    this.setState({ message: event.target.value });
  };

  handleChangeName = event => {
    console.log(event.target.value);
    this.setState({ name: event.target.value });
  };

  handleSubmit = event => {
    var bodyFormData = new FormData();
    bodyFormData.append("address", this.props.address);
    bodyFormData.append("name", this.state.name);
    bodyFormData.append("email", this.state.mail);
    bodyFormData.append("custom_url", this.state.portfolio);
    bodyFormData.append("user_twitter", this.state.twitter);
    bodyFormData.append("user_blog", 0);
    bodyFormData.append("user_discord", 0);
    bodyFormData.append("user_telegram", 0);
    bodyFormData.append("user_reddit", 0);
    bodyFormData.append("user_fb", 0);
    bodyFormData.append("user_linkedin", 0);
    bodyFormData.append("user_description", this.state.message);
    bodyFormData.append("user_avatar", this.state.images[0].data_url);
    console.log("SJFSJSFJD", this.state.images[0]);
    axios({
      method: "post",
      url: "http://collectix.store:3334/api/user-add",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        //handle success
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });

    bodyFormData.append("file", this.state.images[0].file);
    axios({
      method: "post",
      url: "http://localhost:4100/v1/users/users",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        //handle success
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
    console.log(bodyFormData);
    event.preventDefault();
  };

  onChange = (imageList, addUpdateIndex) => {
    // data for submit
    let drager = document.getElementById("1");
    drager.style.display = "none";
    this.setState({ images: imageList });
  };

  render() {
    return (
      <Grid
        container
        spacing={2}
        style={{ width: "80vw", margin: "10px", marginTop: 32, paddingBottom: 32, textAlign: "left" }}
      >
        <Grid item xs={6}>
          <Typography variant="h4">Create Profile</Typography>
          <Typography variant="body1" style={{ marginTop: "10px" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt turpis aliquet felis rhoncus, sed
            mattis ex porttitor. Donec gravida bibendum sapien, sit amet vulputate justo mollis a. Phasellus posuere
            rutrum est vitae maximus. Donec lobortis nisl et viverra imperdiet.{" "}
          </Typography>
          <form onSubmit={this.handleSubmit} style={{ marginTop: "10px" }}>
            <label>
              <TextField
                style={{ display: "block", marginTop: "15px" }}
                label="Name"
                type="text"
                variant="standard"
                fullWidth
                value={this.state.name}
                onChange={this.handleChangeName}
              />
            </label>
            <label>
              <TextField
                style={{ display: "block", marginTop: "15px" }}
                label="Mail"
                type="text"
                variant="standard"
                fullWidth
                value={this.state.mail}
                onChange={this.handleChangeMail}
              />
            </label>
            <label>
              <TextField
                style={{ display: "block", marginTop: "15px" }}
                label="Portfolio"
                type="text"
                variant="standard"
                fullWidth
                value={this.state.portfolio}
                onChange={this.handleChangePortfolio}
              />
            </label>
            <label>
              <TextField
                style={{ display: "block", marginTop: "15px" }}
                label="Twitter"
                type="text"
                variant="standard"
                fullWidth
                value={this.state.twitter}
                onChange={this.handleChangeTwitter}
              />
            </label>
            <label>
              <TextField
                style={{ display: "block", marginTop: "15px" }}
                label="Message"
                type="text"
                variant="standard"
                fullWidth
                value={this.state.message}
                onChange={this.handleChangeMessage}
              />
            </label>
            <input
              className="main-button collection__item-buy"
              style={{ display: "block", marginTop: "15px" }}
              type="submit"
              value="Отправить"
            />
          </form>
        </Grid>
        <Grid item xs={6} style={{ marginTop: 100 }}>
          <div className="App">
            <ImageUploading
              value={this.state.images}
              onChange={this.onChange}
              maxNumber={this.state.maxNumber}
              dataURLKey="data_url"
            >
              {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
              }) => (
                // write your building UI
                <div className="upload__image-wrapper">
                  <img id="1" src={DragNDropImage} onClick={onImageUpload} {...dragProps} />
                  &nbsp;
                  {imageList.map((image, index) => (
                    <div key={index} className="image-item">
                      <img src={image.data_url} alt="" width="200" />
                      <div className="image-item__btn-wrapper">
                        <button className="main-button collection__item-buy" onClick={() => onImageUpdate(index)}>
                          Update
                        </button>
                        <button
                          className="main-button collection__item-buy"
                          onClick={() => {
                            onImageRemove(index);
                            let drager = document.getElementById("1");
                            drager.style.display = "inline";
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ImageUploading>
          </div>
        </Grid>
      </Grid>
    );
  }
}
