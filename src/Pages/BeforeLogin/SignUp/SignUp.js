import React from "react";
import styles from "./SignUp.module.scss";
import Logo from "../../../assets/Images/ypvlogo.png";
import {
  Heading,
  Input,
  Button,
 
  Image,
} from "../../../components/shared";
const SignUp = () =>{
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
      </div>
    );
}
export default SignUp;