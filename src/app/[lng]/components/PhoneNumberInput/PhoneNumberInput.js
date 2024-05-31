
import styles from './phone-number-input.scss';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'


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
{/* <PhoneInput
country={"ae"}
className={`${phoneErr && 'error-box-container'}`}
value={contactNo || ""}
onChange={(e,value) => handleInput(e,value, "phone-no")} */}

// value={contactNo}
// onChange={(value, data) => {
//   numberCheck(value, data);
// }}


const PhoneNumberInput = ({ countryCode="ae", onInputChange={},type="text",fieldName="",value="",placeHolder="phoneNumber *",isError="",errorMsg="",isDisabled="",style={}}) => {


    return(
        <div className={styles.inputWrapper} style={{...style}}>
           <PhoneInput
                    country={countryCode.toLowerCase()}
                    value={value}
                    onlyCountries={['ae','sa','kw','qa','om','bh','in']}
                    onChange={(phone,dialCode) => onInputChange(phone,fieldName,dialCode)}
                    placeholder='fieldName'
                    searchPlaceholder="ss"
                    />
         {isError && <span className={styles.errorMsg}>{errorMsg}</span>}
         </div>
       
    )

  



}


export default PhoneNumberInput;

  