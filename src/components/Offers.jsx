import axios from "axios";
import "../style.css";
import React, { useEffect, useState } from "react";
import { Button, Card, List } from "antd";
import collectionItem from "../img/collection-item.png";

export default class Offers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    };
  }

  componentDidMount() {
    axios
      .get("http://collectix.store:3334/api/tasks")
      .then(function (response) {
        this.setState({ tasks: response });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  render() {
    return (
      <div className="profile-offers">
        <h2 className="main-title">
          Offers
        </h2>
        <h3>
          Task 1
        </h3>
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={this.state.NFTsOnSale}
          className="collection__list clear-list"
          renderItem={item => {
            const id = item.id;
            return (
              <List.Item key={id + "_" + item.uri + "_" + item.owner}>
                <li className="collection__item" style={{width:"80%"}}>
                  <div className="collection__item-wrapper">
                    <img className="collection__item-image" src={collectionItem}/>
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
      </div>
    );
  }
}
