import { useState } from "react";
import logo from "./images/card-logo.svg";
import completeIcon from "./images/icon-complete.svg";

const Form = () => {
  const [name, setName] = useState("Jane Appleseed");
  const [cardNumber, setCardNumber] = useState("0000000000000000");
  const [month, setMonth] = useState("00");
  const [year, setYear] = useState("00");
  const [cvc, setCVC] = useState("000");

  function handleContinue() {
    document.querySelector("form").style.display = "grid";
    document.querySelector(".complete").style.display = "none";
  }
  function handleChange() {
    const cardNumber = document.querySelector("#number");
    let parts = [];
    if (cardNumber.value.length === 14) {
      parts.push(cardNumber.value.slice(0, 14));
      parts.push(" ");
      cardNumber.value = parts.join("");
    }
    if (cardNumber.value.length === 9) {
      parts.push(cardNumber.value.slice(0, 9));
      parts.push(" ");
      cardNumber.value = parts.join("");
    }
    if (cardNumber.value.length === 4) {
      parts.push(cardNumber.value.slice(0, 4));
      parts.push(" ");
      cardNumber.value = parts.join("");
    }
  }
  function handleSubmit() {
    const holderName = document.querySelector("#name");
    const cardNumber = document.querySelector("#number");
    const month = document.querySelector("#month");
    const year = document.querySelector("#year");
    const cvc = document.querySelector("#cvc");

    const nameP = document.querySelector(".name>p");
    const numberP = document.querySelector(".number>p");
    const dateP = document.querySelector(".date>p");
    const cvcP = document.querySelector(".cvc>p");
    const regex = /[0-9 ]{19}/g;

    if (
      holderName.value &&
      cardNumber.value.match(regex) &&
      cardNumber.value &&
      month.value >= 1 &&
      month.value <= 12 &&
      year.value > 22 &&
      cvc.value.length === 3
    ) {
      setName(holderName.value);
      setCardNumber(cardNumber.value);
      setMonth(month.value);
      setYear(year.value);
      setCVC(cvc.value);
      holderName.classList.remove("error");
      nameP.classList.remove("show");
      cardNumber.classList.remove("error");
      numberP.classList.remove("show");
      month.classList.remove("error");
      year.classList.remove("error");
      dateP.classList.remove("show");
      cvc.classList.remove("error");
      cvcP.classList.remove("show");
      holderName.value = "";
      cardNumber.value = "";
      month.value = "";
      year.value = "";
      cvc.value = "";
      document.querySelector("form").style.display = "none";
      document.querySelector(".complete").style.display = "flex";
    } else {
      if (holderName.value) {
        holderName.classList.remove("error");
        nameP.classList.remove("show");
      } else {
        holderName.classList.add("error");
        nameP.classList.add("show");
      }

      if (!cardNumber.value || !cardNumber.value.match(regex)) {
        cardNumber.classList.add("error");
        numberP.classList.add("show");
      } else {
        cardNumber.classList.remove("error");
        numberP.classList.remove("show");
      }

      if (month.value >= 1 && month.value <= 12) {
        month.classList.remove("error");
      } else {
        month.classList.add("error");
        if (!dateP.classList.contains("show")) {
          dateP.classList.add("show");
        }
      }
      if (year.value > 22) {
        year.classList.remove("error");
      } else {
        year.classList.add("error");
        if (!dateP.classList.contains("show")) {
          dateP.classList.add("show");
        }
      }
      if (month.value >= 1 && month.value <= 12 && year.value > 22) {
        dateP.classList.remove("show");
      }
      if (cvc.value.length === 3) {
        cvc.classList.remove("error");
        cvcP.classList.remove("show");
      } else {
        cvc.classList.add("error");
        cvcP.classList.add("show");
      }
    }
  }

  return (
    <main>
      <form>
        <div className="name">
          <label htmlFor="name">Cardholder Name</label>
          <input type="text" id="name" placeholder="e.g. Jane Appleseed" />
          <p>Can't be blank</p>
        </div>
        <div className="number">
          <label htmlFor="number">Card Number</label>
          <input
            onChange={handleChange}
            type="text"
            id="number"
            placeholder="e.g. 1234 5678 9123 0000"
            maxLength={19}
          />
          <p>Wrong format, numbers only</p>
        </div>
        <div className="date">
          <label htmlFor="month">Exp. Date (MM/YY)</label>
          <input type="text" id="month" maxLength={2} placeholder="MM" />
          <input type="text" id="year" maxLength={2} placeholder="YY" />
          <p>Can't be blank</p>
        </div>
        <div className="cvc">
          <label htmlFor="cvc">CVC</label>
          <input type="text" id="cvc" placeholder="e.g. 123" maxLength={3} />
          <p>Can't be blank</p>
        </div>
        <button id="submit" type="button" onClick={handleSubmit}>
          Confirm
        </button>
      </form>
      <div className="complete">
        <div className="img-wrapper">
          <img src={completeIcon} alt="" />
        </div>
        <h1>Thank you!</h1>
        <p>We've added your card details</p>
        <button id="continue" onClick={handleContinue}>
          Continue
        </button>
      </div>
      <div className="card">
        <div className="cardFront">
          <img src={logo} alt="Logo" />
          <div className="text">
            <p className="number">{cardNumber}</p>
            <div className="bottom">
              <p className="name">{name}</p>
              <p className="date">
                {month}/{year}
              </p>
            </div>
          </div>
        </div>
        <div className="cardBack">
          <span className="cvc">{cvc}</span>
        </div>
      </div>
    </main>
  );
};

export default Form;
