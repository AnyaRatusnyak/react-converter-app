import React, { useState } from "react";
import "./Exchange.css";

export default function Exchange(props) {
  const [currencyOne, setCurrencyOne] = useState("UAH");
  const [currencyTwo, setCurrencyTwo] = useState("UAH");
  const [amoundOne, setAmoundOne] = useState(null);
  const [amoundTwo, setAmoundTwo] = useState(null);

  function getConvertionOne() {
    let result = 0;
    if (currencyOne === currencyTwo) {
      result += amoundOne;
    } else if (currencyOne === "USD") {
      result = amoundOne * props.data.dollarData;
    } else if (currencyOne === "EUR") {
      result = amoundOne * props.data.euroData;
    } else {
      result += amoundOne;
    }

    return result;
  }

  function getConvertionTwo() {
    let result = 0;
    if (currencyOne === currencyTwo) {
      result += amoundTwo;
    } else if (currencyTwo === "USD") {
      result = amoundTwo * props.data.dollarData;
    } else if (currencyTwo === "EUR") {
      result = amoundTwo * props.data.euroData;
    } else {
      result += amoundTwo;
    }

    return result;
  }

  function handleSubmitOne(event) {
    event.preventDefault();
    getConvertionOne();
  }
  function handleSubmitTwo(event) {
    event.preventDefault();
    getConvertionTwo();
  }

  function updateAmoundOne(event) {
    setAmoundOne(event.target.value);
  }

  function updateAmoundTwo(event) {
    setAmoundTwo(event.target.value);
  }

  function chengeSelectOne(event) {
    setCurrencyOne(event.target.value);
  }

  function chengeSelectTwo(event) {
    setCurrencyTwo(event.target.value);
  }
  return (
    <div className="Exchange">
      <div className="row">
        <div className="col-6">
          <form onSubmit={handleSubmitOne}>
            <select value={currencyOne} onChange={chengeSelectOne}>
              <option valueone="Uah">UAH</option>
              <option valueone="Usd">USD</option>
              <option valueone="Eur">EUR</option>
            </select>
            <input
              //value={getConvertionTwo()}
              type="search"
              onChange={updateAmoundOne}
              placeholder="Enter amound"
              className="form-control"
            />
          </form>
        </div>
        <div className="col-6">
          <form onSubmit={handleSubmitTwo}>
            <select value={currencyTwo} onChange={chengeSelectTwo}>
              <option valuetwo="Uah">UAH</option>
              <option valuetwo="Usd">USD</option>
              <option valuetwo="Eur">EUR</option>
            </select>
            <input
              value={getConvertionOne()}
              type="search"
              onChange={updateAmoundTwo}
              placeholder="Enter amound"
              className="form-control"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
