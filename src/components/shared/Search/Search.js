import React from 'react';
import styles from "./Search.module.scss"
import Input from '../Input';
import Icon from '../Icon';
import { useHistory } from "react-router-dom";
const Search=()=>{
     let history = useHistory();
     const goToAddBuddies = () => {
       history.push("add-buddies");
     };
    return (
      <div className={`${styles.searchBody}`}>
        <div className={`${styles.searchBox}`}>
          <Input
            inputClass={`${styles.searchInput}`}
            placeholder="Search"
          ></Input>
          <Icon
            type="search"
            customClass={`${styles.searchIcon}`}
            click={goToAddBuddies}
          ></Icon>
        </div>
      
      </div>
    );
};

export default Search;