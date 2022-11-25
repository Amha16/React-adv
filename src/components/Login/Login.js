import React, {
  useEffect,
  useState,
  useReducer,
  useContext,
  useRef,
} from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../Context/auth_context";
import Input from "../input/input";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }

  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
};

const Login = (props) => {
  const emailRef = useRef();
  const passowordRef = useRef();

  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, emailDispatch] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, passwordDispatch] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });
  const { isValid: emailIsValidate } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  const autoCtx = useContext(AuthContext);
  useEffect(() => {
    //usetime out to wait execution a littile longer not to execute with every key stroke

    const identifire = setTimeout(() => {
      console.log("idd");
      setFormIsValid(emailIsValidate && passwordIsValid);
    }, 1000);
    return () => {
      console.log("clean up");
      clearTimeout(identifire);
    };
  }, [emailIsValidate, passwordIsValid]);

  const emailChangeHandler = (event) => {
    emailDispatch({ type: "USER_INPUT", val: event.target.value });

    // setFormIsValid(
    //   emailState.value.includes("@") && passwordState.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
    passwordDispatch({ type: "USER_INPUT", val: event.target.value });

    // setFormIsValid(
    //   emailState.value.includes("@") && passwordState.value.trim().length > 6
    // );
  };

  const validateEmailHandler = () => {
    emailDispatch({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    passwordDispatch({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (formIsValid) {
      autoCtx.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValidate) {
      emailRef.current.focus();
    } else {
      passowordRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailRef}
          label="email"
          id="email"
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
          type="email"
          isValid={emailIsValidate}
          value={emailState.value}
        ></Input>

        <Input
          ref={passowordRef}
          label="password"
          id="password"
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
          type="password"
          isValid={passwordIsValid}
          value={passwordState.value}
        ></Input>

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
