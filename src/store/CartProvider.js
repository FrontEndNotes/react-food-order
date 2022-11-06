import { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0,
}

const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

        const existingIndex = state.items.findIndex(item => item.id === action.item.id);
        const existingItem = state.items[existingIndex];

        let updatedItems;

        if (existingItem) {
            let updatedItem = {
                ...existingItem,
                amount: existingItem.amount + action.item.amount
            };
            updatedItems = [
                ...state.items
            ];
            updatedItems[existingIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item);
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }

    if (action.type === 'REMOVE') {
        const existingIndex = state.items.findIndex(item => item.id === action.id);
        const existingItem = state.items[existingIndex];
        const updatedTotalAmount = state.totalAmount - existingItem.price;

        let updatedItems;

        if (existingItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.id);
        } else {
            const updatedItem = {
                ...existingItem,
                amount: existingItem.amount - 1
            };
            updatedItems = [...state.items];
            updatedItems[existingIndex] = updatedItem;
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }

    return defaultCartState;
}


const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)


    const addItemToCartHandler = (item) => {
        dispatchCartAction({type: 'ADD', item: item});
    }
    
    const removeItemToCartHandler = (id) => {
        dispatchCartAction({type: 'REMOVE', id: id})
    }

    const startContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemToCartHandler
    };

    return (
        <CartContext.Provider value={startContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider;