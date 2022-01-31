import React from "react";
import styles from "./Login.module.scss";
import { Heading,Input,Button,Text } from "../../components/shared";

const Login = () => {
  return (
    <>
      <div className={styles.loginwrapper}>
        <Heading headingText="Spiritual Buddy Login" type="h1" />
        <div className={styles.textcenter}>
          <Text variant="SecondaryColor">Welcome. Please log in!</Text>
        </div>
        <div className={styles.emailwrapper}>
          <Input
            placeholder="Email"
            inputId="email"
            name="email"
            type="email"
          />
        </div>
        <div className={styles.Passwordwrapper}>
          <Input
            placeholder="Password"
            inputId="Password"
            name="Password"
            type="Password"
          />
        </div>
        <div className={styles.forgotpass}>
          <Text variant="SecondaryColor">Forgot your password</Text>
        </div>
        <div className={styles.button}>
          <Button size="md" variant="btnPrimary">
            Login
          </Button>
        </div>
      </div>
    </>
  );
};

export default Login;
