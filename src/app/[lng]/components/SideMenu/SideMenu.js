'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SideMenuWrapper from '../SideMenuWrapper/SideMenuWrapper';
// import { useAuth } from '../../context/userDetail';
import { useAuth } from '@/context/userDetail';
import Loader from '../Loader/Loader';
import styles from './side-menu.module.scss';
import { useLanguage } from '@/context/languageDetails';


const SideMenuData = ({title="" , data=[],onclose={},onBack={}}) => {
    const router = useRouter()

    const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();

        console.log("sidemenuData",data)
 

    return(
        <div className={styles.myAccountContainer}>
            <div className={styles.myAccount}>
                    <div className={styles.headerTxt}>
                        <img className={`${styles.sideImgArrow} ${isArabic ? styles['sideImgArrow-ar'] : styles['sideImgArrow-en']}` } src='https://production-website-builds.s3.ap-south-1.amazonaws.com/assets/back_arrow.png' alt='arrow-icon' onClick={()=>onBack()}/>
                        <div className={`${styles.txt} ${isArabic ? styles['txt-ar'] : styles['txt-en']}`}>{title}</div>
                    </div>
                    <img className={`${styles.closeIcon} ${isArabic ? styles['closeIcon-ar'] : styles['closeIcon-en']}` } style={{top:'unset'}} onClick={onclose}  src='https://production-website-builds.s3.ap-south-1.amazonaws.com/assets/cross_icon.png' alt='cross-icon'></img>
            </div>
            {
                data.map((data,index)=>{
                    if(!data.name)
                        return
                    return(
                        <>
                            <div onClick={()=>window.location.href =`/collections?category=${ isArabic ? encodeURIComponent(data.descriptionArabic) :   encodeURIComponent(data.name)}`} className={styles.item} key={index}>{data.name}</div>
                            <div className={styles.horizontalLine}></div>
                        </>
                    )
                })
            }
        </div>
    )
}



const AccountInfo = ({onclose}) => {
    const router = useRouter();
    const {isLogin=false, userData={}} = useAuth();
    const userName = userData && userData.firstName || "";
    const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();
    const [isLoading, setIsLoading] = useState(false);

    const otherLanguage = listOfLanguages.find(lang => lang.id !== selectedLanguage.id);
    const otherLanguageName = otherLanguage ? otherLanguage.language_name : '';
   
    const onRedirect = () => {
        if(!isLogin){
            router.push('/login')
        }
    }
    

   
    const  toggleLanguage = async() => {
        const newLanguageId = isArabic ? '1' : '2';
       await changeLanguage(newLanguageId);
       setIsLoading(true)

    }

    return(
        <>
        <div className={styles.accountInfoWrapper}>
            <img className={styles.profileIcon} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/assets/profile.png' alt='profile-icon'></img>
            <div className={styles.profileInfo}>
                <div className={styles.infoTxt}>{isArabic ? "مرحبًا," : "Hi there,"}</div>
                {(isLogin)?<div className={styles.userName}>{userName}</div>:
                <div className={styles.notLoginTxt}><span onClick={()=>router.push('/sign-up')}>{isArabic ? "التسجيل" : "Sign Up"}</span> / <span onClick={()=>router.push('/login')}>{isArabic ? " تسجيل الدخول" : "Login"}</span></div>}
            </div>
            <div className={styles.languageTxt} onClick={toggleLanguage}>{otherLanguageName}</div>
            <img className={`${styles.closeIcon} ${isArabic ? styles['closeIcon-ar'] : styles['closeIcon-en']}` } onClick={()=>onclose()} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/assets/cross_icon.png' alt='cross-icon'></img>
        </div>
        <Loader isShow={isLoading}/>
        </>
    )
}



const MainMenuData = ({data,onClick}) =>{
    const {isLogin=false, userData={}} = useAuth();
    const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();

    console.log("sideMainMenuData",data)
    return(
        <>

                {
                    data.map((data,index)=>{
                        console.log("sideMenu",data)
                        if(data.key == "My Account" && !isLogin)
                        return
                        return(
                            <div className={styles.sideMenuItemCard} onClick={()=>onClick({type:data.type,txt:data.txt,redirectionLink:data.redirectionLink || ""})} key={index}>
                            <div className={styles.sideMenuItem}>
                                <img className={styles.icon} src={data.icon} alt=''/>
                                <div className={`${styles.itemInfo} ${isArabic ? styles['itemInfo-ar'] : ''}`}>
                                    <div className={styles.itemTxt}>{isArabic ? data.txtArabic : data.txt}</div>
                                    <div className={styles.itemSubTxt}>{isArabic ? data.subTxtArabic : data.subTxt}</div>
                                </div>
                            </div>
                            <img className={`${styles.arrowIcon} ${isArabic ? styles['arrowIcon-ar'] : styles['arrowIcon-en']}` } src='https://production-website-builds.s3.ap-south-1.amazonaws.com/next.png' alt='arrow-icon'/>
                        </div>
                        )
                    })
                }
        </>
    )
}


const OtherInfo = () =>{
    const router = useRouter();
    const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();

    return(
        <div className={styles.OtherInfo}>
            {/* <div className={styles.txt}>Blog</div>
            <div className={styles.infoLine}> | </div> */}
            <div className={`${styles.txt} ${isArabic ? styles['txt-ar'] : styles['txt-en']}`} onClick={()=>window.location.href='/blog'}>{isArabic ? "المدونة" : "Blog"}</div>
            <div className={styles.infoLine}> | </div>
            <div className={`${styles.txt} ${isArabic ? styles['txt-ar'] : styles['txt-en']}`} onClick={()=>window.location.href='/contact-us'}>{isArabic ? "اتصل بنا" : "Contact Us"}</div>
            <div className={styles.infoLine}> | </div>
            <div className={`${styles.txt} ${isArabic ? styles['txt-ar'] : styles['txt-en']}`} onClick={()=>window.location.href='/terms-of-service'}>{isArabic ? "شروط الخدمة" :"Terms of Service"}</div>
        </div>
    )
}


const LogOut = () =>{
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();
    const onLogout = async() => {
        try {
            setIsLoading(true)
            const res = await fetch('/api/logout', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              }
            })
            setIsLoading(false)
            if (res.status === 200) {
                window.location.href = '/';
                try {
                    if(window && window.clevertap){
                        window && window.clevertap && window.clevertap.logout && window.clevertap.logout();
                        window && window.clevertap && window.clevertap.clear && window.clevertap.clear();
                    }
                   
                } catch (error) {
                    console.log(error,"error")
                }
            } else {
              throw new Error(await res.text())
            }
          } catch (error) {
            console.error('An unexpected error happened occurred:', error)
          }
    }
    return(
        <>
            <div className={styles.logoutContainer} onClick={onLogout}>
                <img className={`${styles.logoutImg} ${isArabic ? styles['logoutImg-ar'] : ''}`} src={'https://production-website-builds.s3.ap-south-1.amazonaws.com/logout.png'} alt='logout'/>
                <div className={`${styles.txt} ${isArabic ? styles['txt-ar'] : styles['txt-en']}`}>{isArabic ? "تسجيل الخروج" : "Logout"}</div>
            </div>
            <Loader isShow={isLoading}/>
        </>
       
    )
}


const MyAccount = ({onBack={},onclose={}}) =>{
    const router = useRouter()
    const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();
    return(
        <div className={styles.myAccountContainer}>
            <div className={styles.myAccount}>
                    <div className={styles.headerTxt}>
                        <img style={{transform: isArabic ? "rotate(180deg)" :""}} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/assets/back_arrow.png' alt='arrow-icon' onClick={()=>onBack()}/>
                        <div className={`${styles.txt} ${isArabic ? styles['txt-ar'] : styles['txt-en']}`}>{isArabic ? "حسابي" : "My account"}</div>
                    </div>
                    <img className={`${styles.closeIcon} ${isArabic ? styles['closeIcon-ar'] : styles['closeIcon-en']}`} style={{top:'unset'}} onClick={onclose}  src='https://production-website-builds.s3.ap-south-1.amazonaws.com/assets/cross_icon.png' alt='cross-icon'></img>
            </div>
            <div className={styles.item} onClick={()=>router.push('/my-account')}>{isArabic ? " تعديل الملف الشخصي" : "Edit Profile"}</div>
            <div className={styles.horizontalLine}></div>
            <div className={styles.item} onClick={()=>router.push('/address/manage-address')}>{isArabic ? " إدارة العنوان" : "Manage address"}</div>
            <div className={styles.horizontalLine}></div>
            <div className={styles.item} onClick={()=>router.push('/my/orders')} >{isArabic ? "طلباتي": "My orders"}</div>
        </div>
       
    )
}

const SideMenu = ({onclose={},sideMenuData=[]}) => {
    const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();

    const {isLogin=false, userData={}} = useAuth();
    const router = useRouter();
    const [ key , setKey ] = useState("");
    const [ childMenuData , setChildMenuData ] = useState([]);
    const onClick = (data) => {
        if(data && data.redirectionLink){
            // router.push(data.redirectionLink)
            window.location.href = data.redirectionLink
        }else{
            setKey(data);
            getProductTypesData(data.txt)
        }
         
    }



    const getProductTypesData = async(txt) => {
        let childMenuData = []
        const getProductTypeRes = await fetch('/api/product-types?super'+txt, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body:JSON.stringify({"superType":txt})
          })
          const getProductTypeData = await getProductTypeRes.json();
          console.log("getProductTypeData",getProductTypeData);
          getProductTypeData['list'].map((data,index)=>{
            const {description={} , id="" } = data || {}
            childMenuData.push({name:description && isArabic ? description.nameArabic : description.name,id:id})
          })
          setChildMenuData(childMenuData)
    }



    const renderSideMenu =(key) => {
        switch (key.txt) {
            case "My Account":
                return(
                    <MyAccount onBack={()=>setKey("")} onclose={onclose}/>
                )
            case "Health Goals":
                return(
                    <SideMenuData  title= {isArabic ? "الأهداف الصحية" : 'Health goals'} data={childMenuData}  onclose={onclose} onBack={()=>setKey("")}/>
                )
            case "Brands":
                return(
                    <SideMenuData  title={isArabic ? "العلامات التجارية" : 'Brands'} data={childMenuData}  onclose={onclose} onBack={()=>setKey("")}/>
                )
            default:
                return(<>
                    <AccountInfo  onclose={onclose} />
                        <MainMenuData data={sideMenuData} onClick={onClick}  />
                    <OtherInfo />
                    {isLogin && <LogOut />}
                </>)
        }
    }
    return(
        <SideMenuWrapper onclose={onclose}>
            <>
            {
                renderSideMenu(key)
            }
            </>
        </SideMenuWrapper>
    )
}

export default SideMenu;

  