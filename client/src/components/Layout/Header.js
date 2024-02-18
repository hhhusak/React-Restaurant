import React, { Fragment } from 'react';
import styles from './Header.module.css';
import image from '../../assets/meals.jpg';
import HeaderCartButton from './HeaderCartButton';

const Header = props => {
    return (
        <Fragment>
            <header className={styles.header}>
                <h1>Restaurant</h1>
                <HeaderCartButton onClick={props.onCartOpen} />
            </header>
            <div className={styles['main-image']}>
                <img src={image} alt='Table of food' />
            </div>
        </Fragment>
    )
}

export default Header;