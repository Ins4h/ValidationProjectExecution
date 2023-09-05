import { useState } from "react";
import { store, actionTypes } from "../store";
import validator from "validator";
import "./styles.css";

export const Form = ({ onSubmit = () => {} }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [firstNameValidation, setFirstNameValidation] = useState(false);
  const [lastNameValidation, setLastNameValidation] = useState(false);
  const [emailValidation, setEmailValidation] = useState(false);
  const [messageValidation, setMessageValidation] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const isFirstName = firstName.length > 0;
    const isLastName = lastName.length > 0;
    const isEmail = validator.isEmail(email);
    const isMessage = message.length > 10;

    if (isFirstName && isLastName && isEmail && isMessage) {
      onSubmit();
      store.dispatch({
        type: actionTypes.addFirstName,
        firstName,
      });

      store.dispatch({
        type: actionTypes.addLastName,
        lastName,
      });

      store.dispatch({
        type: actionTypes.addEmail,
        email,
      });

      store.dispatch({
        type: actionTypes.addMessage,
        message,
      });
    } else {
      setFirstNameValidation(true);
      setLastNameValidation(true);
      setEmailValidation(true);
      setMessageValidation(true);
    }
  };

  return (
    <form className="form-container" name="messageForm" onSubmit={handleSubmit}>
      <label className="label-container">
        <span className="label">First name: </span>
        <input
          type="text"
          name="firstName"
          value={firstName}
          onBlur={() => {
            if (firstName.length > 0) {
              setFirstNameValidation(false);
            }
          }}
          onChange={(e) => setFirstName(e.target.value)}
        />
        {firstNameValidation && (
          <span className="validation-message"> Required</span>
        )}
      </label>

      <label className="label-container">
        <span className="label">Last name:</span>
        <input
          type="text"
          name="lastName"
          value={lastName}
          onBlur={() => {
            if (firstName.length > 0) {
              setLastNameValidation(false);
            }
          }}
          onChange={(e) => setLastName(e.target.value)}
        />
        {lastNameValidation && (
          <span className="validation-message"> Required</span>
        )}
      </label>
      <label className="label-container">
        <span className="label">email:</span>
        <input
          type="text"
          name="email"
          value={email}
          onBlur={() => {
            if (validator.isEmail(email)) {
              setEmailValidation(false);
            }
          }}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailValidation && (
          <span className="validation-message"> Invalid Email</span>
        )}
      </label>
      <label className="label-container">
        <span className="label">message:</span>
        <textarea
          type="text"
          name="message"
          value={message}
          onBlur={() => {
            if (message.length > 10) {
              setMessageValidation(false);
            }
          }}
          onChange={(e) => setMessage(e.target.value)}
        />
        {messageValidation && (
          <span className="validation-message">
            Message has to have minimum 10 characters
          </span>
        )}
      </label>

      <input type="submit" value="Submit" />
    </form>
  );
};
