import React from 'react';
import styles from "./Search.module.scss"
import Input from '../Input';
import Icon from '../Icon';

const Search=()=>{
    return(
        
            <div className={`${styles.searchBody}`}>
                <div className={`${styles.searchBox}`}>
                    <Input inputClass={`${styles.searchInput}`} placeholder="Search"></Input>
                    <Icon type="search"  customClass={`${styles.searchIcon}`}></Icon>  
                </div>                 
            </div>
        
    );
};

export default Search;