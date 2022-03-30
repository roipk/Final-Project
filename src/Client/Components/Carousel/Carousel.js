import React, { useState } from "react";
import ReactDOM from "react-dom";
import Carousel from "react-elastic-carousel";
import Item from "./Item";
import "./styles.css";

const breakPoints = [
    { width: 100, itemsToShow: 1 },
    { width: 100, itemsToShow: 2 },
    { width: 100, itemsToShow: 3, itemsToScroll: 1 }
];

export default function CarouselApp(session) {
    console.log(session.session)
    const [items, setItems] = useState(session.session);
    items.sort(function(a,b){
        return b.score - a.score;
    });

    const addItem = () => {
        const nextItem = Math.max(1, items.length + 1);
        setItems([...items, nextItem]);
    };

    const removeItem = () => {
        const endRange = Math.max(0, items.length - 1);
        setItems(items.slice(0, endRange));
    };

    return (
        <div className="CarouselApp">
            <hr className="seperator" />
            <div className="carousel-wrapper">
                <Carousel breakPoints={breakPoints}>
                    {items.map((item,index) => (
                        <Item key={index}>title: {item.originTitle} {<br/>} score: {item.score}</Item>
                    ))}
                </Carousel>
            </div>
        </div>
    );
}
