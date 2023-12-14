'use Client';
import React, {useState}from 'react';
import styles from './account-details.module.scss';
import Input from "@/components/Input/Input";
import { useAuth } from '@/context/userDetail';



const AccountDetails = ({setIsSuccessPopup}) => {
  const [ password , setNewPassword ] = useState("");
    const [ repeatNewPassword, setRepeatNewPassword ] = useState("");
    const [passwordError, setPasswordError] = useState("");
  console.log("author",useAuth())

  const {isLogin=false , userData = {}} = useAuth();
  
  const email = userData?.emailAddress;
  const {firstName="",lastName,id="",newShippingAddress=""}   = userData || {}
  const {country="",mobNumber=""} = newShippingAddress || {};
  const name = `${firstName} ${lastName}`;
  const onInputChange =(e)=>{
    setNewPassword(e.target.value)
}


const handleCreateAccount = async () => {
  // if (!password || password.length < 8) {
  //   setPasswordError("Passwords need to be a min. of 8 characters");
  //   return;
  // }
  // if (password !== repeatNewPassword) {
  //   setPasswordError("Passwords do not match");
  //   return;
  // }
  const payload = {
    "username": email,
    "password": password
  };
  try {
    // const response = await fetch('/api/guest-login', {
    //   method: 'PATCH',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(payload),
    // });

    // if (!response.ok) {
    //   console.error(`Failed to update password. Status: ${response.status}`);
    //   return;
    // }

    // const responseData = await response.json();
    // console.log("guestResponse",responseData)

    setIsSuccessPopup(true);
    window.clevertap.onUserLogin.push({
      "Site": {
        "Name": name,            // String
        "Identity": id,              // String or number
        "Email": email,         // Email address of the user
        "Phone": mobNumber, 
        "Country":country,
        "MSG-email": true,                // Disable email notifications
        "MSG-push": true,                  // Enable push notifications
        "MSG-sms": true,                   // Enable sms notifications
        "MSG-whatsapp": true,              // Enable WhatsApp notifications
      },
      "cart_items": []
     })
     window.clevertap.event.push("kuwa_user_signup_success", {
      "Country":country,
      "Email":email,
      "Name": name,
      "Phone": mobNumber
    });
  } catch (error) {
    console.error('Error updating password:', error);
  }
};

  return (
    <div className={styles.accountContainer}>
    <div className={styles.headerTxt}>Complete creating an account</div>
    <div className={styles.container}>
        <div className={styles.icon}>
       
           <img src="https://d25uasl7utydze.cloudfront.net/assets/fast.svg"/> 
           <span>Faster Checkouts</span>
        </div>
        <div className={styles.icon}>
           
           <img src="https://d25uasl7utydze.cloudfront.net/assets/truck%20(1).svg"/> 
           <span>Order Tracking</span>
        </div>
        <div className={styles.icon}>
            
           <img src="https://d25uasl7utydze.cloudfront.net/assets/offer.svg"/> 
           <span>Exclusive Offers</span>
        </div>

    </div>
    <div className={styles.personalDetails}>
        <div className={styles.inputEmail}>
      <Input className={styles.guestEmail}type="email" fieldName="email" value={email}  placeHolder="Email ID (ex. abc@gmail.com)*" isDisabled={email}/>
      </div>
      <div className={styles.inputPassword}>
        <Input className={styles.guestPassword} type='password'  value={password || ""} placeHolder='Password' onInputChange={(e)=>onInputChange(e) }/>
        <Input className={styles.guestPassword} type='password' value={repeatNewPassword || ""} placeHolder='Confirm Password' onInputChange={(e) => setRepeatNewPassword(e.target.value)} />
     
      </div>
      {passwordError && <div className={styles.passwordError}>{passwordError}</div>}
   
    <div className={styles.btn} onClick={handleCreateAccount}>Create Account</div>     
    </div>    

    </div>
  )
}

export default AccountDetails