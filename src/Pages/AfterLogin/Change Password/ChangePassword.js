import React from "react";
import styles from "./ChangePas.module.scss";
import { Layout } from "../../../components/containers";
import Logo from "../../../assets/Images/ypvlogo.png";
import { Input, Button, Heading, Image } from "../../../components/shared";
const ChangePassword = () => {
  return (
    <Layout >
      <div className={styles.ChangePassWrapper}>
        <Image src={Logo} alt="logo" />
        <Heading headingText="Change Password" type="h2" />
        <div className={styles.mt20}>
          <Input
            inputClass={styles.mt30}
            inputId="password"
            name="new password"
            type="password"
            placeholder="New Password"
          />
        </div>
        <div className={styles.mt20}>
          <Input
            inputId="password"
            name="confirm password"
            type="password"
            placeholder="Confirm Password"
          />
        </div>
        <div>
          <Button size="md" variant="btnPrimary" block={true}>
            Change Password
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default ChangePassword;
