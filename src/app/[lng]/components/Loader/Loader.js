'use client'
import styles from './loader.module.scss';

const Loader = ({isShow=false}) => {
    if(!isShow)
    return
     
    return(
        <div className={styles.loaderWrapper} >
            <div className={styles.loader}></div>
        </div> 
    )
}

export default Loader;

  