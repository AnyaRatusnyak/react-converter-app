import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Converter.css";
import Exchange from "./Exchange";

export default function Converter() {
  const [currencyData, setCurrencyData] = useState({});

  useEffect(() => {
    const apiUrl =
      "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5";
    axios.get(apiUrl).then((resp) => {
      setCurrencyData({
        dollarData: resp.data[0].buy,
        euroData: resp.data[1].buy,
      });
    });
  }, [setCurrencyData]);

  return (
    <div className="Converter">
      <h1>Currency Converter</h1>
      <h2>
        <span>$ {currencyData.dollarData} </span>
        <span>€ {currencyData.euroData}</span>
      </h2>
      <Exchange data={currencyData} />
    </div>
  );
}
