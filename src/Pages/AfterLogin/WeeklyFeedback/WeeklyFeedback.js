import React from "react";
import { Layout } from "../../../components/containers";
import { Label, Input, Heading, Button } from "../../../components/shared";
import styles from "./Weekly.module.scss";

const WeeklyFeedback = () => {
  return (
    <Layout>
      <div className={styles.WeeklyWrapper}>
        <div className={styles.row}>
          <div className={styles.col3}>
            <Label>Level of practice</Label>
            <Input />
          </div>
          <div className={styles.col3}>
            <Label>Virtue being practiced</Label>
            <Input />
          </div>
        </div>
        <div className={styles.physicalWrapper}>
          <Heading
            headingText="No. of sets of physical exercises being done "
            type="h3"
          />
          <div className={styles.row}>
            <div className={styles.col3}>
              <Label className={styles.m5}>Level of practice</Label>
              <Input />
            </div>
            <div className={styles.col3}>
              <Label>Virtue being practiced</Label>
              <Input />
            </div>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.col3}>
            <Label>No. of days Physical Excercise done</Label>
            <Input />
          </div>
          <div className={styles.col3}>
            <Label>No. of days Arhat breathing exercises done</Label>
            <Input />
          </div>
          <div className={styles.col3}>
            <Label>How many times Rhythmic Yogic Breathing done in this </Label>
            <Input />
          </div>
          <div className={styles.col3}>
            <Label>How many times Service Blue Triangle done</Label>
            <Input />
          </div>
          <div className={styles.col3}>
            <Label>How many times Blue Triangle done for the virtue</Label>
            <Input />
          </div>
          <div className={styles.col3}>
            <Label>How many time IRFR is done for the virtue</Label>
            <Input />
          </div>
          <div className={styles.col3}>
            <Label>How many times IRFR done before sleeping</Label>
            <Input />
          </div>
        </div>

        <div className={styles.meditationWrapper}>
          <Heading headingText="Meditation practice details" type="h3" />
          <div className={styles.row}>
            <div className={styles.col3}>
              <Label>Morinig Sadhana</Label>
              <Input />
            </div>
            <div className={styles.col3}>
              <Label>PPM</Label>
              <Input />
            </div>
            <div className={styles.col3}>
              <Label>Soul</Label>
              <Input />
            </div>
            <div className={styles.col3}>
              <Label>Dhyan</Label>
              <Input />
            </div>
            <div className={styles.col3}>
              <Label>Kundalini/Levels</Label>
              <Input />
            </div>
            <div className={styles.col3}>
              <Label>Sublimation</Label>
              <Input />
            </div>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.col3}>
            <Label>How many times forgiveness sadhana done</Label>
            <Input />
          </div>
          <div className={styles.col3}>
            <Label>How many hours you have heald</Label>
            <Input />
          </div>
          <div className={styles.col3}>
            <Label>Are you healing family members?</Label>
            <Input />
          </div>
          <div className={styles.col3}>
            <Label>Is Healing regularly required</Label>
            <Input />
          </div>
          <div className={styles.col3}>
            <Label>Have you done self-healing</Label>
            <Input />
          </div>
          <div className={styles.col3}>
            <Label>What meditation missed out</Label>
            <Input type="textarea" />
          </div>
        </div>
        <div className={styles.healthWrapper}>
          <Heading headingText="Physical Health: Parameters" type="h3" />
          <div className={styles.row}>
            <div className={styles.col3}>
              <Label>BMI</Label>
              <Input />
            </div>
            <div className={styles.col3}>
              <Label>BP</Label>
              <Input />
            </div>
            <div className={styles.col3}>
              <Label>SUGAR</Label>
              <Input />
            </div>
            <div className={styles.col3}>
              <Label>Other blood parameters</Label>
              <Input />
            </div>
            <div className={styles.col3}>
              <Label>Any other parameters</Label>
              <Input type="textarea" />
            </div>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.col3}>
            <Label>
              Is medicine being taken regularly (if under medication)
            </Label>
            <Input />
          </div>
          <div className={styles.col3}>
            <Label>Have you attended book study</Label>
            <Input />
          </div>
          <div className={styles.col3}>
            <Label>How many hours of service done?</Label>
            <Input />
          </div>
          <div className={styles.col3}>
            <Label>How many days did you take salt water bath</Label>
            <Input />
          </div>
          <div className={styles.col3}>
            <Label>How many days have you have taken Isabgol</Label>
            <Input />
          </div>
          <div className={styles.col3}>
            <Label>
              Specify Service Details Where and What Kind of Service
            </Label>
            <Input type="textarea" />
          </div>
          <div className={styles.col3}>
            <Label>Recommendations from Buddy</Label>
            <Input type="textarea" />
          </div>
          <div className={styles.col3}>
            <Label>
              What is the emotional/relationship state with family members,
              friend, and close associates
            </Label>
            <Input type="textarea" />
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

export default WeeklyFeedback;
