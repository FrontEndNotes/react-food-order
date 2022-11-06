import { useContext, useEffect, useState } from 'react';

import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
    const cartContext = useContext(CartContext);

    const numberOfCartItems = cartContext.items.reduce((current, item) => {
        return current + item.amount;
    }, 0);

    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

    useEffect(() => {
        if (cartContext.items.length === 0) {
            return;
        }
        setBtnIsHighlighted(true);

        const timer = setTimeout(() => {
            setBtnIsHighlighted(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        }
    }, [cartContext.items]);

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your cart</span>
            <span className={classes.badge}>
                {numberOfCartItems}
            </span>
        </button>
    )
}

export default HeaderCartButton;