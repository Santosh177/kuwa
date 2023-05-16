'use client';
import SideMenu from '../SideMenu/SideMenu';
import styles from './header.module.scss';

const Header = () => {
    

    return(
        <>
     
        <div className={styles.header}>

           <div className={styles.headerWrapper}>
                <div className={styles.headerIcon}>
                    <div className={styles.menuIcon}>
                        <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/assets/menu.png' alt='menu-icon'/>
                    </div>
                    <div className={styles.logo}>
                        <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/assets/Group+2.png' alt='menu-icon'/>
                    </div>
                </div>
               
                <div className={styles.headerInfo}>
                    <div className={styles.countryInfo}>
                        <div className={styles.countryImg}>
                            <img src='https://d2co62zyg9wi44.cloudfront.net/media/country_United%20Arab%20Emirates_1/Flag_UAE_-_Square.png' alt='country-img'/>
                        </div>
                        <div className={styles.countryTxt}>UAE</div>
                        {/* <div className={styles.dropDownIcon}>
                            <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/assets/Group+2.png' alt='drop-down-icon'/>
                        </div> */}
                    </div>
                    <div className={styles.searchIcon}>
                        <img src="https://production-website-builds.s3.ap-south-1.amazonaws.com/assets/search.png" alt='search-icon'></img>
                    </div>
                    <div className={styles.cartIcon}>
                        <img src="https://production-website-builds.s3.ap-south-1.amazonaws.com/assets/cart.png" alt='cart-icon'></img>
                    </div>
                </div>
                
           </div>

        </div>
        <SideMenu isShowSideMenu={true}>
            <div onClick={()=>alert("uoi")}>dd</div>
        </SideMenu>
        </>
    )



}


export default Header;

  