
import styles from './input.module.scss';



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



const Input = ({onInputChange={},type="text",fieldName="",value="",placeHolder="",isError="",errorMsg="",isDisabled="",style={}}) => {


    return(
        <div className={styles.inputWrapper} style={...style}>
            <div className={styles.inputContainer}>
                <input type={type} id={fieldName} name={fieldName}  value={value} onChange={(e)=>onInputChange(e,fieldName)}  disabled={isDisabled}/>
                <label className={styles.placeholderText}>
                    <div className={styles.text}>{placeHolder}</div>
                </label>
            </div>
         {isError && <span className={styles.errorMsg}>{errorMsg}</span>}
         </div>
       
    )

  



}


export default Input;

  