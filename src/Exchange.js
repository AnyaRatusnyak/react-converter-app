import React from "react";
import "./Exchange.css";

export default function Exchange(props) {
  const {
    currencyOptions,
    selectedCurrency,
    onChangeCurrency,
    onChangeAmount,
    amount,
  } = props;

  return (
    <div className="Exchange">
      <select value={selectedCurrency} onChange={onChangeCurrency}>
        {currencyOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <input
        value={amount}
        type="number"
        onChange={onChangeAmount}
        placeholder="Enter amound"
        className="input"
      />
    </div>
  );
}
