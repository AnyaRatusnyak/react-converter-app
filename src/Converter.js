import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Converter.css";
import Exchange from "./Exchange";
import Rates from "./Rates";

export default function Converter() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState();
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  const [exchangeData, setExchangeData] = useState({});

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
    fetch(
      `https://exchange-rates.abstractapi.com/v1/live?api_key=3a0e022085484f3887c30b7759573705&base=USD`
    )
      .then((response) => response.json())
      .then((result) =>
        setCurrencyOptions(["USD", ...Object.keys(result.exchange_rates)])
      );
  }, []);

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(
        `https://exchange-rates.abstractapi.com/v1/live/?api_key=3a0e022085484f3887c30b7759573705&base=${fromCurrency}&target=${toCurrency}`
      )
        .then((response) => response.json())
        .then((result) =>
          setExchangeRate(Object.values(result.exchange_rates)[0])
        );
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
