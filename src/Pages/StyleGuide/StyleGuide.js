import React from "react";

import styles from "./StyleGuide.module.scss";

import {
  Heading,
  SelectItem,
  SelectGroup,
  Input,
  Button,
  Label,
  ListGroup,
  ListItem,
} from "../../components/shared";

const StyleGuide = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.btnSection}>
          <Button size="lg" variant="btnPrimary">
            Button
          </Button>
          <Button size="lg" variant="btnSecondary">
            Button
          </Button>
          <Button size="lg" variant="btnTertiary">
            Button
          </Button>
          <Button size="lg" variant="secondaryDisable">
            Button
          </Button>
          <Button size="md" variant="btnPrimary">
            Button
          </Button>
          <Button size="md" variant="btnSecondary">
            Button
          </Button>
          <Button size="md" variant="btnTertiary">
            Button
          </Button>
          <Button size="md" variant="secondaryDisable">
            Button
          </Button>
          <Button size="sm" variant="btnPrimary">
            Button
          </Button>
          <Button size="sm" variant="btnSecondary">
            Button
          </Button>
          <Button size="sm" variant="btnTertiary">
            Button
          </Button>
          <Button size="sm" variant="secondaryDisable">
            Button
          </Button>
        </div>
        <div className={styles.mb20}>
          <div className={styles.mb10}>
            <Input inputId="fname" name="Name" type="text" disabled />
          </div>
          <div className={styles.mb10}>
            <Input inputId="name" name="Name" type="text" placeholder="Name" />
          </div>
          <div className={styles.mb10}>
            <Input
              placeholder="Password"
              inputId="password"
              name="password"
              type="password"
            />
          </div>
          <div className={styles.mb10}>
            <Input type="textarea" placeholder="Messages" />
          </div>
        </div>
        <div>
          <Heading headingText="Headding h1" type="h1" />
          <Heading headingText="Headding h2" type="h2" />
          <Heading headingText="Headding h3" type="h3" />
          <Heading headingText="Headding h4" type="h4" />
          <Heading headingText="Headding h5" type="h5" />
          <Heading headingText="Headding h6" type="h6" />
        </div>
        <div>
          <SelectGroup>
            <SelectItem>-- Select --</SelectItem>
            <SelectItem>1</SelectItem>
            <SelectItem>2</SelectItem>
          </SelectGroup>
        </div>
        <div>
          <Label>Hello</Label>
        </div>
        <div>
          <ListGroup>
            <ListItem>1</ListItem>
            <ListItem>1</ListItem>
          </ListGroup>
        </div>
      </div>
    </>
  );
};

export default StyleGuide;
