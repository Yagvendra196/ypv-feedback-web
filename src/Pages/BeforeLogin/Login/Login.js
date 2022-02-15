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
// import { ErrorMessage } from "@hookform/error-message";

const Login = () => {
    const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm();
    
  const onSubmit = (data) => console.log(data);
   console.log(watch(""));
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
            maxLength: 10,
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          })}
        />
        <div className={styles.errorMsg}>
          {errors?.email?.type === "required" && <p>This field is required</p>}
          {errors?.email?.type === "maxLength" && (
            <p>First name cannot exceed 10 characters</p>
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
          {errors.Password?.type === "required" && "Password is required"}
        </div>
      </div>
      <div className={styles.forgotPass}>
        <Text variant="SecondaryColor">Forgot your password?</Text>
      </div>
      <div>
        <Button
          size="md"
          variant="btnPrimary"
          block={true}
          btnHandler={handleSubmit(onSubmit)}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default Login;
