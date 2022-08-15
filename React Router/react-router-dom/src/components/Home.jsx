import React, { Component } from "react";
import Card from "./Card";
import data from "../data/data.json";

function Home() {
  return (
    <div className="Grid animated bounceInUp">
      {data.map((card) => (
        <Card duration={150} key={card.id} card={card} />
      ))}
    </div>
  );
}

export default Home;
