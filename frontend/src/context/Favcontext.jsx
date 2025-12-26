import { createContext, useState } from "react";
import React from "react";
export const Favcontext = createContext();

const Functionfavcontext = (props) => {
  const [favorites, setfavorites] = useState([]);
  const value = {
    favorites,
    setfavorites,
  };

  return (
    <Favcontext.Provider value={value}>
      {props.children}
    </Favcontext.Provider>
  );
};

export default Functionfavcontext;
