'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SideMenuWrapper from '../SideMenuWrapper/SideMenuWrapper';
import { useAuth } from '../../context/userDetail';
import styles from './side-menu.module.scss';


const AccountInfo = () => {
    const router = useRouter();
    const {isLogin=false, userData={}} = useAuth();

    const userName = userData && userData.userName || "";


    const onRedirect = () => {
        if(!isLogin){
            router.push('/login')
        }
       
    }

    console.log("userNameuserName",userName)
    
    return(
        <div className={styles.accountInfoWrapper}>
            <img className={styles.profileIcon} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/assets/profile.png' alt='profile-icon'></img>
            <div className={styles.profileInfo} onClick={onRedirect}>
                <div className={styles.infoTxt}>Hi there,</div>
                {(isLogin)?<div className={styles.userName}>{userName}</div>:
                <div className={styles.notLoginTxt}>Sign Up / Login</div>}
            </div>
            <img className={styles.closeIcon} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/assets/cross_icon.png' alt='cross-icon'></img>
        </div>
    )
}


const SideMenuItemCard = ({data,onClick={}}) => {
    return(
        <div className={styles.sideMenuItemCard} onClick={()=>onClick(data.key)}>
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
}

const SideMenuData = ({onClick}) =>{


    const data = [
        {
            "icon":"https://production-website-builds.s3.ap-south-1.amazonaws.com/health.png",
            "txt": "Health goals",
            "subTxt":"Collagen, Digestion, Beauty & more",
            "key":"Health goals"
        },
        {
            "icon":"https://production-website-builds.s3.ap-south-1.amazonaws.com/health.png",
            "txt": "Brands",
            "subTxt":"Collagen, Digestion, Beauty & more",
            "key":"Brands"
        },
        {
            "icon":"https://production-website-builds.s3.ap-south-1.amazonaws.com/health.png",
            "txt": "For him",
            "subTxt":"Hair loss, Gym supplement, Skin & more ",
            "key":"For him"
        },
        {
            "icon":"https://production-website-builds.s3.ap-south-1.amazonaws.com/health.png",
            "txt": "For her",
            "subTxt":"Beauty, Skin, Perfect Hair, Workout & more",
            "key":"For her"
        },
        {
            "icon":"https://production-website-builds.s3.ap-south-1.amazonaws.com/health.png",
            "txt": "My Account",
            "subTxt":"Edit profile, Manage address, My orders",
            "key":"My Account" 
        }
    ]

    return(
        <>

                {
                    data.map((data,index)=>{
                        return(
                            <SideMenuItemCard data={data} onClick={onClick} key={index}/>
                        )
                    })
                }
        </>
    )
}


const OtherInfo = () =>{
    return(
        <div className={styles.OtherInfo}>
            <div className={styles.txt}>Blog</div>
            <div className={styles.infoLine}> | </div>
            <div className={styles.txt}>Contact Us</div>
            <div className={styles.infoLine}> | </div>
            <div className={styles.txt}>FAQ</div>
        </div>
    )
}


const LogOut = () =>{
    const router = useRouter();
    const onLogout = async() => {
        try {
            const res = await fetch('/api/logout', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              }
            })
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
        <div className={styles.logoutContainer} onClick={onLogout}>
            <img className={styles.logoutImg} src={'https://production-website-builds.s3.ap-south-1.amazonaws.com/logout.png'} alt='logout'/>
            <div className={styles.txt}>Logout</div>
        </div>
    )
}






const MyAccount = ({onBack={}}) =>{
    const router = useRouter()
    return(
        <div className={styles.myAccountContainer}>
            <div className={styles.myAccount}>
                    <div className={styles.headerTxt}>
                        <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/assets/back_arrow.png' alt='arrow-icon' onClick={()=>onBack()}/>
                        <div className={styles.txt}>My account</div>
                    </div>
                    <img className={styles.closeIcon}  src='https://production-website-builds.s3.ap-south-1.amazonaws.com/assets/cross_icon.png' alt='cross-icon'></img>
            </div>
            <div className={styles.item} onClick={()=>router.push('/my-account')}>Edit Profile</div>
            <div className={styles.item}>Manage address</div>
            <div className={styles.item}>My orders</div>
        </div>
       
    )
}

const SideMenu = ({children , isShowSideMenu}) => {
    const {isLogin=false, userData={}} = useAuth();
    const [ key , setKey ] = useState("")
    const onClick = (data) => {
            setKey(data)
    }



    const renderSideMenu =(key) => {
        switch (key) {
            case "My Account":
                return(
                    <MyAccount onBack={()=>setKey("")}/>
                )
            default:
                return(<>
                    <AccountInfo />
                    <SideMenuData onClick={onClick} />
                    <OtherInfo />
                    {isLogin && <LogOut />}
                </>)
        }
    }
    return(
        <SideMenuWrapper isShowSideMenu={true}>
            <>
            {
                    renderSideMenu(key)
                }
            </>
        </SideMenuWrapper>
    )
}

export default SideMenu;

  