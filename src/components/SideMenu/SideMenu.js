'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SideMenuWrapper from '../SideMenuWrapper/SideMenuWrapper';
import { useAuth } from '../../context/userDetail';
import Loader from '../Loader/Loader';
import styles from './side-menu.module.scss';

const SideMenuData = ({title="" , data=[],onclose={},onBack={}}) => {


    return(
        <div className={styles.myAccountContainer}>
            <div className={styles.myAccount}>
                    <div className={styles.headerTxt}>
                        <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/assets/back_arrow.png' alt='arrow-icon' onClick={()=>onBack()}/>
                        <div className={styles.txt}>{title}</div>
                    </div>
                    <img className={styles.closeIcon} style={{top:'unset'}} onClick={onclose}  src='https://production-website-builds.s3.ap-south-1.amazonaws.com/assets/cross_icon.png' alt='cross-icon'></img>
            </div>
            {
                data.map((data,index)=>{
                    return(
                        <>
                            <div className={styles.item} key={index}>{data.name}</div>
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
    const userName = userData && userData.userName || "";
    const onRedirect = () => {
        if(!isLogin){
            router.push('/login')
        }
    }
    return(
        <div className={styles.accountInfoWrapper}>
            <img className={styles.profileIcon} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/assets/profile.png' alt='profile-icon'></img>
            <div className={styles.profileInfo} onClick={onRedirect}>
                <div className={styles.infoTxt}>Hi there,</div>
                {(isLogin)?<div className={styles.userName}>{userName}</div>:
                <div className={styles.notLoginTxt}>Sign Up / Login</div>}
            </div>
            <img className={styles.closeIcon} onClick={onclose} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/assets/cross_icon.png' alt='cross-icon'></img>
        </div>
    )
}



const MainMenuData = ({data,onClick}) =>{
    const {isLogin=false, userData={}} = useAuth();

    return(
        <>

                {
                    data.map((data,index)=>{
                        if(data.key == "My Account" && !isLogin)
                        return
                        return(
                            <div className={styles.sideMenuItemCard} onClick={()=>onClick({type:data.type,txt:data.txt})} key={index}>
                            <div className={styles.sideMenuItem}>
                                <img className={styles.icon} src={data.icon} alt=''/>
                                <div className={styles.itemInfo}>
                                    <div className={styles.itemTxt}>{data.txt}</div>
                                    <div className={styles.itemSubTxt}>{data.subTxt}</div>
                                </div>
                            </div>
                            <img className={styles.arrowIcon} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/next.png' alt='arrow-icon'/>
                        </div>
                        )
                    })
                }
        </>
    )
}


const OtherInfo = () =>{
    return(
        <div className={styles.OtherInfo}>
            {/* <div className={styles.txt}>Blog</div>
            <div className={styles.infoLine}> | </div> */}
            <div className={styles.txt}>Contact Us</div>
            <div className={styles.infoLine}> | </div>
            <div className={styles.txt}>FAQ</div>
        </div>
    )
}


const LogOut = () =>{
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
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
                router.refresh();
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
                <img className={styles.logoutImg} src={'https://production-website-builds.s3.ap-south-1.amazonaws.com/logout.png'} alt='logout'/>
                <div className={styles.txt}>Logout</div>
            </div>
            <Loader isShow={isLoading}/>
        </>
       
    )
}


const MyAccount = ({onBack={},onclose={}}) =>{
    const router = useRouter()
    return(
        <div className={styles.myAccountContainer}>
            <div className={styles.myAccount}>
                    <div className={styles.headerTxt}>
                        <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/assets/back_arrow.png' alt='arrow-icon' onClick={()=>onBack()}/>
                        <div className={styles.txt}>My account</div>
                    </div>
                    <img className={styles.closeIcon} style={{top:'unset'}} onClick={onclose}  src='https://production-website-builds.s3.ap-south-1.amazonaws.com/assets/cross_icon.png' alt='cross-icon'></img>
            </div>
            <div className={styles.item} onClick={()=>router.push('/my-account')}>Edit Profile</div>
            <div className={styles.horizontalLine}></div>
            <div className={styles.item}>Manage address</div>
            <div className={styles.horizontalLine}></div>
            <div className={styles.item}>My orders</div>
        </div>
       
    )
}

const SideMenu = ({onclose={}}) => {
    const {isLogin=false, userData={}} = useAuth();
    const [ key , setKey ] = useState("");
    const [ sideMenuData , setSideMenuData] = useState([]);
    const [ childMenuData , setChildMenuData ] = useState([]);
    const onClick = (data) => {
            setKey(data);
            getProductTypesData(data.txt)
    }

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
          const getSideMenuData = await getSideMenuDataResp.json();
          console.log("getSideMenuData",getSideMenuData)
          setSideMenuData(getSideMenuData);
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
            childMenuData.push({name:description.name,id:id})
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
                    <SideMenuData  title='Health goals' data={childMenuData}  onclose={onclose} onBack={()=>setKey("")}/>
                )
            case "Brands":
                return(
                    <SideMenuData  title='Brands' data={childMenuData}  onclose={onclose} onBack={()=>setKey("")}/>
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

  