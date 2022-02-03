import React from "react";
import styles from "./ForgotPass.module.scss";
import Logo from "../../assets/Images/ypvlogo.png";
import { Heading, Input, Text, Button } from "../../components/shared";

const ForgotPassword = () => {
  return (
    <div className={styles.forgotWrapper}>
      <img src={Logo} alt="" />
      <Heading headingText="Forgot your password" type="h1" />
      <div className={styles.textCenter}>
        <Text color="SecondaryColor">
          Enter the email you registered when registering A temporary password
          will be sent to that email.
        </Text>
      </div>
      <div className={styles.mt20}>
        <Input placeholder="Email" inputId="email" name="email" type="email" />
      </div>
      <Button size="md" variant="btnPrimary" block={true}>
        Forgot your password
      </Button>
    </div>
  );
};

export default ForgotPassword;
