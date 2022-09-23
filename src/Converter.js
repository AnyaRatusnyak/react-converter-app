import React, { useState } from "react";
import axios from "axios";
import "./Converter.css";

export default function Converter() {
  function handleResponse(response) {
    console.log(response.data);
  }
  let apiUrl =
    "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5";
  axios.get(apiUrl).then(handleResponse);
  return (
    <div className="Converter">
      <h1>Currency Converter</h1>
      <h2>
        <span>$ 36 </span>
        <span>€ 37</span>
      </h2>
      <div className="row">
        <div className="col-6">
          <form>
            <select>
              <option>UAH</option>
              <option>USD</option>
              <option>EUR</option>
            </select>
            <input
              type="search"
              placeholder="Enter amound"
              className="form-control"
            />
          </form>
        </div>
        <div className="col-6">
          <form>
            <select>
              <option>UAH</option>
              <option>USD</option>
              <option>EUR</option>
            </select>
            <input
              type="search"
              placeholder="Enter amound"
              className="form-control"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
