import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import axios from "axios";
import "../style.css";
import React, { useEffect, useState } from "react";
import { Button, Card, List } from "antd";
import { Grid } from "@mui/material";
import collector1 from "../img/collector1.png";
import Twitter from "../img/Twitter.svg";
import Telegram from "../img/Telegram.svg";
import LinkedIN from "../img/LinkedIN.svg";
import Facebook from "../img/Facebook.svg";
import Discord from "../img/Discord.svg";
import Reddit from "../img/Reddit.svg";
import Reddit1 from "../img/Reddit (1).svg";

export default class TaskFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

  componentDidMount() {
    let i = 0;
    axios
      .get("http://localhost:4100/v1/tasks/")
      .then(response => {
        response.data.results.forEach(res => {
          const profile2 = axios.get("http://localhost:4100/v1/users/" + res.author).then(result => {
            console.log("AAAAAAAAAAAAAAA", result);
            response.data.results[i].author = result.data.name;
            i +=1 ;
          });
        });
        response.data.results = response.data.results.reverse();
        this.setState({ tasks: response.data.results });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  render() {
    return (
      <div className="profile-offers">
        <h2 className="main-title">Tasks</h2>
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
                <li style={{ textAlign: "center", width:"60%" }}>
                  <div className="tasks__item--wrapper">
                    <div className="collectors__item-header">
                      <div>
                        <Typography variant="h6" style={{ fontWeight: "bold" }} className="collectors__name">
                          {item.title}
                        </Typography>
                      </div>
                    </div>
                    <ul className="collectors__params clear-list">
                      <li className="collectors__params-item">
                        <span className="collectors__name-param">Categories </span>
                        <span className="collectors__value-param">{item.categories}</span>
                      </li>
                    </ul>
                    <Typography variant="body1" className="collectors__text">
                      {item.body}
                    </Typography>
                    <ul className="collectors__params clear-list" style={{ justifyContent: "space-between" }}>
                      <li className="collectors__params-item">
                        <span className="collectors__name-param">Hashtags </span>
                        <span className="collectors__value-param">{item.hashtags}</span>
                      </li>
                    </ul>
                    <ul className="collectors__params clear-list" style={{ justifyContent: "space-between" }}>
                      <li className="collectors__params-item">
                        <span className="collectors__value-param">{item.author}</span>
                      </li>
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
                      <li className="collectors__params-item">
                        <span className="collectors__name-param">Proposed </span>
                        <span className="collectors__value-param">{item.proposed}</span>
                      </li>
                    </ul>
                    <ul className="collectors__params clear-list" style={{ justifyContent: "center" }}>
                      <li className="collectors__params-item">
                        <span className="collectors__name-param">Reward </span>
                        <span className="collectors__value-param">{item.reward}</span>
                      </li>
                    </ul> 
                    <Link to="/create-offer">
                      <button className="collectors__button main-button">Make Offer</button>
                    </Link>
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
