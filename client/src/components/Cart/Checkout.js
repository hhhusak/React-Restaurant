import { useRef, useState } from 'react';
import styles from './Checkout.module.css';

const isEmpty = (value) => value.trim() === '';
const isNotFiveDigits = (value) => value.trim().length !== 5;

const Checkout = (props) => {
    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        street: true,
        city: true,
        postcode: true
    })

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postcodeInputRef = useRef();
    const cityInputRef = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostcode = postcodeInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredPostcodeIsValid = !isNotFiveDigits(enteredPostcode);
        const enteredCityIsValid = !isEmpty(enteredCity);

        setFormInputsValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            city: enteredCityIsValid,
            postcode: enteredPostcode
        })

        const formIsValid = enteredNameIsValid &&
            enteredStreetIsValid &&
            enteredPostcodeIsValid &&
            enteredCityIsValid;

        if (!formIsValid) {
            return;
        }

        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            postcode: enteredPostcode
        })
    };

    const nameControlClasses = `${styles.control} ${formInputsValidity.name ? '' : styles.invalid}`;
    const streetControlClasses = `${styles.control} ${formInputsValidity.street ? '' : styles.invalid}`;
    const postcodeControlClasses = `${styles.control} ${formInputsValidity.postcode ? '' : styles.invalid}`;
    const cityControlClasses = `${styles.control} ${formInputsValidity.city ? '' : styles.invalid}`;


    return (
        <form className={styles.form} onSubmit={confirmHandler}>
            <div className={nameControlClasses}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={nameInputRef} />
                {!formInputsValidity.name && <p>Please enter valid name.</p>}
            </div>
            <div className={streetControlClasses}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' ref={streetInputRef} />
                {!formInputsValidity.street && <p>Please enter valid street.</p>}
            </div>
            <div className={postcodeControlClasses}>
                <label htmlFor='postal' >Postal Code</label>
                <input type='text' id='postal' ref={postcodeInputRef} />
                {!formInputsValidity.postcode && <p>Please enter valid postal code.</p>}
            </div>
            <div className={cityControlClasses}>
                <label htmlFor='city' >City</label>
                <input type='text' id='city' ref={cityInputRef} />
                {!formInputsValidity.city && <p>Please enter valid city.</p>}
            </div>
            <div className={styles.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={styles.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;