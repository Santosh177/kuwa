'use client'
import { useEffect, useState } from 'react';
import styles from './side-menu-wrapper.module.scss';



const SideMenuWrapper = ({children,onclose={}}) => {
  
    return(
            <div className={styles.sideMenuWrapper}>
                <div className={styles.backDrop} onClick={()=>onclose()}></div>
                <div className={styles.sideMenuContainer}>
                    {children}
                </div>
            </div>
    )
}

export default SideMenuWrapper;

  