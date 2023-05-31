'use client';
import { useRef, useState, useEffect } from 'react';
import { useRouter,usePathname } from 'next/navigation';

import {  useCartItems } from '@/context/cartItems';
import {useCountryList} from '@/context/countryList';
import { useCountry } from '@/context/contryDetails';
import SideMenu from '../SideMenu/SideMenu';
import CountryList from '../CountryList/CountryList';
import SearchCard from '@/app/search/SearchCard/SearchCard';
import Loader from '../Loader/Loader';
import styles from './header.module.scss';

const SearchList = () =>{
    return(
        <div className={styles.searchListWrapper}>
                <div className={styles.resultFound}>15 Results found</div>
                {/* <div> */}
                    <SearchCard />
                    <SearchCard />
                    <SearchCard />
                    <SearchCard />
                    <SearchCard />
                    <SearchCard />
                    <SearchCard />
                    <SearchCard />
                    <SearchCard />
                    <SearchCard />
                    <SearchCard />
                    <SearchCard />
                    <SearchCard />
                    <SearchCard />
                    <SearchCard />
                    <SearchCard />
                    <SearchCard />
                    <SearchCard />

                {/* </div> */}
       
            </div>
    )
}


const Header = () => {
    const router = useRouter();
    const [ isShowSideMenu,setIsShowSideMenu] = useState(false);
    const {cartItemCount = 0} = useCartItems();
    const countryList = useCountryList();
    const {selectedCountry={},setSelectedCountry={}} = useCountry();
    const [isLoading , setIsLoading] = useState(false);
    const [isShowCountry, setIsShowCountry] = useState(false);
    const [searchTxt, setSearchTxt] = useState("");
    const inputBoxRef = useRef(null)
 

    const handleClickOutside = (event) =>{
        if (inputBoxRef.current && !inputBoxRef.current.contains(event.target)) {
            setSearchTxt("")
        }
    }
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [inputBoxRef]);
    

    const onSelectCountry = async(data) =>{
        setSelectedCountry(data);
        setIsLoading(true)
        const coutryApiResp = await fetch('/api/update-country', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body:JSON.stringify({countryId:data.id})
          })
        const coutryApiData = await coutryApiResp.json();
        setIsShowCountry(false)
        setIsLoading(false)
        router.refresh();
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
                            <img src={selectedCountry.flagIcon} alt='country-img'/>
                        </div>
                        <div className={styles.countryTxt}>{selectedCountry.shortName}</div>
                        <img className={styles.dropDownIcon} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/droppdown_icon_country.png' alt='drop-down-icon'/>
                    </div>
                    <div className={styles.searchIcon} onClick={()=>router.push('/search')}>
                        <img src="https://production-website-builds.s3.ap-south-1.amazonaws.com/assets/search.png" alt='search-icon'></img>
                    </div>
                    <div>
                    <div className={styles.searchInputWrapper}  >
                        <input ref={inputBoxRef} className={styles.searchInput} style={(searchTxt)?{borderBottomLeftRadius:'0px',borderBottomRightRadius:'0px'}:{}} value={searchTxt} onChange={(e)=>setSearchTxt(e.target.value)} placeholder='Search by product name' type='text' />
                        <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/search.png' alt='search-icon'/>
                    </div>
                    {searchTxt && <SearchList />}
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
        {isLoading && <Loader isShow={true} />}
        </>
    )



}


export default Header;

  