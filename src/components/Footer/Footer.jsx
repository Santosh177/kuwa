
import FooterData from './FooterData';
import styles from './footer.module.scss';



const Categories = () => (
    <div className={styles.categoriesWrapper}>
       <h3 className={styles.footerHeaderTxt}>Categories</h3>
       <ul className={styles.categoriesList}>
       {
        FooterData['CategoriesData'].map((data,index)=>
        <li className={styles.categoryItem} key={index}><a href='/'>{data.name}</a></li>
            )
       }
         </ul>
    </div>
)

const UsefulLinks = () => (
    <div className={styles.usefulLinksWrapper}>
    <h3 className={styles.footerHeaderTxt}>Useful Links</h3>
    <ul className={styles.usefulLinkList}>
    {
     FooterData['UsefulLinks'].map((data,index)=>
     <li className={styles.usefulLinkItem} key={index}><a href={data.url}>{data.name}</a></li>
         )
    }
      </ul>
    </div>
)

const ContactInfo = () => (
    <div className={styles.contactInfoWrapper}>
        <h3 className={styles.footerHeaderTxt}>Contact</h3>
        <div className={styles.contactIntoContainer}>
            <ul>
            {
                FooterData['ContactInfo'].map((data,index)=>
                    <li className={styles.contactInfoItem} key={index}>
                        <span className={styles.contactInfoIcon}><img src={data.img}></img></span>
                        <div className={styles.contactInfoItemTxt}> {data.name}</div>
                    </li>
                    )
                }
            </ul>
        </div>
        <SocialIcon/>
    </div>
)

const SocialIcon = () => (
    <ul className={styles.socialIconWrapper}>
        {
            FooterData['SocialIcons'].map((data,index)=>
            <li className={styles.socialIconItem} key={index}><a href={data.url}><img className={styles.socialIconImg} src={data.icon}></img></a><span></span></li>
            )
        }
    </ul>
)

const CopyRightInfo = () => (
    <div className={styles.copyRightInfoWrapper}>
        <div className={styles.copyRightTxt}>Copyright 2023 © GetKuwa</div>
        <img className={styles.copyRightCardImg} src='https://d25uasl7utydze.cloudfront.net/kuwa/card-info.png' alt='card-info' />
    </div>
)

const Footer = () => {
    

    return(
        <>
            <div className={styles.footerWrapper}>
                <div className={styles.footerContainer}>
                    <Categories/>
                    <UsefulLinks />
                    <ContactInfo />
                </div>
            </div>
            <CopyRightInfo />
        </>
   
    )



}


export default Footer;

  