
import styles from './input.module.scss';
import React, { useState } from 'react';


/* 
type = "text"
fieldName = ""
value= ""
placeHolder = "",
isError = ""
errorMsg = "",
isEditable= true
style = {}
*/



const Input = ({onInputChange={},type="text",fieldName="",value="",placeHolder="",isError="",errorMsg="",isDisabled="",style={},icon={}}) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
      };

    return(
        <div className={styles.inputWrapper} style={...style}>
            <div className={styles.inputContainer}>
                <input  type={type === 'password' && showPassword ? 'text' : type} id={fieldName} name={fieldName} autoComplete='off'  value={value} onChange={(e)=>onInputChange(e,fieldName)}  disabled={isDisabled}/>
                <label className={styles.placeholderText}>
                    <div className={styles.text}>{placeHolder}</div>
                </label>
                {type === 'password' && (
        <div
          className={styles.eyeIcon}
          onClick={togglePasswordVisibility}
        >
          <img 
            src={showPassword ? icon.eyeOpen : icon.eyeClosed}
            alt="Toggle password visibility"
          />
        </div>
      )}
            </div>
         {isError && <span className={styles.errorMsg}>{errorMsg}</span>}
         </div>
       
    )

  



}


export default Input;

  