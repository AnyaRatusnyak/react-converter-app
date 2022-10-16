import React, { useEffect, useState } from "react";
import "./Converter.css";
import Exchange from "./Exchange";
import Rates from "./Rates";

export default function Converter() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  const [exchangeData, setExchangeData] = useState({});

  var myHeaders = new Headers();
  myHeaders.append("apikey", "c17TLZjDRw54v2tu7MUQMwdSilBF2b7A");

  var requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    fetch(`https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5`)
      .then((response) => response.json())
      .then((result) =>
        setExchangeData({
          dollarData: result[0].buy,
          euroData: result[1].buy,
        })
      );
  }, []);

  useEffect(() => {
    fetch(`https://api.apilayer.com/exchangerates_data/symbols`, requestOptions)
      .then((response) => response.json())
      .then((result) => setCurrencyOptions(Object.keys(result.symbols)));
  }, []);

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(
        `https://api.apilayer.com/exchangerates_data/latest?symbols=${toCurrency}&base=${fromCurrency}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => setExchangeRate(Object.values(result.rates)));
    }
  }, [fromCurrency, toCurrency]);

  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }
  return (
    <div className="Converter">
      <Rates data={exchangeData} />

      <div className="row">
        <div className="col-6">
          <Exchange
            currencyOptions={currencyOptions}
            selectedCurrency={fromCurrency}
            onChangeCurrency={(e) => setFromCurrency(e.target.value)}
            onChangeAmount={handleFromAmountChange}
            amount={fromAmount}
          />
        </div>
        <div className="col-6">
          <Exchange
            currencyOptions={currencyOptions}
            selectedCurrency={toCurrency}
            onChangeCurrency={(e) => setToCurrency(e.target.value)}
            onChangeAmount={handleToAmountChange}
            amount={toAmount}
          />
        </div>
      </div>
    </div>
  );
}
