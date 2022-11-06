import { useRef, useState } from 'react';

import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {
    const [amountIsValid, setAmountIsValid] = useState(true);
    const amountInputRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();
        
        const amount = amountInputRef.current.value;
        const amountNum = +amount;

        if (amount.trim().length === 0 || amountNum < 1 || amountNum > 5) {
            setAmountIsValid(false);
            return;
        }

        props.onAddToCart(amountNum);
    }

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input 
                ref={amountInputRef} 
                label="Amount" 
                input={{id: 'amount_'+ props.id, type: 'number', defaultValue: '1'}}/>
            <button type="submit">+ Add</button>
            {!amountIsValid && <p>Please enter a valid amount</p>}
        </form>
    )
}

export default MealItemForm;