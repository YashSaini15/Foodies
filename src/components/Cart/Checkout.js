import classes from "./Checkout.module.css";
import useInput from "../../hooks/use-input";

const isEmpty = (value) => value.trim() !== "";
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: enteredNameHasError,
    valueChangeHandler: enteredNameChangeHandler,
    inputBlurHandler: enteredNameBlurHandler,
    reset: resetEnteredName,
  } = useInput(isEmpty);

  const {
    value: enteredStreet,
    isValid: enteredStreetIsValid,
    hasError: enteredStreetHasError,
    valueChangeHandler: enteredStreetChangeHandler,
    inputBlurHandler: enteredStreetBlurHandler,
    reset: resetEnteredStreet,
  } = useInput(isEmpty);

  const {
    value: enteredCity,
    isValid: enteredCityIsValid,
    hasError: enteredCityHasError,
    valueChangeHandler: enteredCityChangeHandler,
    inputBlurHandler: enteredCityBlurHandler,
    reset: resetEnteredCity,
  } = useInput(isEmpty);

  const {
    value: enteredPostalCode,
    isValid: enteredPostalCodeIsValid,
    hasError: enteredPostalCodeHasError,
    valueChangeHandler: enteredPostalCodeChangeHandler,
    inputBlurHandler: enteredPostalCodeBlurHandler,
    reset: resetEnteredPostalCode,
  } = useInput(isFiveChars);

  let formIsValid = false;
  if (
    enteredNameIsValid &&
    enteredStreetIsValid &&
    enteredCityIsValid &&
    enteredPostalCodeIsValid
  ) {
    formIsValid = true;
  }
  const confirmHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostalCode,
    });
  };

  const nameControlClasses = `${classes.control} ${
    enteredNameHasError ? classes.invalid : ""
  }`;
  const streetControlClasses = `${classes.control} ${
    enteredStreetHasError ? classes.invalid : ""
  }`;
  const postalCodeControlClasses = `${classes.control} ${
    enteredPostalCodeHasError ? classes.invalid : ""
  }`;
  const cityControlClasses = `${classes.control} ${
    enteredCityHasError ? classes.invalid : ""
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={enteredName}
          onChange={enteredNameChangeHandler}
          onBlur={enteredNameBlurHandler}
        />
        {enteredNameHasError && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={enteredStreet}
          onChange={enteredStreetChangeHandler}
          onBlur={enteredStreetBlurHandler}
        />
        {enteredStreetHasError && <p>Please enter a valid street!</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          value={enteredPostalCode}
          onChange={enteredPostalCodeChangeHandler}
          onBlur={enteredPostalCodeBlurHandler}
        />
        {enteredPostalCodeHasError && (
          <p>Please enter a valid postal code (5 characters long)!</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={enteredCity}
          onChange={enteredCityChangeHandler}
          onBlur={enteredCityBlurHandler}
        />
        {enteredCityHasError && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button disabled={!formIsValid} className={classes.submit}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
