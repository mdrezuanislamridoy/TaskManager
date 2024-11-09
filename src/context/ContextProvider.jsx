/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const Context = createContext();

export default function ContextProvider({ children }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  return (
    <Context.Provider
      value={{ name, setName, email, setEmail, password, setPassword }}
    >
      {children}
    </Context.Provider>
  );
}

export { ContextProvider };
