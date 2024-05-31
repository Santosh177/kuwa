'use client';
import React, { useState ,useEffect} from 'react';
import styles from './email-exist-popup.module.scss';
import Loader from '@/app/[lng]/components/Loader/Loader';
import Input from '@/app/[lng]/components/Input/Input';
import { isMobile, isTablet, isAndroid, isIOS } from 'react-device-detect';

const EmailExistPopUp = ({ setIsShowEmailExistPopUp, email }) => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [pageType, setPageType] = useState(getPageType())

  const mergeCartItems = async () => {
    try {
      const response = await fetch('/api/merge-cart-items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const mergecartItems = await response.json();
      console.log("mergecartItems", mergecartItems);
    } catch (err) {
      console.log("fetching the api error", err);
    } finally {
      setIsLoading(false); 
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setPageType(getPageType());
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function getPageType() {
    return window.innerWidth > 770 ? 'web' : 'mWeb';
  }

  const handleLogin = async () => {
    if(!password){
      setPasswordError("Please enter password");
      return;
    }
    function getDeviceType() {
      if (isMobile) {
        if (isAndroid) {
          return 'Android';
        } else if (isIOS) {
          return 'iOS';
        } else {
          return 'Mobile';
        }
      } else if (isTablet) {
        return 'Tablet';
      } else {
        return 'Desktop';
      }
    }
    try {
      setIsLoading(true);
      const deviceType = getDeviceType();
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'username': email,
          'password': password,
          'deviceType': deviceType,
          'pageType': pageType,
        }),
      });
      const loginResp = await res.json();
      console.log("loginResp",loginResp.data)

      if (loginResp.status === "SUCCESS") {
        mergeCartItems();
        if (loginResp.data.addressType === "single-address") {
          window.location.replace('/payment')
        }
        else if(loginResp.data.addressType == "multiple-address"){
          window.location.replace('/address/select-address');
        }
        else{
          window.location.href = '/address/add-address';
        }
      }
      else{
        setPasswordError("Incorrect password. Please try again.")
      }
    } catch (err) {
      console.log("fetching the api error", err);
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <>
      <div className={styles.EmailExistPopUpContainer}>
        <div className={styles.EmailExistPopUpContent}>
          <div className={styles.crossIcon} onClick={() => setIsShowEmailExistPopUp(false)}>
            <img src="https://d25uasl7utydze.cloudfront.net/assets/cross_icon%20(2).svg" alt="cross-icon" />
          </div>
          <div className={styles.emailTxt}>{email}</div>
          <div className={styles.existTxt}>Email already exists</div>
          <div className={styles.passwordTxt}>Enter password to login</div>
          <div className={styles.passwordInput}>
       <div className={styles.inputDiv}><Input className={styles.guestPassword} type='password'  value={password || ""} placeHolder='Password' onInputChange={(e)=>setPassword(e.target.value) }/></div> 
           {passwordError && <div className={styles.passwordError}>{passwordError}</div>}
          </div>
          <div className={styles.forgetPasswordTxt}onClick={()=> window.location.href='/forget-password'}>Forgot Password</div>
          <div className={styles.loginBtn} onClick={handleLogin}>Login</div>
        </div>
      </div>
      <Loader isShow={isLoading} />
    </>
  );
};

export default EmailExistPopUp;
