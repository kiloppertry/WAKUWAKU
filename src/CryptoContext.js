import React, { createContext, useContext, useEffect, useState } from "react";

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("$");

  useEffect(() => {
    if (currency === "CNY") setSymbol("¥");
    else if (currency === "USD") setSymbol("$")
    else if (currency === "EUR") setSymbol("€")
    else if (currency === "JPY") setSymbol("¥")
  }, [currency]);
  //自定义hooks,用于传人民币和美元的符号
  return (
    <Crypto.Provider value={{ currency, setCurrency, symbol }}>
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};
