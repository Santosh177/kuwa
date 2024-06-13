'use client'
import FooterData from './FooterData';
import styles from './footer.module.scss';
import { useLanguage } from '@/context/languageDetails';



const Categories = ({headerTitle,data=[]}) => {
    const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();

    return(
<div className={styles.categoriesWrapper}>
       <h3 className={styles.footerHeaderTxt}>{headerTitle}</h3>
       <ul className={styles.categoriesList}>
       {
        data.map((data,index)=>
        <li className={styles.categoryItem} key={index}><a href={data.url}>{isArabic ? data.nameArabic : data.name}</a></li>
            )
       }
         </ul>
    </div>
    )
    
}
const UsefulLinks = () => {
    const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();
    return(
        <div className={styles.usefulLinksWrapper}>
        <h3 className={styles.footerHeaderTxt}>{isArabic ? "روابط مفيدة" : "Useful Links"}</h3>
        <ul className={styles.usefulLinkList}>
        {
         FooterData['UsefulLinks'].map((data,index)=>
         <li className={styles.usefulLinkItem} key={index}><a href={data.url}>{isArabic ? data.nameArabic : data.name}</a></li>
             )
        }
          </ul>
        </div>
    )
  
}

const ContactInfo = () => {
    const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();
    return(
        <div className={styles.contactInfoWrapper}>
            <h3 className={styles.footerHeaderTxt}>{isArabic? "اتصل" : "Contact"}</h3>
            <div className={styles.contactIntoContainer}>
                <ul>
                {
                    FooterData['ContactInfo'].map((data,index)=>
                        <li className={styles.contactInfoItem} key={index}>
                            <span className={styles.contactInfoIcon}><img src={data.img}></img></span>
                            <div className={`${styles.contactInfoItemTxt} ${isArabic ? styles['contactInfoItemTxt-ar'] : styles['contactInfoItemTxt-en']}` }> {isArabic ? data.nameArabic : data.name}</div>
                        </li>
                        )
                    }
                </ul>
            </div>
            <SocialIcon/>
        </div>
    )
   
}

const SocialIcon = () => (
    <ul className={styles.socialIconWrapper}>
        {
            FooterData['SocialIcons'].map((data,index)=>
            <li className={styles.socialIconItem} key={index}><a href={data.url}><img className={styles.socialIconImg} src={data.icon}></img></a><span></span></li>
            )
        }
    </ul>
)

const CopyRightInfo = () => {
    const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();
return(
    <div className={styles.copyRightInfoWrapper}>
    <div className={styles.copyRightTxt}>{isArabic ? "حقوق النشر 2023 © جيت كوا" : "Copyright 2023 © GetKuwa"}</div>
    <img className={styles.copyRightCardImg} src='https://d25uasl7utydze.cloudfront.net/kuwa/card-info.png' alt='card-info' />
</div>
)
   
}

const Footer = () => {
    
    const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();
    return(
        <>
            <div className={styles.footerWrapper}>
                <div className={styles.footerContainer}>
                    <Categories headerTitle={isArabic ?"أهداف الصحة" : "HEALTH GOALS"} data={FooterData['HealthGoal']} />
                    <Categories headerTitle={isArabic ? "العلامات التجارية" : "BRANDS"} data={FooterData['Brands']} />
                    <UsefulLinks />
                    <ContactInfo />
                </div>
            </div>
            <CopyRightInfo />
        </>
   
    )



}


export default Footer;

  