'use client';
import { useRef, useState, useEffect } from 'react';
import { useRouter,usePathname } from 'next/navigation';
import { useAuth } from '../../context/userDetail';
import {  useCartItems } from '@/context/cartItems';
import {useCountryList} from '@/context/countryList';
import { useCountry } from '@/context/contryDetails';
import SideMenu from '../SideMenu/SideMenu';
import CountryList from '../CountryList/CountryList';
import SearchCard from '@/app/search/SearchCard/SearchCard';
import Loader from '../Loader/Loader';
import styles from './header.module.scss';
import CouponInfo from '@/app/Home/CouponInfo/CouponInfo';
import TrendingSearch from '@/app/search/TrendingSearch/TrendingSearch';
import ProductCard from '@/app/search/ProductCard/ProductCard';
const SearchList = ({ isShowSeeAllBtn=true, searchData = [], isLogin = false, couponBanner={},searchQuery="" }) =>{
  const router = useRouter();
    const searchDataCount = searchData && searchData.length || 0;
  const handleSeeAll=(couponBanner,searchQuery)=>{
    window.location.href=`/collections?search_key=${searchQuery}`
  }

    return(
      <div className={styles.searchListWrapper} style={(isLogin) ? { right: '142px', paddingBottom: !isShowSeeAllBtn ? "" : "" } : { left: 'unset', paddingBottom: !isShowSeeAllBtn ? "" : "" }}>
                <div className={styles.resultFound}>
                  <span> {searchDataCount} Results found</span>
                </div>
                <div className={styles.productCardMain} 
                // style={{maxHeight:isShowSeeAllBtn?"":"522px"}}
                 >
                    {
                        searchData.map((data, index)=>{
                          const { id = '', productImage: image, productName:name, price = {}, seoUrl = '', title = '' } = data || {};
                          const { finalPrice = '', retailPrice = '', currency = '', discount = '', discountType = '' } = price || {}
                          const cardData = {
                            productName: name,
                            finalPrice: finalPrice,
                            retailPrice: retailPrice,
                            currency: currency,
                            discount: discount,
                            discountType: discountType,
                            image: image || "",
                            id: id || "",
                            seoUrl: seoUrl || ""
                          }
                            return(
                                <ProductCard cardData={cardData} />
                            )
                        })
                    }
                </div>
        {searchData && searchData.length>0  && <div id="search-container" className={styles.seeAll} onClick={() => handleSeeAll(couponBanner, searchQuery)}>
                    See all
                </div>
        }       
            </div>
    )
}


const Header = ({ isShowSeeAllBtn=true, couponBanner = {}, setParamsData}) => {
    const router = useRouter();
    const {isLogin=false, userData={}} = useAuth();
    const [ isShowSideMenu,setIsShowSideMenu] = useState(false);
    const {cartItemCount = 0} = useCartItems();
    const countryList = useCountryList();
    
    const {selectedCountry={},setSelectedCountry={}} = useCountry();
    const [isLoading , setIsLoading] = useState(false);
    const [isShowCountry, setIsShowCountry] = useState(false);
    const [ searchTxt, setSearchTxt] = useState("");
    const [isShowSearchList , setIsShowSearchList] = useState(false)
    const [ searchData , setSearchData] = useState([])
    const [ sideMenuData , setSideMenuData] = useState([]);
    const [isOpenProfileInfo, setIsOpenProfileInfo] = useState(false)
    const [isTopHeaderFixed, setIsTopHeaderFixed] = useState(false)
    const [showTrendingSearch,setShowTrendingSearch]=useState(false);
    const [couponBannerData,setCouponBannerData]=useState({});
    const inputBoxRef = useRef(null);
    const dropDownOptionsRef = useRef(null);
    const dropDownOptionsProfileRef = useRef(null);

    const [searchQuery, setSearchQuery] = useState('');
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      if (dropDownOptionsRef && dropDownOptionsRef.current && !dropDownOptionsRef.current.contains(e.target) && dropDownOptionsProfileRef && dropDownOptionsProfileRef.current && !dropDownOptionsProfileRef.current.contains(e.target)) {
        setIsOpenProfileInfo(false)
      }
    });
  }, [])

  console.log("searchDatasearchData",searchData)
  useEffect(() => {
    let timer;

    const makeApiCall = async () => {
      try {
        const countryId = selectedCountry && selectedCountry.id || "";
        const searchApiResp = await fetch(`${process.env.BACKEND_END_POINT_URL}/module/search/product/?key=${searchQuery}&country=${countryId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          })
        const searchApiData = await searchApiResp.json();
        let searchData = []
        if(searchApiData && searchApiData.length > 0 ){
            searchData = []
            searchApiData.map((data,index)=>{
                if(data && Object.keys(data).length > 0){
                    const productData = {
                        productImage : data.productImageUrl || "",
                        productName: data.name || "",
                        id: data.id || "",
                        seoUrl: data.seoUrl || "",
                        price:{
                          finalPrice: data.specialPrice,
                          retailPrice: data.price,
                          currency: data.currency,
                          discount: data.discount,
                          discountType: data.discountType,
                        }
                    }
                    searchData.push(productData);
                    setSearchData(searchData)
                }
               
            })

        }else{
            searchData.push([])
            setSearchData([])
        }
        // Process the API response here
        // setApiData(response.data);
      } catch (error) {
        console.error('API request failed:', error);
      }
    };

    if (searchQuery) {
      // Clear the previous timer if it exists
      if (timer) {
        clearTimeout(timer);
      }

      // Set a new timer to make the API call after a delay (e.g., 500 milliseconds)
      timer = setTimeout(makeApiCall, 500);
    }

    // Cleanup the timer when the component unmounts
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [searchQuery]);

  const onSearch = (event) => {

    setIsShowSearchList(true);
    setSearchQuery(event);
  };


    useEffect(()=>{
        getSideMenuData()
    },[])

    const getSideMenuData = async() => {
        const getSideMenuDataResp = await fetch('/api/side-menu', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          })
          let getSideMenuData = await getSideMenuDataResp.json();
          let additionData = 
            {
                icon: "https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/my_account.png",
                id: 18,
                img:null,
                subTxt: "Edit profile, Manage address, My orders",
                txt: "My Account",
                type: "My Account",
                typeId: null
            }
            if(isLogin){
                getSideMenuData.push(additionData)
            }else{
                let findMyOrderData =    {
                    icon: "https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/truck.png",
                    id: 18,
                    img:null,
                    subTxt: "Track your order here",
                    txt: "Find My Order",
                    type: "Find my order",
                    typeId: null,
                    redirectionLink:'my/find-order'
                }
                getSideMenuData.push(findMyOrderData)
            }
        
          setSideMenuData(getSideMenuData);
    }
 

    const handleClickOutside = (event) =>{
      if (inputBoxRef.current && !inputBoxRef.current.contains(event.target) && event.target && event.target.id != 'search-container') {
            // setSearchQuery("")
            setIsShowSearchList(false)
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
        window.location.href = '/'
    }

    const onOpenSideMenu = () => {
        console.log("isShowSideMenu",isShowSideMenu)
        setIsShowSideMenu(!isShowSideMenu)
    }
    
    const onCloseCountry = () =>{
        setIsShowCountry(false)
    }

    const onSearcha = async(searchValue) => {
        setSearchTxt(searchValue);
        	
        setIsShowSearchList(true);
        console.log("customHeadercustomHeader",selectedCountry)
        const countryId = selectedCountry && selectedCountry.id || "";
        const abortController = new AbortController();
        const searchApiResp = await fetch(`${process.env.BACKEND_END_POINT_URL}/module/search/product/?key=${searchValue}&country=${countryId}`, {
            method: 'GET',
            signal: abortController.signal,
            headers: {
              'Content-Type': 'application/json',
            }
          })
        const searchApiData = await searchApiResp.json();
        let searchData = []
        if(searchApiData && searchApiData.length > 0 ){
            searchData = []
            searchApiData.map((data,index)=>{
                const sData = data['product'] || {}
                if(sData){
                    const productData = {
                        productImage : sData.productImage && sData.productImage.productImageUrl || "",
                        productName: sData.productDescription && sData.productDescription.name || "",
                        id: sData.id || "",
                        seoUrl: data.seoUrl || ""
                    }
                    searchData.push(productData);
                    setSearchData(searchData)
                }
               
            })

        abortController.abort();
        }else{
            searchData.push([])
            setSearchData([])
        }
    }

    useEffect(() => {
      try {
        const elem = document.getElementById("homePage");
        if(elem){
          // elem.addEventListener('scroll', onScroll);
        }
      } catch (error) {
        
      }
    
     

  }, []);
  const handleOutsideClick = (event) => {
    if (inputBoxRef.current && !inputBoxRef.current.contains(event.target) && event.target && event.target.id != 'trending-search'){
      // Clicked outside the input box
      // Close the popup
     setShowTrendingSearch(false);
    }
    else{
      setShowTrendingSearch(true);
    }
  };

  useEffect(() => {
    // Attach event listener for clicks outside the input box
    document.addEventListener('click', handleOutsideClick);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);
  useEffect(()=>{
    if (window &&  window.location.search){
      const urlParams = new URLSearchParams(window.location.search);
      const queryParam = urlParams.get('search_key');
      if (queryParam){
        setSearchQuery(queryParam)
      }
    }
  },[])

  const onScroll = () => {
    try {
            const yscroll = document.getElementById('scoll-image').getBoundingClientRect().y;
            const topHeaderContainer = document.getElementById('top-header-container');
            const couponContainer = document.getElementById('coupon-container');
            if(topHeaderContainer || couponContainer ){
              if(yscroll < -80 ){
                topHeaderContainer.style.position = 'fixed';
                couponContainer.style.position = 'fixed';
              }else{
                topHeaderContainer.style.position = 'sticky'
                couponContainer.style.position = 'sticky';
              }
            }
      

    } catch (error) {

    }
}

  const handleKeyPress = (event) => {
    if (event.key==='Enter' || event.key===' ') {
      if (setParamsData) {
        setIsShowSearchList(false);
        setParamsData((previous) => ({ ...previous, searchKey:searchQuery }));
      }
    }
  };

    return(
        <>
        
        <CouponInfo couponBanner={couponBanner} setCouponBannerData={setCouponBannerData} />
        <div className={styles.header} id='top-header-container' >
           <div className={styles.headerWrapper} id='top-header' >
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
                    {/* <div className={styles.searchIcon} onClick={()=>router.push('/search')}>
                        <img src="https://production-website-builds.s3.ap-south-1.amazonaws.com/assets/search.png" alt='search-icon'></img>
                    </div> */}
                   
                    <>
                    <div className={styles.searchInputWrapper}  >
                  <input ref={inputBoxRef} className={styles.searchInput} style={(searchQuery)?{borderBottomLeftRadius:'',borderBottomRightRadius:''}:{}}value={searchQuery} onKeyPress={handleKeyPress} onChange={(e)=>
                    onSearch(e.target.value)} placeholder='Search by product name' type='text'/>
                        <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/search.png' alt='search-icon'/>
                    </div>
                {showTrendingSearch && !searchQuery && <TrendingSearch isLogin={isLogin} isShowSeeAllBtn={isShowSeeAllBtn} couponBanner={(couponBanner && couponBanner.redirectionLink && couponBanner)||couponBannerData } setParamsData={setParamsData} setSearchQuery={setSearchQuery} />}
                {(searchQuery && isShowSearchList) && <SearchList isShowSeeAllBtn={isShowSeeAllBtn} isLogin={isLogin} searchData={searchData} couponBanner={(couponBanner && couponBanner.redirectionLink && couponBanner) || couponBannerData} searchQuery={searchQuery} />}
                    </>
                    {!isLogin &&<div className={styles.profileIconPlus} onClick={()=>router.push('/login')}>
                        <img src="https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/profile_plus.png" alt='profile-plus-icon'></img>
                    </div>}
                    {
                        isLogin && <div className={styles.profileIcon} ref={dropDownOptionsRef} onClick={()=>setIsOpenProfileInfo(!isOpenProfileInfo)}>
                                <img src="https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/profile.png" alt='profile-icon'></img>
                                <img style={(isOpenProfileInfo)?{}:{transform:'rotate(178deg)'}} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/dropdown+(1).png' alt='arrow-icon'></img>
                              
                        </div>
                    }

                   {isOpenProfileInfo && <div className={styles.profileInfoContainer} ref={dropDownOptionsProfileRef} >
                        <div className={styles.profileInfo} onClick={(e)=>{e.preventDefault();window.location.href='/my-account'}}>Edit Profile</div>
                        <div className={styles.profileInfo} onClick={()=>window.location.href='/address/manage-address'}>Manage Address</div>
                        <div className={styles.profileInfo} onClick={()=>window.location.href='/my/orders'}>my Orders</div>
                    </div>}
                    
                   
                   
                    <div className={styles.cartIcon} onClick={()=>router.push('/cart')}>
                        <img src="https://production-website-builds.s3.ap-south-1.amazonaws.com/assets/cart.png" alt='cart-icon'></img>
                        {cartItemCount > 0 && <div className={styles.cartCount}>{cartItemCount}</div>}
                    </div>
                </div>
                
           </div>

        </div>
        {((showTrendingSearch && !searchQuery) || (searchQuery && isShowSearchList)) && <div className={styles.searchOverlay}></div>}
        {isShowSideMenu&&<SideMenu sideMenuData={sideMenuData} onclose={()=>setIsShowSideMenu(!isShowSideMenu)}/>}
        {isShowCountry && <CountryList onSelectCountry={onSelectCountry} onclose={onCloseCountry}/>}
        {isLoading && <Loader isShow={true} />}
        <div className={styles.searchInputContainer}>
                        <div className={styles.searchInputWrapper} onClick={()=>window.location.href="/search"} >
                            <input  className={styles.searchInput}  value={searchQuery}  placeholder='Search by product name' type='text' />
                            <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/search.png' alt='search-icon'/>
                        </div>
                    </div>
        </>
    )



}


export default Header;

  