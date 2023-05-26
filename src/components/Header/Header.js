'use client';
import { useState } from 'react';
import { useRouter,usePathname } from 'next/navigation';
import {  useCartItems } from '@/context/cartItems'
import SideMenu from '../SideMenu/SideMenu';
import styles from './header.module.scss';

const Header = () => {
    const router = useRouter();
    const [ isShowSideMenu,setIsShowSideMenu] = useState(false);
    const {cartItemCount = 0} = useCartItems()
    
    // console.log("cartItemCOuntcartItemCOunt",cartItemCount)
    return(
        <>
     
        <div className={styles.header}>

           <div className={styles.headerWrapper}>
                <div className={styles.headerIcon}>
                    <div className={styles.menuIcon} onClick={()=>setIsShowSideMenu(!isShowSideMenu)}>
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
                        {/* <img className={styles.dropDownIcon} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/droppdown.png' alt='drop-down-icon'/> */}
                    </div>
                    <div className={styles.searchIcon}>
                        <img src="https://production-website-builds.s3.ap-south-1.amazonaws.com/assets/search.png" alt='search-icon'></img>
                    </div>
                    <div className={styles.searchInputWrapper} >
                        <input className={styles.searchInput} placeholder='Search by product name' type='text' />
                        <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/search.png' alt='search-icon'/>
                    </div>
                    <div className={styles.cartIcon} onClick={()=>router.push('/cart')}>
                        <img src="https://production-website-builds.s3.ap-south-1.amazonaws.com/assets/cart.png" alt='cart-icon'></img>
                        {cartItemCount > 0 && <div className={styles.cartCount}>{cartItemCount}</div>}
                    </div>
                </div>
                
           </div>

        </div>
       {isShowSideMenu && <SideMenu isShowSideMenu={true}>
            <div onClick={()=>alert("uoi")}>dd</div>
        </SideMenu>}
        </>
    )



}


export default Header;

  