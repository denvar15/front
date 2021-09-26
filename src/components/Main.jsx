import React, { useEffect, useState } from "react";
import { Button, Card, List } from "antd";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import axios from "axios";
import "../style.css";
import collector1 from "../img/collector1.png";
import Twitter from "../img/Twitter.svg";
import Telegram from "../img/Telegram.svg";
import LinkedIN from "../img/LinkedIN.svg";
import Facebook from "../img/Facebook.svg";
import Discord from "../img/Discord.svg";
import Reddit from "../img/Reddit.svg";
import Reddit1 from "../img/Reddit (1).svg";
import collectionItem from "../img/collection-item.png";
import profile from "../img/profile.png";

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
        },
      ],
      tasks: [
        {
          id: "1",
          title: "I will buy NFT",
          categories: "Politics, Abstract, Humor",
          body:
            "Lorem ipsum dolor" +
            " sit amet, consectetur adipiscing elit. Vestibulum iaculis quam metus, ac venenatis erat mattis et." +
            " Curabitur fringilla dignissim elementum.",
          author: "Ally Smith",
          collection: "main",
          published: "12.03.2021",
          deadline: "01.02.2022",
          proposed: "30",
          hashtags: "#sdf, $sgg #yyy",
          reward: "5 Eth",
        },
        {
          id: "2",
          title: "I will buy NFT",
          categories: "Politics, Abstract, Humor",
          body:
            "Lorem ipsum dolor" +
            " sit amet, consectetur adipiscing elit. Vestibulum iaculis quam metus, ac venenatis erat mattis et." +
            " Curabitur fringilla dignissim elementum.",
          author: "Ally Smith",
          collection: "main",
          published: "12.03.2021",
          deadline: "01.02.2022",
          proposed: "30",
          hashtags: "#sdf, $sgg #yyy",
          reward: "5 Eth",
        },
        {
          id: "3",
          title: "I will buy NFT",
          categories: "Politics, Abstract, Humor",
          body:
            "Lorem ipsum dolor" +
            " sit amet, consectetur adipiscing elit. Vestibulum iaculis quam metus, ac venenatis erat mattis et." +
            " Curabitur fringilla dignissim elementum.",
          author: "Ally Smith",
          collection: "main",
          published: "12.03.2021",
          deadline: "01.02.2022",
          proposed: "30",
          hashtags: "#sdf, $sgg #yyy",
          reward: "5 Eth",
        },
      ],
    };
  }

  render() {
    const categories = axios
      .get("http://collectix.store:3334/api/categories")
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });

    return (
      <div style={{ textAlign: "center" }}>
        <h2 style={{ marginLeft: 20, marginTop: 20 }}>Last Sales</h2>
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={this.state.NFTsOnSale}
          style={{ width: "75%", textAlign: "center", alignItems: "center", margin: "auto" }}
          renderItem={item => {
            const id = item.id;
            return (
              <List.Item key={id + "_" + item.uri + "_" + item.owner} style={{ width: "80%" }}>
                <li>
                  <div>
                    <a className="collection__item-image" href="" style={{ backgroundImage: `url(${collectionItem})` }}>
                      {" "}
                    </a>
                    <a className="collection__name" href="">
                      Name of NFT
                    </a>
                    <div className="collection__author">
                      <span className="collection__author-name">Ally Smith</span>
                      <span className="collection__author-raiting">(Rating: 12)</span>
                    </div>
                    <div className="collection__item-description">
                      Description of NFT that very intersting for many collectors. Author is very popular, as we know.
                    </div>
                    <div className="collection__creator">Creator 30% royalties</div>
                    <button className="main-button collection__item-buy">Buy</button>
                  </div>
                </li>
              </List.Item>
            );
          }}
        />
        <h2 style={{ marginLeft: 20, marginTop: 20 }}>Best Collectors</h2>
        <List
          dataSource={this.state.NFTsOnSale}
          style={{width:"75%", margin:"auto", textAlign: "center", alignItems: "center"}}
          renderItem={item => {
            const id = item.id;
            return (
              <List.Item key={id + "_" + item.uri + "_" + item.owner} >
                <div className="profile">
                  <div className="profile__main">
                    <div className="profile__image">
                      <img src={profile} alt="" />
                    </div>
                    <div className="profile__info">
                      <div className="profile_info-title-block">
                        <div className="profile__name">{this.state.profile.name}</div>
                        <button className="profile__edit-button">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
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
                            <span className="collectors__value-param">{this.state.profile.NFTsOnSale}</span>
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
                </div>
              </List.Item>
            );
          }}
        />
        <h2 style={{ marginLeft: 20, marginTop: 20 }}>Best Tasks</h2>
        <List
          dataSource={this.state.tasks}
          style={{ justifyContent: "center", width: "80vw" }}
          renderItem={item => {
            const id = item.id;
            return (
              <List.Item
                key={id + "_" + item.uri + "_" + item.owner}
                style={{ width: "80vw", textAlign: "center", margin: "auto", justifyContent: "center" }}
              >
                <li style={{ textAlign: "center" }}>
                  <div className="tasks__item--wrapper">
                    <div className="collectors__item-header">
                      <div className="collectors__name-block">
                        <a className="collectors__name">{item.title}</a>
                      </div>
                    </div>
                    <ul className="collectors__params clear-list">
                      <li className="collectors__params-item">
                        <span className="collectors__name-param">Categories </span>
                        <span className="collectors__value-param">{item.categories}</span>
                      </li>
                      <li className="collectors__params-item">
                        <span className="collectors__name-param">Hashtags </span>
                        <span className="collectors__value-param">{item.hashtags}</span>
                      </li>
                    </ul>
                    <p className="collectors__text">
                      {item.body}
                    </p>
                    <h3 className="collectors__text">
                      {item.author}
                    </h3>
                    <ul className="collectors__params clear-list">
                      <li className="collectors__params-item">
                        <span className="collectors__name-param">Collection </span>
                        <span className="collectors__value-param">{item.collection}</span>
                      </li>
                      <li className="collectors__params-item">
                        <span className="collectors__name-param">Published </span>
                        <span className="collectors__value-param">{item.published}</span>
                      </li>
                      <li className="collectors__params-item">
                        <span className="collectors__name-param">Deadline </span>
                        <span className="collectors__value-param">{item.deadline}</span>
                      </li>
                    </ul>
                    <ul className="collectors__params clear-list">
                      <li className="collectors__params-item">
                        <span className="collectors__name-param">Proposed </span>
                        <span className="collectors__value-param">{item.proposed}</span>
                      </li>
                      <li className="collectors__params-item">
                        <span className="collectors__name-param">Reward </span>
                        <span className="collectors__value-param">{item.reward}</span>
                      </li>
                    </ul>
                    <button className="collectors__button main-button">Tasks: 5</button>
                  </div>
                </li>
              </List.Item>
            );
          }}
        />
      </div>
    );
  }
}
