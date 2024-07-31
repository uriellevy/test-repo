import * as React from "react";

export const CardContext = React.createContext(null);

const CardProvider = ({children}) => {
  const [cards,setCards] = React.useState([]);
  const [myCartProducts,setMyCartProducts] = React.useState([]);
  const [error, setError] = React.useState("");

  const getAllCards = async () => {
    
  }

  return (
    <CardContext.Provider
      value={{ error }}
    >
      {children}
    </CardContext.Provider>
  );
};

export default CardProvider;
