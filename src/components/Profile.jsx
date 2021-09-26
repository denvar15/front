import React, { useEffect, useState } from "react";
import { Button, Card, List } from "antd";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Link, Route } from "react-router-dom";
import axios from "axios";
import profile from "../img/profile.png";
import Twitter from "../img/Twitter.svg";
import Telegram from "../img/Telegram.svg";
import LinkedIN from "../img/LinkedIN.svg";
import Facebook from "../img/Facebook.svg";
import Discord from "../img/Discord.svg";
import Reddit from "../img/Reddit.svg";
import Reddit1 from "../img/Reddit (1).svg";
import collectionItem from "../img/collection-item.png";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      reolad: 1,
      maxNumbers: 69,
      profile: {
        id: "1",
        name: "Ally Smith",
        rating: 12,
        collections: 7,
        NFTsOnSale: 3,
        message:
          "Public message from collector. His words very important. He wants tell for us something, that we need " +
          "to know. May be advertisment, may be other information, that must be promoted.",
        twitter: "https://twitter.com/denvar151/status/1437518094478594054",
      },
      NFTsOnSale: [
        {
          id: "1",
          title: "I will buy NFT",
          body:
            "Lorem ipsum dolor" +
            " sit amet, consectetur adipiscing elit. Vestibulum iaculis quam metus, ac venenatis erat mattis et." +
            " Curabitur fringilla dignissim elementum.",
          author: "Ally Smith",
          royalties: "30%",
          price: "5 Eth",
          image: "1234324234jsfjsfdhsfdhsfhsfh",
        },
        {
          id: "2",
          title: "I will buy NFT",
          body:
            "Lorem ipsum dolor" +
            " sit amet, consectetur adipiscing elit. Vestibulum iaculis quam metus, ac venenatis erat mattis et." +
            " Curabitur fringilla dignissim elementum.",
          author: "Ally Smith",
          royalties: "30%",
          price: "5 Eth",
          image: "1234324234jsfjsfdhsfdhsfhsfh",
        },
        {
          id: "3",
          title: "I will buy NFT",
          body:
            "Lorem ipsum dolor" +
            " sit amet, consectetur adipiscing elit. Vestibulum iaculis quam metus, ac venenatis erat mattis et." +
            " Curabitur fringilla dignissim elementum.",
          author: "Ally Smith",
          royalties: "30%",
          price: "5 Eth",
          image: "1234324234jsfjsfdhsfdhsfhsfh",
        },
        {
          id: "4",
          title: "I will buy NFT",
          body:
            "Lorem ipsum dolor" +
            " sit amet, consectetur adipiscing elit. Vestibulum iaculis quam metus, ac venenatis erat mattis et." +
            " Curabitur fringilla dignissim elementum.",
          author: "Ally Smith",
          royalties: "30%",
          price: "5 Eth",
          image: "1234324234jsfjsfdhsfdhsfhsfh",
        },
      ],
    };

    this.handleChangeMail = this.handleChangeMail.bind(this);
    this.handleChangePortfolio = this.handleChangePortfolio.bind(this);
    this.handleChangeTwitter = this.handleChangeTwitter.bind(this);
    this.handleChangeMessage = this.handleChangeMessage.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  /*
    const tasks = axios
      .get("http://collectix.store:3334/api/categories")
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    const collections = axios
      .get("http://collectix.store:3334/api/categories")
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    const onSale = axios
      .get("http://collectix.store:3334/api/categories")
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
     */

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
    bodyFormData.append("name", this.state.name);
    bodyFormData.append("mail", this.state.mail);
    bodyFormData.append("portfolio", this.state.portfolio);
    bodyFormData.append("twitter", this.state.twitter);
    bodyFormData.append("message", this.state.message);
    bodyFormData.append("image", this.state.images[0]);
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
    if (this.props.address !== "" && this.state.reolad == 1) {
      /*
    const profile = axios
      .get("http://collectix.store:3334/api/profile/" + this.props.address)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
     */
      const profile2 = axios
        .get("http://localhost:4100/v1/users/" + this.props.address)
        .then(response => {
          //this.setState({ profile: response.data });
          let NFTsOnSale = [];
          response.data.NFT.forEach(NFT => {
            const jsonManifestBuffer = this.props.getFromIPFS(NFT.uri.slice(6, 100)).then(jsonManifestBuffer => {
              const jsonManifest = JSON.parse(jsonManifestBuffer.toString());
              NFTsOnSale.push({ id: NFT.tokenId, uri: NFT.uri, owner: NFT.creators[0].account, ...jsonManifest });
            });
          });
          this.setState({ profile: response.data });
          this.setState({ NFTsOnSale: NFTsOnSale });
          this.setState({ reolad: 0 });
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }
    return (
      <Grid
        container
        spacing={2}
        style={{ width: "80vw", margin: "10px", marginTop: 32, paddingBottom: 32, textAlign: "left" }}
      >
        <div className="right-block">
          <h1 className="main-title">Collector Display NAme</h1>
          <div className="profile">
            <div className="profile__main">
              <div className="profile__image">
                <img width="150px" height="150px" src={this.state.profile.user_avatar} alt="" />
              </div>
              <div className="profile__info">
                <div className="profile_info-title-block">
                  <div className="profile__name">{this.state.profile.name}</div>
                  <button className="profile__edit-button">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M9.06641 16.825L16.8247 9.06665C17.2929 8.5979 17.5559 7.96248 17.5559 7.29998C17.5559 6.63748 17.2929 6.00206 16.8247 5.53331L14.4664 3.17498C13.9977 2.70681 13.3622 2.44385 12.6997 2.44385C12.0372 2.44385 11.4018 2.70681 10.9331 3.17498L3.17474 10.9333C2.70576 11.4017 2.44199 12.0372 2.44141 12.7V17.5583H7.29974C7.96256 17.5577 8.59802 17.294 9.06641 16.825ZM4.06641 12.6583C4.06733 12.4397 4.15412 12.2302 4.30807 12.075L12.0747 4.30831C12.2309 4.15311 12.4421 4.06599 12.6622 4.06599C12.8824 4.06599 13.0936 4.15311 13.2497 4.30831L15.6081 6.66665C15.7633 6.82278 15.8504 7.03399 15.8504 7.25415C15.8504 7.4743 15.7633 7.68551 15.6081 7.84165L7.88307 15.65C7.72786 15.8039 7.51836 15.8907 7.29974 15.8916H4.10807L4.06641 12.6583Z"
                        fill="#6C7995"
                      />
                    </svg>
                    Edit Profile
                  </button>
                </div>
                <div className="">
                  <ul className="collectors__params clear-list">
                    <li className="collectors__params-item">
                      <span className="collectors__name-param">Rating:</span>
                      <span className="collectors__value-param">{this.state.profile.rating}</span>
                    </li>
                    <li className="collectors__params-item">
                      <span className="collectors__name-param">Сollections:</span>
                      <span className="collectors__value-param">{this.state.profile.collections}</span>
                    </li>
                    <li className="collectors__params-item">
                      <span className="collectors__name-param">NFTs on sale:</span>
                      <span className="collectors__value-param">{this.state.NFTsOnSale.length}</span>
                    </li>
                  </ul>
                </div>
                <p className="profile__text">{this.state.profile.message}</p>
                <div className="profile__social social">
                  <ul className="social__list clear-list">
                    <li className="social__item">
                      <a className="social__link" href={this.state.profile.twitter}>
                        <img src={Twitter} />
                      </a>
                    </li>
                    <li className="social__item">
                      <a className="social__link" href="">
                        <img src={Telegram} />
                      </a>
                    </li>
                    <li className="social__item">
                      <a className="social__link" href="">
                        <img src={LinkedIN} />
                      </a>
                    </li>
                    <li className="social__item">
                      <a className="social__link" href="">
                        <img src={Facebook} />
                      </a>
                    </li>
                    <li className="social__item">
                      <a className="social__link" href="">
                        <img src={Discord} />
                      </a>
                    </li>
                    <li className="social__item">
                      <a className="social__link" href="">
                        <img src={Reddit} />
                      </a>
                    </li>
                    <li className="social__item">
                      <a className="social__link" href="">
                        <img src={Reddit1} />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="simple-collections"> </div>
            <div className="profile-offers">
              <h2 className="main-title">
                On sale <span className="counter">{this.state.NFTsOnSale.length}</span>
              </h2>
              <List
                grid={{ gutter: 16, column: 3 }}
                dataSource={this.state.NFTsOnSale}
                className="collection__list clear-list"
                renderItem={item => {
                  const id = item.id;
                  let url = "https://gateway.pinata.cloud/" + item.image.slice(7, 100);
                  return (
                    <List.Item key={id + "_" + item.uri + "_" + item.owner}>
                      <li className="collection__item">
                        <div>
                          <img width="200px" height="200px" className="collection__item-image" src={url} />
                          <a className="collection__name" href="">
                            {item.name}
                          </a>
                          <div className="collection__author">
                            <span className="collection__author-name">{item.owner}</span>
                            <span className="collection__author-raiting">(Rating: 12)</span>
                          </div>
                          <div className="collection__item-description">{item.taskName}</div>
                          <div className="collection__creator">Creator {item.royalties} royalties</div>
                          <button className="main-button collection__item-buy">Buy</button>
                        </div>
                      </li>
                    </List.Item>
                  );
                }}
              />
            </div>
          </div>
        </div>
      </Grid>
    );
  }
}
