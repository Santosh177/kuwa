'use client';
import { useRef, useState, useEffect } from 'react';
import { useRouter,usePathname } from 'next/navigation';
// import { useAuth } from '../../context/userDetail';
import { useAuth } from '@/context/userDetail';
import {  useCartItems } from '@/context/cartItems';
import {useCountryList} from '@/context/countryList';
import { useCountry } from '@/context/contryDetails';
import SideMenu from '../SideMenu/SideMenu';
import CountryList from '../CountryList/CountryList';
// import SearchCard from '@/app/[lng]/search/SearchCard/SearchCard';
// import SearchCard from '../../search/SearchCard/SearchCard';
import Loader from '../Loader/Loader';
import styles from './header.module.scss';
import CouponInfo from '@/app/[lng]/Home/CouponInfo/CouponInfo';
import TrendingSearch from '@/app/[lng]/search/TrendingSearch/TrendingSearch';
import ProductCard from '../../search/ProductCard/ProductCard';
import { mappingHomeSearchDealProducts } from '@/services';
import { useLanguage } from '@/context/languageDetails';
import useCleverTapEvents from '@/hooks/useCleverTapEvents';
import { mixPanelTrackEvent } from '../../page';
import { saveSearchData } from '@/services';

const SearchList = ({ isShowSeeAllBtn=true, searchData = [], isLogin = false, couponBannerData={},searchQuery="",isNoResults ,isSearchLoading}) =>{
  const router = useRouter();
  const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();
  const lng = localStorage.getItem("selectedLanguage") || 'en'
 
  
    const searchDataCount = searchData && searchData.length || 0;
    const ProductIdList = searchData && searchData?.slice(0,12)?.map((data)=> data.id) || [];
    const productNameList = searchData && searchData?.slice(0,12)?.map((data) => data.productName) || [];
    console.log("searchData",searchData,searchQuery,ProductIdList)
    console.log("dqwkqh",isNoResults)
 
    const handleSeeAll=(couponBannerData,searchQuery)=>{
    const payloadForSaveData ={
      "source":"website",
      "search_key":searchQuery,
      "category":null,
      "sort_by":"relevance",
      "inStock":false,
      "noOfSearchResult":searchDataCount,
      "productId":"",
      "productName":"",
      "productFinalPrice":0,
      "productIdList":ProductIdList,
      "productNameList":productNameList
      }
    window.location.href=`/collections?search_key=${encodeURIComponent(searchQuery)}`
    saveSearchData(payloadForSaveData)
  }

  const style = isLogin
  ? {
      right: isArabic ? "-124px" : '173px',
      left: isArabic ? "0px" : "",
      paddingBottom: !isShowSeeAllBtn ? '' : '',
    }
  : {
      left: isArabic ? "" : 'unset',
      right: isArabic ? "unset" : "",
      paddingBottom: !isShowSeeAllBtn ? '' : '',
    };
    return(
      <div className={`${styles.searchListWrapper} ${isArabic ? styles['searchListWrapper-ar'] : ''}`} 
      // style={(isLogin) ? { right: isArabic ? '91px' :'173px' , paddingBottom: !isShowSeeAllBtn ? "" : "" } : { left: 'unset', paddingBottom: !isShowSeeAllBtn ? "" : "" }}
      style={style}>
                <div className={styles.resultFound}>
                  {isNoResults == "No results found"  ?
                   (<span>{isArabic ? "لم يتم العثور على نتائج" : "No Results Found" }</span>)
                   :
                   (searchDataCount > 0 && <span> {searchDataCount} {isArabic ? " تم العثور على نتائج" : "Results found"} </span>)
                   }
                </div>
                <div className={styles.productCardMain} 
                // style={{maxHeight:isShowSeeAllBtn?"":"522px"}}
                 >
                    {
                       searchData && searchData.length > 0 && searchData.slice(0,12).map((data, index)=>{

                          const { id = '', productImage="", productName="", seoUrl = '', title = '',finalPrice = '', retailPrice = '', currency = '', discount = '', discountType = '',dealId="" ,isDealActive="",isTimerActive="",tagIconUrl="",tag="",currentTimerStatus="",productNameArabic=""} = data || {};
                          // const {  } = price || {}
                          const cardData = {
                            productName: productName,
                            finalPrice: finalPrice,
                            retailPrice: retailPrice,
                            currency: currency,
                            discount: discount,
                            discountType: discountType,
                            image: productImage || "",
                            id: id || "",
                            seoUrl: seoUrl || "",
                            dealId:dealId,
                            isDealActive:isDealActive,
                            isTimerActive:isTimerActive,
                            tagIconUrl:tagIconUrl,
                            tag:tag,
                            currentTimerStatus:currentTimerStatus,
                            productNameArabic:productNameArabic
                          }
                            return(
                                <ProductCard cardData={cardData}searchQuery={searchQuery} />
                            )
                        })
                    }
                </div>
        {searchData && searchData.length>0  && <div id="search-container" className={styles.seeAll} onClick={() => handleSeeAll(couponBannerData, searchQuery)}>
                    {isArabic ? "استعرض الكل" : "See all"}
                </div>
        }    
        <Loader isShow ={isSearchLoading}/>   
            </div>
    )
}


const Header = ({ isShowSeeAllBtn=true, setParamsData}) => {
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
    const [isNoResults, setIsNoResults] = useState("")
    const [isSearchLoading, setIsSearchLoading] = useState(false)
    const inputBoxRef = useRef(null);
    const dropDownOptionsRef = useRef(null);
    const dropDownOptionsProfileRef = useRef(null);

    const [searchQuery, setSearchQuery] = useState('');
  const [apiData, setApiData] = useState(null);

  const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();

  const searchDataCount = searchData && searchData.length || 0;
  const ProductIdList = searchData && searchData?.slice(0,12)?.map((data)=> data.id) || [];
  const productNameList = searchData && searchData?.slice(0,12)?.map((data) => data.productName) || [];
  const otherLanguage = listOfLanguages.find(lang => lang.id !== selectedLanguage.id);
  const otherLanguageName = otherLanguage ? otherLanguage.language_name : '';

    const lng = localStorage.getItem("selectedLanguage") || 'en'
    const clevertapEvent = useCleverTapEvents()

  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      if (dropDownOptionsRef && dropDownOptionsRef.current && !dropDownOptionsRef.current.contains(e.target) && dropDownOptionsProfileRef && dropDownOptionsProfileRef.current && !dropDownOptionsProfileRef.current.contains(e.target)) {
        setIsOpenProfileInfo(false)
      }
    });

    try {
      window.dataLayer = window.dataLayer || [];
      function gtag() { dataLayer.push(arguments); }
      gtag('js', new Date());
      gtag('config', selectedCountry.code == "QA" ? 'G-8N5W1WCFQP' : 'G-9ZH5J03SH9'); 
      window.dataLayer.push({
          'event': 'pageview',
          'pagePath': window.location.pathname,
          'pageTitle': document.title
          // Add more data as needed
      });
  } catch (error) { 

  }
  }, [])

 

  console.log("searchDatasearchData",searchData)

  useEffect(() => {
    let timer;

    const makeApiCall = async () => {
      setIsSearchLoading(true)
      try {
        const countryId = selectedCountry && selectedCountry.id || "";
        const payload = {
          "source": "website",
          "searchKey": searchQuery,
          "categoryList": null,
          "sortBy":"relevance",
          "inStock": false,
          "deal_seo_url":null,
          "categorySeoList":null,
        }
        const searchApiResp = await fetch('/api/elastic-search',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        })

        const searchApiData = await searchApiResp.json();
        console.log("elasticsearchRes",searchApiResp,searchApiData)
        const {collectionDescription ,collectionDescriptionArabic,productVariantDtoList, message } = searchApiData || {}
        let searchData = []
        if(productVariantDtoList && productVariantDtoList.length > 0 ){
          setIsSearchLoading(false)
            searchData = []
            setIsNoResults("")
            productVariantDtoList.map((data,index)=>{
            
                if(data && Object.keys(data).length > 0){
                    const productData = mappingHomeSearchDealProducts(data);
                    searchData.push(productData);
                    setSearchData(searchData)
                }
               
            })

        }else{
          setIsSearchLoading(false)
            searchData.push([])
            setSearchData([])
            setIsNoResults(message)
        }
        // Process the API response here
        // setApiData(response.data);
      } catch (error) {
        setIsSearchLoading(false)
        console.error('API request failed:', error);
      }
    };

    if (searchQuery) {
      // Clear the previous timer if it exists
      if (timer) {
        clearTimeout(timer);
      }

      // Set a new timer to make the API call after a delay (e.g., 500 milliseconds)
      timer = setTimeout(makeApiCall, 1000);
    }
    // Cleanup the timer when the component unmounts
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [searchQuery]);


  useEffect(() => {
    const handleKeyDown = async (event) => {
      const payloadForSaveData = {
        "source": "website",
        "search_key": searchQuery,
        "category": null,
        "sort_by": "relevance",
        "inStock": false,
        "noOfSearchResult": searchDataCount,
        "productId": "",
        "productName": "",
        "productFinalPrice": 0,
        "productIdList": ProductIdList,
        "productNameList": productNameList,
      };
  
      if (event.key === 'Enter') {
        // Save the search data and redirect
        await saveSearchData(payloadForSaveData);
        window.location.href = `/collections?search_key=${encodeURIComponent(searchQuery)}`;
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
  
    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [searchQuery, searchData]);


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
                txt:"My Account",
                type: "My Account",
                typeId: null,
                subTxtArabic: "تعديل الملف الشخصي  إدارة العنوان طلباتي",
                txtArabic:"حسابي"
            }
            if(isLogin){
                getSideMenuData?.push(additionData)
            }else{
                let findMyOrderData =    {
                    icon: isArabic ? "https://d25uasl7utydze.cloudfront.net/assets/truck_green.svg" : "https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/truck.png",
                    id: 18,
                    img:null,
                    subTxt: "Track your order here",
                    txt: "Find My Order",
                    type: "Find my order",
                    typeId: null,
                    redirectionLink:'my/find-order',
                    subTxtArabic:"تتبّع طلبك هنا",
                    txtArabic:"ابحث عن طلبي"
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
        const trackData = {
          "Source Page URL": window.location.href,
        }
        clevertapEvent.onCleverTapEvent("kuwa_clicked_side_menu",trackData)
        if(isLogin){
          mixPanelTrackEvent("kuwa_clicked_side_menu",trackData,userData.id)
        }
        else{
          mixPanelTrackEvent("kuwa_clicked_side_menu",trackData)
        }
    }
    
    const onCloseCountry = () =>{
        setIsShowCountry(false)
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
      const trackData = {
        "Source Page URL":window.location.href
      }
      clevertapEvent.onCleverTapEvent("kuwa_clicked_search",trackData);
      if(isLogin){
        mixPanelTrackEvent("kuwa_clicked_search",trackData,userData.id)
      }
      else{
        mixPanelTrackEvent("kuwa_clicked_search",trackData)
      }
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


  const handleKeyPress = (event) => {
    if (event.key===' ') {
      if (setParamsData) {
        setIsShowSearchList(false);
        setParamsData((previous) => ({ ...previous, searchKey:searchQuery }));
      }
    }
  };

  useEffect(()=>{
    getCouponData();
  },[])

  const getCouponData = async() =>{
    const getCouponResp = await fetch(`${process.env.BACKEND_END_POINT_URL}/cms/coupon-banner?country=${selectedCountry.id || 8}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      }
    })
    const couponRespData = await getCouponResp.json();
    if(couponRespData && couponRespData.length > 0 ){
      setCouponBannerData(couponRespData[0])
      // if (setCouponBannerData){
      //   setCouponBannerData(couponRespData[0]);
      // }
    }
  
  }

  const getUserLanguage = async () => {
    
    try {
      const getLanguage = await fetch('/api/get-language', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const languageData = await getLanguage.json();
      console.log("getUserLanguage", getLanguage, languageData);
    } catch (error) {
      console.error("Error fetching language:", error);
    }
  };

  const  toggleLanguage = async() => {
    const newLanguageId = isArabic ? '1' : '2';
   await changeLanguage(newLanguageId);
   setIsLoading(true)
   console.log("userDetails", isLogin,userData)
    if(userData && Object.keys(userData).length > 0 ){
     await getUserLanguage()
    }
}

const getCartPage = ()=>{
  const trackData = {
    "Logged":isLogin
  }
  clevertapEvent.onCleverTapEvent("kuwa_view_cart",trackData);
  if(isLogin){
    mixPanelTrackEvent("kuwa_view_cart",trackData,userData.id)
  }
  else{
    mixPanelTrackEvent("kuwa_view_cart",trackData)
  }

  router.push('/cart')
}

const handleSearch = () =>{
  window.location.href=`/search`
  const trackData = {
    "Source Page URL":window.location.href
  }
  clevertapEvent.onCleverTapEvent("kuwa_clicked_search",trackData);
  if(isLogin){
    mixPanelTrackEvent("kuwa_clicked_search",trackData,userData.id)
  }
  else{
    mixPanelTrackEvent("kuwa_clicked_search",trackData)
  }
}

    return(
        <>
        
       {couponBannerData.isActive && <CouponInfo couponBannerData={couponBannerData} setCouponBannerData={setCouponBannerData} />}
        <div className={ styles.header} style={!couponBannerData.isActive?{top:"0px"}:{}} id='top-header-container' >
           <div className={styles.headerWrapper} id='top-header' >
                <d    iv className={styles.headerIcon}>
                    <div className={styles.menuIcon} onClick={onOpenSideMenu}>
                        <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/assets/menu.png' alt='menu-icon'/>
                    </div>
                    <div className={styles.logo} onClick={()=>window.location.href="/"}>
                        <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/assets/Group+2.png' alt='menu-icon'/>
                    </div>
                </d>
               
                <div className={styles.headerInfo}>
                    {/* <div className={styles.countryInfo} onClick={()=>setIsShowCountry(true)}>
                        <div className={styles.countryImg}>
                            <img src={selectedCountry.flagIcon} alt='country-img'/>
                        </div>
                        <div className={`${styles.countryTxt} ${isArabic ? styles['countryTxt-ar'] : styles['countryTxt-en']}` }> <span>{isArabic ? "البلد": "Country"}</span>{isArabic ? selectedCountry.shortNameArabic : selectedCountry.shortName}</div>
                        <img className={styles.dropDownIcon} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/droppdown_icon_country.png' alt='drop-down-icon'/>
                    </div> */}
                    <div className={styles.languageTxt} onClick={toggleLanguage}>{otherLanguageName}</div>



                    {/* <div className={styles.searchIcon} onClick={()=>router.push('/search')}>
                        <img src="https://production-website-builds.s3.ap-south-1.amazonaws.com/assets/search.png" alt='search-icon'></img>
                    </div> */}
                   
                    <>
                    <div className={styles.searchInputWrapper}  >
                  <input ref={inputBoxRef} className={styles.searchInput} style={(searchQuery)?{borderBottomLeftRadius:'',borderBottomRightRadius:''}:{}}value={searchQuery} onKeyPress={handleKeyPress} onChange={(e)=>
                    onSearch(e.target.value)} placeholder={isArabic ? "البحث بالاسم المنتج" : 'Search by product name'} type='text'/>
                        <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/search.png' alt='search-icon'/>
                    </div>
                {showTrendingSearch && !searchQuery && <TrendingSearch isLogin={isLogin} isShowSeeAllBtn={isShowSeeAllBtn} couponBannerData={(couponBannerData && couponBannerData.redirectionLink && couponBannerData)||couponBannerData } setParamsData={setParamsData} setSearchQuery={setSearchQuery} />}
                {(searchQuery && isShowSearchList) && <SearchList isShowSeeAllBtn={isShowSeeAllBtn} isLogin={isLogin} searchData={searchData} couponBannerData={(couponBannerData && couponBannerData.redirectionLink && couponBannerData) || couponBannerData} searchQuery={searchQuery} isNoResults={isNoResults}  isSearchLoading={isSearchLoading}/>}
                    </>
                    {!isLogin &&<div className={styles.profileIconPlus} onClick={()=>router.push('/login')}>
                        <img src="https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/profile_plus.png" alt='profile-plus-icon'></img><span>{isArabic ? "تسجيل الدخول" : "Login"}</span>
                    </div>}
                    {
                        isLogin && <div className={styles.profileIcon} ref={dropDownOptionsRef} onClick={()=>setIsOpenProfileInfo(!isOpenProfileInfo)}>
                                <img src="https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/profile.png" alt='profile-icon'></img>
                                <img style={(isOpenProfileInfo)?{}:{transform:'rotate(178deg)'}} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/dropdown+(1).png' alt='arrow-icon'></img>
                              
                        </div>
                    }

                   {isOpenProfileInfo && <div className={`${styles.profileInfoContainer} ${isArabic ? styles['profileInfoContainer-ar'] : styles['profileInfoContainer-en']}` }  ref={dropDownOptionsProfileRef} >
                        <div className={styles.profileInfo} onClick={(e)=>{e.preventDefault();window.location.href='/my-account'}}>{isArabic ? " تعديل الملف الشخصي" :"Edit Profile"}</div>
                        <div className={styles.profileInfo} onClick={()=>window.location.href='/address/manage-address'}>{isArabic ? " إدارة العنوان" : "Manage Address"}</div>
                        <div className={styles.profileInfo} onClick={()=>window.location.href='/my/orders'}>{isArabic ? "طلباتي" :"My Orders"}</div>
                    </div>}
                    
                   
                   
                    <div className={styles.cartIcon}  onClick = {getCartPage}>
                        <img src="https://production-website-builds.s3.ap-south-1.amazonaws.com/assets/cart.png" alt='cart-icon'></img><span>{isArabic? "سلة التسوق" : "Cart"}</span>
                        {cartItemCount > 0 && <div className={styles.cartCount}>{cartItemCount}</div>}
                    </div>
                </div>
                
           </div>

        </div>
        {((showTrendingSearch && !searchQuery) || (searchQuery && isShowSearchList)) && <div className={styles.searchOverlay}></div>}
        {isShowSideMenu&&<SideMenu sideMenuData={sideMenuData} onclose={()=>setIsShowSideMenu(!isShowSideMenu)}/>}
        {isShowCountry && <CountryList onSelectCountry={onSelectCountry} onclose={onCloseCountry}/>}
        {isLoading && <Loader isShow={true} />}
        <div className={styles.searchInputContainer} style={!couponBannerData.isActive?{top:"56px"}:{}}>
                        <div className={styles.searchInputWrapper} onClick={handleSearch} >
                            <input  className={styles.searchInput}  value={searchQuery}  placeholder={isArabic ? "البحث بالاسم المنتج" : 'Search by product name'} type='text' />
                            <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/search.png' alt='search-icon'/>
                        </div>
                    </div>
        </>
    )



}


export default Header;

  