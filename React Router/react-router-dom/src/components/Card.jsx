import React from "react";
import "./Card.css";

function Card({ card }) {
  return (
    <div className={ card.animation }>
      <div className="front">
        <img src="juice.jpg" alt="Avatar" className="card-image" />
        <div className="container">
          <h3>{ card.title }</h3>
          <h3>
            <span className="price"> ${ card.price }</span>
          </h3>
          <p>{ card.description }</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
