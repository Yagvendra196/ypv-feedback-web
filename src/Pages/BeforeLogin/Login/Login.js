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
import { Link } from "react-router-dom";

const Login = () => {
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
      <div className={styles.mt20}>
        <Input
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
        <Link to="/forgot-password">
          <Text variant="SecondaryColor">Forgot your password?</Text>
        </Link>
      </div>
      <div>
        <Button
          size="md"
          variant="btnPrimary"
          block={true}
          btnHandler={handleSubmit(onSubmit)}
        >
          <Link to="/dashboard">Log In</Link>
        </Button>
      </div>
    </div>
  );
};

export default Login;
