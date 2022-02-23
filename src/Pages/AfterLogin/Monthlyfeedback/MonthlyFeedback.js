import React from "react";
import { Layout } from "../../../components/containers";
import { Heading, Input, Label, Button } from "../../../components/shared";
import styles from "./Monthly.module.scss";

const MonthlyFeedback = () => {
  return (
    <Layout>
      <div className={styles.monthlyFeedback}>
        <div className={styles.tithingWrapper}>
          <Heading headingText="Tithing" type="h3" />
          <div className={styles.row}>
            <div className={`${styles.col6} ${styles.paddingTop20}`}>
              <Label>Percentage</Label>
              <Input />
            </div>
            <div className={`${styles.col6} ${styles.paddingTop20}`}>
              <Label>Date</Label>
              <Input />
            </div>
          </div>
          <div className={styles.row}>
            <div className={`${styles.col12}`}>
              <Label>Organizations & place</Label>
              <Input type="textarea" />
            </div>
          </div>
        </div>
        <div className={styles.tithingWrapper}>
          <Heading headingText="Service" type="h3" />
          <div className={styles.row}>
            <div className={`${styles.col6} ${styles.paddingTop20}`}>
              <Label>Total Number of Hours, Where type of service done</Label>
              <Input type="textarea" />
            </div>
            <div className={`${styles.col6} ${styles.paddingTop20}`}>
              <Label>Any new student motivated to YPV classes</Label>
              <Input type="textarea" />
            </div>
          </div>
        </div>
        <div className={`${styles.issueWrapper}`}>
          <Label>
            Improvement over the issue raised inlast one mont feedback
          </Label>
          <Input type="textarea" />
        </div>
        <div className={styles.tithingWrapper}>
          <Heading headingText="FOR TRAINERS" type="h3" />
          <div className={styles.row}>
            <div className={`${styles.col6}  `}>
              <Label>No. of nurturing sessions conducted in last month</Label>
              <Input />
            </div>
            <div className={`${styles.col6} `}>
              <Label>
                How many classes conducted in last one month, course wise
              </Label>
              <Input />
            </div>
          </div>
          <div className={styles.row}>
            <div className={`${styles.col6} `}>
              <Label>
                No. of students generated during last month, course wise
              </Label>
              <Input />
            </div>
            <div className={`${styles.col6}`}>
              <Label>No. of student motivated for higher courses</Label>
              <Input />
            </div>
          </div>
          <div className={styles.row}>
            <div className={`${styles.col6} `}>
              <Label>
                No. of new students motivated to join morning webinar during the
                month
              </Label>
              <Input />
            </div>
          </div>
        </div>
        <div className={`${styles.button} ${styles.mt20}`}>
          <Button size="md" variant="btnPrimary">
            Save
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default MonthlyFeedback;
