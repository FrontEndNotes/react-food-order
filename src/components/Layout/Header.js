import { Fragment } from 'react';
import melasImg from '../../assets/meals.jpg';
import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';

const Header = (props) => {
    return(
        <Fragment>
            <header className={classes.header}>
                <h1>React Meals</h1>

                <HeaderCartButton onClick={props.onShowCart}>
                    Cart
                </HeaderCartButton>
            </header>
            <div className={classes['main-image']}>
                <img src={melasImg} alt='A table full of delicious food'/>
            </div>
        </Fragment>
    )
}

export default Header;