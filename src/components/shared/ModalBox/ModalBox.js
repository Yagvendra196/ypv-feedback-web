import React from 'react';
// import styles from "./DashBord.module.scss"
import { Modal,Button} from '../../shared';
import styles from './ModalBox.module.scss';

const ModalBox=(props)=>{
    const [show, setShow] = React.useState(false);
    return(
        <>
            <button className={`${styles.modalBtn}`} onClick={() => setShow(true)}>
                Modal
            </button>
            <Modal show={show} onClose={() => setShow(false)} 
            children="Are you sure, You want remove to?" 
            variant='secondary' btnText="Cancel" color="greyDark" size="fontMd">
            </Modal>
        </>
    );
};

export default ModalBox;