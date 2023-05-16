'use client'
import { useEffect, useState } from 'react';
import styles from './side-menu-wrapper.module.scss';



const SideMenuWrapper = ({children , isShowSideMenu}) => {
    const [ isShow , setIsShow] = useState(false || isShowSideMenu);
    if(!isShow)
       return ""
    return(
            <div className={styles.sideMenuWrapper}>
                <div className={styles.backDrop} onClick={()=>setIsShow(false)}></div>
                <div className={styles.sideMenuContainer}>
                    {children}
                </div>
            </div>
    )
}

export default SideMenuWrapper;

  