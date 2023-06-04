
import styles from './brand-must-try.module.scss';



const BrandMustTry = ({data={}}) => {

    console.log("BrandMustTrydata",data)

    return(
        <>
        <div className={styles.headerTxt}>Brand You Must Try</div>
        <div className={styles.brandMustTry}>

              {
                data.map((data,index)=>{
                    return(
                        <div className={styles.item}>
                            <img className={styles.brandImg} src={data.image} alt='brand'/>
                            <div className={styles.btn}>
                                <div className={styles.txt} dangerouslySetInnerHTML={{ __html: data.offer}}></div>
                            </div>
                        </div>
                    )
                })
              }
        </div>
       </>
    )
}


export default BrandMustTry;

  