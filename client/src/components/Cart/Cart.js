import { Fragment, useContext, useEffect, useState } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import styles from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';

const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 });
    };

    const orderHandler = () => {
        setIsCheckout(true);
    }

    const orderConfirmHandler = async (userdata) => {
        setIsSubmitting(true);
        const postingData = await fetch('http://localhost:8080/api/add-order', {
            method: 'POST',
            body: JSON.stringify({
                user: userdata,
                orders: cartCtx.items
            })
        });
        console.log(postingData);
        setIsSubmitting(false);
        setDidSubmit(true);
        setTimeout(() => {
            setDidSubmit(false);
            props.onCloseCart();
        }, 2000)
        cartCtx.clearCart();
    }

    const cartItems = (
        <ul className={styles['cart-items']}>
            {cartCtx.items.map((item) => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)}
                />
            ))}
        </ul>
    );

    const modalActions =
        <div className={styles.actions}>
            <button className={styles['button--alt']} onClick={props.onCloseCart}>
                Close
            </button>
            {hasItems &&
                <button className={styles.button} onClick={orderHandler}>
                    Order
                </button>}
        </div>;

    const modalAboba = (
        <Fragment>
            {cartItems}
            <div className={styles.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {modalActions}
        </Fragment>
    );

    const cancelHandler = () => {
        setIsCheckout(prevCheckout => !prevCheckout);
    }

    const modalCheckout = (
        <Fragment>
            {isCheckout && <Checkout onConfirm={orderConfirmHandler} onCancel={cancelHandler} />}
            {!isCheckout && modalActions}
        </Fragment>
    );

    const submittingModal = <p>Sending order data...</p>;

    const successModal = <p>Success!</p>;

    return (
        <Modal onClick={props.onCloseCart}>
            {!isCheckout && !didSubmit && !isSubmitting && modalAboba}
            {isCheckout && !didSubmit && !isSubmitting && modalCheckout}
            {isSubmitting && submittingModal}
            {didSubmit && successModal}
        </Modal>
    );
};

export default Cart;