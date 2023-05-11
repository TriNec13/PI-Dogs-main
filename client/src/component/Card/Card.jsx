import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

export default function Card({ id, name, temperaments, weight, image }) {
    const uniqueTemperaments = [...new Set(temperaments)];

    return (
        <div className="card">
            <div className="cardImg">
                <img src={image} alt="" />
                <div className="principalContent">
                    <h2 className="cardName">{name}</h2>
                </div>
            </div>
            <div className="cardContent">
                <div className="cardItems">
                    <h3 className="cardInfo">{weight.join(' - ')} Kg</h3>
                    <h3 className="cardInfo">
                        {uniqueTemperaments.slice(0, 25).join(', ')}...
                    </h3>
                </div>
            </div>
        </div>
    );
}
