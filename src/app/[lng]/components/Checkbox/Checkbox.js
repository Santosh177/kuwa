import styles from './checkbox.module.scss';



const CheckBox = ({isChecked = false}) => {
    return (
        <div className={styles.checkboxContainer}>
          <input type="checkbox" checked={isChecked} />
          <span className={styles.checkmark}></span>
        </div>
      );
}


export default CheckBox;

  
