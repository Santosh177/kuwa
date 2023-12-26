'use client';
import { useRouter,useSearchParams } from 'next/navigation';
import styles from './brand-must-try.module.scss';



const BrandMustTry = ({data={}}) => {

    const router = useRouter();
    return(
        <>
        {/* {data && data.length>0 &&<div className={styles.headerTxt}>Brand You Must Try</div>}
        <div className={styles.brandMustTry}>

              {
                data.map((data,index)=>{
                    
                   const btnStyle={
                        background:data.color
                    }
                    return(
                        <div className={styles.item} onClick={()=>window.location.href = `/collections?category=${encodeURIComponent(data.brandName)}`} >
                            <img className={styles.brandImg} src={data.image} alt='brand'/>
                            <div className={styles.btn}  style={btnStyle}>
                                <div className={styles.txt} dangerouslySetInnerHTML={{ __html: data.offer}}></div>
                            </div>
                        </div>
                    )
                })
              }
        </div> */}
        {
          data && data.length>0 && 
          <div className={styles.brandHeader}>Brands <span>You Must Try</span></div>}
              <div className={styles.brandContent}>
          <div  className={styles.brandContainer} >
            {
                data.map((data,index)=>{
                    return(
                        // <div className={styles.brandSection}>
                        <div className={styles.brand} onClick={()=>window.location.href =`/collections?category=${encodeURIComponent(data.brandName)}`}>
                            <div className={styles.brandImg}>
                                <img src={data.image}></img>
                            </div>
                            {/* <div className={styles.brandName}>{data.brandName}</div> */}
                        </div>
                        // </div>
                    )
                })
            }
          </div> 
          </div>
        
       </>
    )
}


export default BrandMustTry;

  