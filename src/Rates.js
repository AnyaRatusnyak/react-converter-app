import React from "react";

export default function Rates(props) {
  const exchangeData = props;
  console.log(exchangeData);
  return (
    <div className="Rates">
      <h1>Currency Converter</h1>
      <h2>
        <span>${exchangeData.data.dollarData} </span>
        <span>€{exchangeData.data.euroData}</span>
      </h2>
    </div>
  );
}
