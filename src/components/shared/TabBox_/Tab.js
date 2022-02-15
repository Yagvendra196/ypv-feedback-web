import React, { useEffect, useState } from "react";
import TabPane from "./TabPane";
import styles from './Tab.module.scss';

const Tab = (props) => {
  state = {
    selected: this.props.selected || 2
  };

  handleChange(index) {
    this.setState({ selected: index });
  }
  return (
        <>
        <ul>
          {this.props.children.map((elem, index) => {
            let style = index === this.state.selected ? "selected" : "";
            return (
              <li
                key={index}
                className={style}
                onClick={() => this.handleChange(index)}
              >
                {elem.props.title}
              </li>
            );
          })}
        </ul>
        <div className="tab">{this.props.children[this.state.selected]}</div>
      </>
  );
};


export default Tab;
