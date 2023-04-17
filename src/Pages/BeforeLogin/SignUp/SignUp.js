import React from "react";
import styles from "./SignUp.module.scss";
import Logo from "../../../assets/Images/ypvlogo.png";
import {
  Heading,
  Input,
  Button,
 Text,
  Image,
} from "../../../components/shared";
import { useHistory } from "react-router-dom";
const SignUp = () =>{
  let history = useHistory();
  const goToLogin = () => {
    history.push("/");
  };
    return (
      <div className={styles.signupWrapper}>
        <Image src={Logo} alt="logo" />
        <Heading headingText="Sign Up" type="h2" />
        <div className={styles.mt20}>
          <Input inputId="name" name="Name" type="text" placeholder="Name" />
        </div>
        <div className={styles.mt20}>
          <Input
            inputId="email"
            name="Email"
            type="Email"
            placeholder="Email"
          />
        </div>
        <div className={styles.mt20}>
          <Input
            placeholder="Password"
            inputId="password"
            name="password"
            type="password"
          />
        </div>
        <div className={styles.mt20}>
          <Input
            inputId="Contact No."
            name="Contact No."
            type="tel"
            placeholder="Contact No."
          />
        </div>
        <div>
          <Button size="md" variant="btnPrimary" block={true}>
            Sign Up
          </Button>
        </div>
        <div className={styles.note}>
        <Text color="SecondaryColor">already have an account ? </Text>
        <Text variant="primaryColor" textHandler={goToLogin}>
          Login
        </Text>
      </div>
      </div>
    );
}
export default SignUp;