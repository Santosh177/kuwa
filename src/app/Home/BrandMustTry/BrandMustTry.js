
import styles from './brand-must-try.module.scss';



const BrandMustTry = () => {

    return(
        <>
        <div className={styles.headerTxt}>Brand You Must Try</div>
        <div className={styles.brandMustTry}>
                <div className={styles.item}>
                    <img className={styles.brandImg} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/Group+42236.png' alt='brand'/>
                    <div className={styles.btn}>
                        <div className={styles.txt}>UPTO</div>
                        <div className={styles.subTxt}>12% OFF</div>
                    </div>
                </div>
                <div className={styles.item}>
                    <img className={styles.brandImg} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/Group+42236.png' alt='brand'/>
                    <div className={styles.btn}>
                        <div className={styles.txt}>UPTO</div>
                        <div className={styles.subTxt}>12% OFF</div>
                    </div>
                </div>
                <div className={styles.item}>
                    <img className={styles.brandImg} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/Group+42236.png' alt='brand'/>
                    <div className={styles.btn}>
                        <div className={styles.txt}>UPTO</div>
                        <div className={styles.subTxt}>12% OFF</div>
                    </div>
                </div>
        </div>
       </>
    )
}


export default BrandMustTry;

  