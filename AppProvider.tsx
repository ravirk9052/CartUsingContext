import { createContext } from "react";

const cartContext = createContext({
    count: 0,
    onIncrement: (item: number) => {},
    onDecrement: (item: number) => {},
    addedCartdata: [],
    onAddCartData: (item: {}) => {},
});

export default cartContext;




