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
                <div className={styles.userName}>{(isLogin)?userName:'Login / Signup'}</div>
            </div>
            <img className={styles.closeIcon} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/assets/cross_icon.png' alt='cross-icon'></img>
        </div>
    )
}


const SideMenuItemCard = () => {
    return(
        <div className={styles.sideMenuItemCard}>
            <div className={styles.sideMenuItem}>
                <img className={styles.icon} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/health.png' alt=''/>
                <div className={styles.itemInfo}>
                    <div className={styles.itemTxt}>Health goals</div>
                    <div className={styles.itemSubTxt}>Collagen, Digestion, Beauty & more</div>
                </div>
            </div>
            <img className={styles.arrowIcon} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/next.png' alt='arrow-icon'/>
        </div>
    )
}

const SideMenuData = () =>{
    return(
        <>
            <SideMenuItemCard />
            <SideMenuItemCard />
            <SideMenuItemCard />
            <SideMenuItemCard />
            <SideMenuItemCard />
            <SideMenuItemCard />
            <SideMenuItemCard />
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


const SideMenuItem = () =>{
    const {isLogin=false, userData={}} = useAuth();
    return( 
        <>
         <AccountInfo />
                <SideMenuData />
                <OtherInfo />
                {isLogin && <LogOut />}
        </>

    )
}


const MyAccount = () =>{


    return(
        <div className={styles.myAccount}>
                <div className={styles.headerTxt}>
                    <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/assets/back_arrow.png' alt='arrow-icon'/>
                    <div className={styles.txt}>My account</div>
                </div>
                <img className={styles.closeIcon} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/assets/cross_icon.png' alt='cross-icon'></img>
        </div>
    )
}

const SideMenu = ({children , isShowSideMenu}) => {
    
    return(
        <SideMenuWrapper isShowSideMenu={true}>
            <>
               <SideMenuItem />
               {/* <MyAccount /> */}
            </>
        </SideMenuWrapper>
    )
}

export default SideMenu;

  