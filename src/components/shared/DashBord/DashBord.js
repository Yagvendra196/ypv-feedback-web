import React from 'react';
import styles from "./DashBord.module.scss"
import { CardBox } from '../../shared';
import { User} from '../../../assets/img/ImgImport';
import { Eye} from '../../../assets/img/ImgImport';
import { Edit} from '../../../assets/img/ImgImport';
import { Frame} from '../../../assets/img/ImgImport';

const DashBord=()=>{
    return(
        
            <div className={`${styles.cardBody}`}>
                <CardBox heading="My Buddies" IconImage={User} more={Frame}/>            
                <CardBox heading="Give Feedback" IconImage={Edit} more={Frame} />            
                <CardBox heading="View Feedback" IconImage={Eye} more={Frame} />
            </div>
        
    );
};

export default DashBord;