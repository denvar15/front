import React, { useEffect, useState } from "react";
import { Button, Card, List } from "antd";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Link, Route } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";

export default class CreateCollection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      collections: [
        {
          value: "USD",
          label: "$123123",
        },
        {
          value: "EUR",
          label: "€123123123",
        },
        {
          value: "BTC",
          label: "฿123123123",
        },
        {
          value: "JPY",
          label: "¥123123123",
        },
      ],
    };

    this.handleChangeCollection = this.handleChangeCollection.bind(this);
    this.handleChangeCategories = this.handleChangeCategories.bind(this);
    this.handleChangeHashtag = this.handleChangeHashtag.bind(this);
    this.handleChangeDeadline = this.handleChangeDeadline.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleChangeReward = this.handleChangeReward.bind(this);
  }

  componentDidMount() {
    const collections = axios
      .get("http://collectix.store:3334/api/categories")
      .then(function (response) {
        console.log(response);
        this.setState({ collections: response });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  handleChangeCollection = event => {
    console.log(event.target.value);
    this.setState({ collection: event.target.value });
  };

  handleChangeCategories = event => {
    console.log(event.target.value);
    this.setState({ categories: event.target.value });
  };

  handleChangeHashtag = event => {
    console.log(event.target.value);
    this.setState({ hashtag: event.target.value });
  };

  handleChangeDeadline = event => {
    console.log(event.target.value);
    this.setState({ deadline: event.target.value });
  };

  handleChangeName = event => {
    console.log(event.target.value);
    this.setState({ name: event.target.value });
  };

  handleChangeReward = event => {
    console.log(event.target.value);
    this.setState({ reward: event.target.value });
  };

  handleChangeDescription = event => {
    console.log(event.target.value);
    this.setState({ description: event.target.value });
  };

  handleSubmit = event => {
    var bodyFormData = new FormData();
    console.log(
      this.state.name,
      this.state.collection,
      this.state.categories,
      this.state.hashtag,
      this.state.deadline,
      this.state.reward,
      this.state.description,
    );
    bodyFormData.append("name", this.state.name);
    bodyFormData.append("collection", this.state.collection);
    bodyFormData.append("categories", this.state.categories);
    bodyFormData.append("hashtag", this.state.hashtag);
    bodyFormData.append("deadline", this.state.deadline);
    bodyFormData.append("reward", this.state.reward);
    bodyFormData.append("description", this.state.description);
    axios({
      method: "post",
      url: "myurl",
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
    console.log(imageList, addUpdateIndex);
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
          <Typography variant="h4">Create Collection</Typography>
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
                label="Collection"
                select
                value={this.state.collection}
                onChange={this.handleChangeCollection}
              >
                {this.state.collections.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </label>
            <label>
              <TextField
                style={{ display: "block", marginTop: "15px" }}
                label="Categories"
                type="text"
                variant="standard"
                fullWidth
                value={this.state.categories}
                onChange={this.handleChangeCategories}
              />
            </label>
            <label>
              <TextField
                style={{ display: "block", marginTop: "15px" }}
                label="Hashtag"
                type="text"
                variant="standard"
                fullWidth
                value={this.state.hashtag}
                onChange={this.handleChangeHashtag}
              />
            </label>
            <label>
              <TextField
                style={{ display: "block", marginTop: "15px" }}
                label="Deadline"
                type="text"
                variant="standard"
                fullWidth
                value={this.state.deadline}
                onChange={this.handleChangeDeadline}
              />
            </label>
            <label>
              <TextField
                style={{ display: "block", marginTop: "15px" }}
                label="Reward"
                type="text"
                variant="standard"
                fullWidth
                value={this.state.reaward}
                onChange={this.handleChangeReward}
              />
            </label>
            <label>
              <TextField
                style={{ display: "block", marginTop: "15px" }}
                label="Description"
                type="text"
                variant="standard"
                fullWidth
                value={this.state.description}
                onChange={this.handleChangeDescription}
              />
            </label>
            <input className="main-button collection__item-buy"
                   style={{ display: "block", marginTop: "15px" }} type="submit" value="Отправить" />
          </form>
        </Grid>
        <Grid item xs={6}>
        </Grid>
      </Grid>
    );
  }
}
