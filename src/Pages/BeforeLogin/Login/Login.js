import React from "react";
import styles from "./Login.module.scss";
import Logo from "../../../assets/Images/ypvlogo.png";
import {
  Heading,
  Input,
  Button,
  Text,
  Image,
} from "../../../components/shared";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

const Login = () => {
  let history = useHistory();
  const goToForgotPassword = () => {
    history.push("forgot-password");
  };
  const goToSignUp = () => {
    history.push("signUp");
  };
  // const goTodashboard = () => {
  //   history.push("dashboard");
  // };
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <div className={styles.loginWrapper}>
      <Image src={Logo} alt="logo" />
      <Heading headingText="Spiritual Buddy Login" type="h2" />
      <div className={styles.textCenter}>
        <Text variant="mdText" color="SecondaryColor">
          Welcome. Please log in!
        </Text>
      </div>
      <div  className={`${styles.mt20}`}>
        <Input
        inputClass={styles.mt30}
          placeholder="Email"
          type="email"
          name="email"
          reference={register("email", {
            required: true,
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          })}
        />
        <div className={styles.errorMsg}>
          {errors?.email?.type === "required" && (
            <p>Please enter email address.</p>
          )}

          {errors?.email?.type === "pattern" && (
            <p>Alphabetical characters only</p>
          )}
        </div>
      </div>
      <div className={styles.mt20}>
        <Input
          placeholder="Password"
          type="Password"
          reference={register("Password", {
            required: true,
          })}
        />
        <div className={styles.errorMsg}>
          {errors.Password?.type === "required" && " Please enter Password "}
        </div>
      </div>
      <div className={styles.forgotPass}>
        <Text variant="SecondaryColor" textHandler={goToForgotPassword}>
          Forgot your password?
        </Text>
      </div>
      <div>
        <Button
          size="md"
          variant="btnPrimary"
          block={true}
          // btnHandler={handleSubmit(onSubmit)}
          btnHandler={()=>history.push("dashboard")}
        >
          Log In
        </Button>
      </div>
      <div className={styles.note}>
        <Text color="SecondaryColor">Not a member yet? </Text>
        <Text variant="primaryColor" textHandler={goToSignUp}>
          sign up
        </Text>
      </div>
    </div>
  );
};

export default Login;
