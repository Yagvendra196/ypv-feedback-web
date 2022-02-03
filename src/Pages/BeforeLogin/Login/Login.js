import React from "react";
import styles from "./Login.module.scss";
import Logo from "../../../assets/Images/ypvlogo.png";
import { Heading, Input, Button, Text  } from "../../../components/shared";

const Login = () => {
  
  return (
    <div className={styles.loginWrapper}>
      <img src={Logo} alt="" />
      <Heading headingText="Spiritual Buddy Login" type="h2" />
      <div className={styles.textCenter}>
        <Text variant="mdText" color="SecondaryColor">
          Welcome. Please log in!
        </Text>
      </div>
      <div className={styles.mt20}>
        <Input placeholder="Email" inputId="email" name="email" type="email" />
      </div>
      <div className={styles.mt20}>
        <Input
          placeholder="Password"
          inputId="Password"
          name="Password"
          type="Password"
        />
      </div>
      <div className={styles.forgotPass}>
        <Text variant="SecondaryColor">Forgot your password?</Text>
       
      </div>
      <div className={styles.button}>
        <Button size="md" variant="btnPrimary" block={true}>
          Login
        </Button>
      </div>
    </div>
  );
};

export default Login;
