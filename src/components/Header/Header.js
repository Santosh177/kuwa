'use client';
import { useState } from 'react';
import { useRouter,usePathname } from 'next/navigation';

import {  useCartItems } from '@/context/cartItems';
import {useCountryList} from '@/context/countryList';
import { useCountry } from '@/context/contryDetails';
import SideMenu from '../SideMenu/SideMenu';
import CountryList from '../CountryList/CountryList';
import styles from './header.module.scss';


const Header = () => {
    const router = useRouter();
    const [ isShowSideMenu,setIsShowSideMenu] = useState(false);
    const {cartItemCount = 0} = useCartItems();
    const countryList = useCountryList();
    const {selectedCountry={},setSelectedCountry={}} = useCountry();

    const [isShowCountry, setIsShowCountry] = useState(false);

    
    // console.log("cartItemCOuntcartItemCOunt",cartItemCount)

    const onSelectCountry = async(data) =>{
        setSelectedCountry(data);
        const coutryApiResp = await fetch('/api/update-country', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body:JSON.stringify({countryId:data.id})
          })
        const coutryApiData = await coutryApiResp.json();
        setIsShowCountry(false)
    }

    const onOpenSideMenu = () => {
        console.log("isShowSideMenu",isShowSideMenu)
        setIsShowSideMenu(!isShowSideMenu)
    }
    
    const onCloseCountry = () =>{
        setIsShowCountry(false)
    }

    return(
        <>
     
        <div className={styles.header}>

           <div className={styles.headerWrapper}>
                <div className={styles.headerIcon}>
                    <div className={styles.menuIcon} onClick={onOpenSideMenu}>
                        <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/assets/menu.png' alt='menu-icon'/>
                    </div>
                    <div className={styles.logo} onClick={()=>window.location.href="/"}>
                        <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/assets/Group+2.png' alt='menu-icon'/>
                    </div>
                </div>
               
                <div className={styles.headerInfo}>
                    <div className={styles.countryInfo} onClick={()=>setIsShowCountry(true)}>
                        <div className={styles.countryImg}>
                            <img src='https://d2co62zyg9wi44.cloudfront.net/media/country_United%20Arab%20Emirates_1/Flag_UAE_-_Square.png' alt='country-img'/>
                        </div>
                        <div className={styles.countryTxt}>{selectedCountry.name}</div>
                        {/* <img className={styles.dropDownIcon} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/droppdown.png' alt='drop-down-icon'/> */}
                    </div>
                    <div className={styles.searchIcon} onClick={()=>router.push('/search')}>
                        <img src="https://production-website-builds.s3.ap-south-1.amazonaws.com/assets/search.png" alt='search-icon'></img>
                    </div>
                    <div className={styles.searchInputWrapper}  >
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
        {isShowSideMenu&&<SideMenu  onclose={()=>setIsShowSideMenu(!isShowSideMenu)}/>}
        {isShowCountry && <CountryList onSelectCountry={onSelectCountry} onclose={onCloseCountry}/>}
        </>
    )



}


export default Header;

  