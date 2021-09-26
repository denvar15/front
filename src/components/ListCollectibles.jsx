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

export default class ListCollectibles extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "", maxNumbers: 69 };
  }

  componentDidMount() {
    let categories = axios
      .get("http://localhost:4100/v1/users/getUsers")
      .then( (response) => {
        this.setState({ users: response.data });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  render() {
    return (
      <div className="profile-offers">
        <List
          grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 3 }}
          dataSource={this.state.users}
          className="collectors__list clear-list"
          style={{ margin: "auto", textAlign: "center", alignItems: "center" }}
          renderItem={item => {
            const id = item.id;
            return (
              <List.Item key={id + "_" + item.uri + "_" + item.owner}>
                <li className="collectors__item">
                  <div className="collectors__item--wrapper">
                    <div className="collectors__item-header">
                      <img width="150px" height="150px" src={item.user_avatar} alt="Avatar" />
                      <div className="collectors__name-block">
                        <a className="collectors__name">{item.name}</a>
                        <button className="collectors__button main-button">Tasks: {item.tasks.length}</button>
                      </div>
                    </div>
                    <ul className="collectors__params clear-list">
                      <li className="collectors__params-item">
                        <span className="collectors__name-param">Rating:</span>
                        <span className="collectors__value-param">12</span>
                      </li>
                      <li className="collectors__params-item">
                        <span className="collectors__name-param">Сollections:</span>
                        <span className="collectors__value-param">7</span>
                      </li>
                      <li className="collectors__params-item">
                        <span className="collectors__name-param">NFTs on sale:</span>
                        <span className="collectors__value-param">{item.NFT.length}</span>
                      </li>
                    </ul>
                    <p className="collectors__text">
                      {item.message}
                    </p>
                    <div className="collectors__social social">
                      <ul className="social__list clear-list">
                        <li className="social__item">
                          <a className="social__link" href="">
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
                </li>
              </List.Item>
            );
          }}
        />
      </div>
    );
  }
}
