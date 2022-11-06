import { forwardRef } from 'react';

import classes from './Input.module.css';

const Input = forwardRef((props, ref) => {
    return(
        <p className={classes.input}>
            <label htmlFor={props.input.id}>
                {props.label}
            </label>
            <input ref={ref} {...props.input}/>
        </p>
    )
});

export default Input;