'use client';
import { useRouter,useSearchParams } from 'next/navigation';
import styles from './brand-must-try.module.scss';
import ProductSlider from './ProductSlider/ProductSlider';



const BrandMustTry = ({data={}}) => {
    console.log("brands",data)
    const brand = data?.brand || [];
    const heading = data?.heading || ""
    const headingtWord = heading?.split(" ");
    const router = useRouter();
    return(
        <>
        {/* {data && data.length>0 &&<div className={styles.headerTxt}>Brand You Must Try</div>} */}
        {/* <div className={styles.brandMustTry}>

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
            {brand && brand.length > 0 && <div className={styles.brandHeader}>{headingtWord[0]} <span>{headingtWord?.slice(1).join(" ")}</span></div> }
        <div>
            <ProductSlider data={data}/>
        </div>
         
        
       </>
    )
}


export default BrandMustTry;

  