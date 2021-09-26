import React, { useEffect, useState } from "react";
import { Button, Card, List } from "antd";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Link, Route } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import ImageUploading from "react-images-uploading";
import DragNDropImage from "../img/dndr.png";
import { createLazyMint, generateTokenId, putLazyMint } from "../rarible/createLazyMint";

export default class CreateOffer extends React.Component {
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
      maxNumbers: 69,
    };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeRoyalty = this.handleChangeRoyalty.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
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

  handleChangeRoyalty = event => {
    console.log(event.target.value);
    this.setState({ royalty: event.target.value });
  };

  handleChangeName = event => {
    console.log(event.target.value);
    this.setState({ name: event.target.value });
  };

  handleChangeDescription = event => {
    console.log(event.target.value);
    this.setState({ description: event.target.value });
  };

  handleChangeTaskName = event => {
    console.log(event.target.value);
    this.setState({ taskName: event.target.value });
  };

  handleSubmit = event => {
    var bodyFormData = new FormData();
    bodyFormData.append("creator", this.props.address);
    bodyFormData.append("name", this.state.name);
    bodyFormData.append("royalty", this.state.royalty);
    bodyFormData.append("description", this.state.description);
    bodyFormData.append("taskName", this.state.taskName);
    bodyFormData.append("file", this.state.images[0]);
    /*
    axios({
      method: "post",
      url: "http://collectix.store:3334/api/lazy-mint",
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
     */

    var bodyFormData1 = new FormData();
    bodyFormData1.append("file", this.state.images[0].file);

    axios({
      method: "post",
      url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
      data: bodyFormData1,
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJmYmJlZjM5MS1h" +
          "ODJhLTRlMzUtYWI2My1lZWUwY2I0MGFiYTAiLCJlbWFpbCI6Imdsb3JpYTIwMDk2NUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1Z" +
          "SwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxf" +
          "SwibWZhX2VuYWJsZWQiOmZhbHNlfSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiYjEwZmY4M2I0Y" +
          "WFhMmYwMWFkOWIiLCJzY29wZWRLZXlTZWNyZXQiOiI2OTk2ZWY4ZGMwNTM3ODFiM2NmMjZjNzZiZGNiNmM5MGY1NTU5YjEzOTUzZTMxZDIzOW" +
          "VmNTRkM2ZkMzI2NGQzIiwiaWF0IjoxNjMyNjExMjMxfQ.MFeF4KqNAZcQVyeENpQJePU-5dV4d7C1Uz5wG0OONWg",
      },
    })
      .then(response => {
        //handle success
        let metadata = {
          name: this.state.name,
          description: this.state.description,
          image: "ipfs://ipfs/" + response.data.IpfsHash,
          external_url: "",
          animation_url: "",
        };
        const result = this.props.ipfs.add(JSON.stringify(metadata)).then(res => {
          console.log("BBFBFBBF", res.path);
          const newTokenId = generateTokenId(
            this.props.writeContracts.ERC721Rarible.address,
            this.props.accountAddress,
          ).then(newTokenId => {
            const form = createLazyMint(
              newTokenId,
              this.props.provider,
              this.props.writeContracts.ERC721Rarible.address,
              this.props.accountAddress,
              res.path,
              "ERC721",
            ).then(form => {
              putLazyMint(form).then(response => {
                axios({
                  method: "post",
                  url: "http://localhost:4100/v1/users/addNFT",
                  data: {form: form, taskName: this.state.taskName},
                }).then(res => {
                  console.log(res);
                });
              });
            });
          });
        }); // addToIPFS(JSON.stringify(yourJSON))
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });

    event.preventDefault();
  };

  onChange = (imageList, addUpdateIndex) => {
    // data for submit
    let drager = document.getElementById("1");
    drager.style.display = "none";
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
          <Typography variant="h4">Create Offer</Typography>
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
                label="Description"
                type="text"
                variant="standard"
                fullWidth
                value={this.state.description}
                onChange={this.handleChangeDescription}
              />
            </label>
            <label>
              <TextField
                style={{ display: "block", marginTop: "15px" }}
                label="Royalty"
                type="text"
                variant="standard"
                fullWidth
                value={this.state.royalty}
                onChange={this.handleChangeRoyalty}
              />
            </label>
            <label>
              <TextField
                style={{ display: "block", marginTop: "15px" }}
                label="Task Name"
                type="text"
                variant="standard"
                fullWidth
                value={this.state.taskName}
                onChange={this.handleChangeTaskName}
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
