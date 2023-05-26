"use client"

import React from "react"
import style from "./getBackForm.module.scss"

const GetBackForm = ()=>{
    return(
        <div className={style.getBackFormContainer}>
            <div className={style.getBackFormButton}><span>Get a call back</span></div>
        </div>
    )
}
export default GetBackForm