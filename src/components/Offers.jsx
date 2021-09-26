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
    let categories = axios
      .get("http://localhost:4100/v1/users/getUsers")
      .then(response => {
        this.setState({ users: response.data });
        this.NFTs = [];
        console.log(this.state.users);
        this.state.users.forEach(user => {
          user.NFT.forEach(nft_user => {
            this.NFTs.push(nft_user);
          });
        });
        let NFTsOnSale = [];
        this.NFTs.forEach(NFT => {
          const jsonManifestBuffer = this.props.getFromIPFS(NFT.uri.slice(6, 100)).then(jsonManifestBuffer => {
            const jsonManifest = JSON.parse(jsonManifestBuffer.toString());
            NFTsOnSale.push({ id: NFT.tokenId, uri: NFT.uri, owner: NFT.creators[0].account, ...jsonManifest });
          });
        });
        this.setState({ NFTsOnSale: NFTsOnSale });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  render() {
    console.log("AAAAAA", this.state.NFTsOnSale);
    return (
      <div className="profile-offers">
        <h2 className="main-title">Offers</h2>
        <h3>Task 1</h3>
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={this.state.NFTsOnSale}
          className="collection__list clear-list"
          renderItem={item => {
            const id = item.id;
            item.image = item.image ? item.image : "sfsfs";
            let url = "https://gateway.pinata.cloud/" + item.image.slice(7, 100);
            return (
              <List.Item key={id + "_" + item.uri + "_" + item.owner}>
                <li className="collection__item" style={{ width: "80%" }}>
                  <div className="collection__item-wrapper">
                    <img className="collection__item-image" src={url} />
                    <a className="collection__name" href="">
                      {item.name}
                    </a>
                    <div className="collection__author">
                      <span className="collection__author-name">{item.owner}</span>
                      <span className="collection__author-raiting">(Rating: 12)</span>
                    </div>
                    <div className="collection__item-description">{item.description}</div>
                    <div className="collection__creator">Royalties</div>
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
