import React from 'react';
import styles from "./Search.module.scss"
import Input from '../Input';
import Icon from '../Icon';
import { Frame} from '../../../assets/img/ImgImport';

const Search=()=>{
    return(
        
            <div className={`${styles.searchBody}`}>
               <h1>Search components</h1>
               <Input inputClass={`${styles.searchInput}`} placeholder="Search"></Input>
               <Icon type="search"  customClass={`${styles.searchIcon}`}></Icon>  
            </div>
        
    );
};

export default Search;