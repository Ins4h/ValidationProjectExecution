import { useEffect, useState } from "react";
import "./App.css";
import { store } from "./store";
import { Form } from "./components/Form";

function App() {
  const storeState = store.getState();
  const [firstName, setFirstName] = useState(storeState?.firstName || "");
  const [lastName, setLastName] = useState(storeState?.lastName || "");
  const [email, setEmail] = useState(storeState?.email || "");
  const [message, setMessage] = useState(storeState?.message || "");

  const handleChange = () => {
    const storeState = store.getState();

    setFirstName(storeState.firstName);
    setLastName(storeState.lastName);
    setEmail(storeState.email);
    setMessage(storeState.message);
  };

  const unsubscribe = store.subscribe(handleChange);
  useEffect(() => {
    return () => {
      unsubscribe();
    };
  });

  return (
    <div className="App">
      <Form />

      <div>
        <h1>Stored values</h1>
        <p>
          <span>First name: </span>
          <span>{firstName}</span>
        </p>
        <p>
          <span>Last name: </span>
          <span>{lastName}</span>
        </p>
        <p>
          <span>Email: </span>
          <span>{email}</span>
        </p>
        <p>
          <span>Message: </span>
          <span>{message}</span>
        </p>
      </div>
    </div>
  );
}

export default App;
