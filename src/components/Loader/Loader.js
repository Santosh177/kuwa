'use client'
import { useRouter } from 'next/navigation';
import styles from './loader.module.scss';

const Loader = ({isLoader=false}) => {


    

    if(!isLoader)
    return
     
    return(
        <div className={styles.loaderWrapper} >
            <div className={styles.loader}></div>
        </div> 
    )
}

export default Loader;

  