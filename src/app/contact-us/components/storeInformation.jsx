"use client"

import React from "react"
import style from "./storeInformation.module.scss"

const StoreInformation = () => {
    return (
        <div className={style.storeInformationContainer}>
            <div className={style.storeInformation}>Store Information</div>
            <div className={style.discription}>We'd love to hear from you - please use the form to send us your message or ideas. Or simply pop in for a cup of fresh tea and a cookie.</div>
            <div className={style.locationCotainer}>
                <div className={style.discriptionImg}><img src="https://d25uasl7utydze.cloudfront.net/kuwa/location%20(2).svg" alt="location" /></div>
                <div className={style.discriptionText}>1JLT-Nook-178 One JLT Plot No: DMCC-EZ1- 1AB,Jumeirah Lakes Towers, Dubai, UAE</div>
            </div>
            <div className={style.report}>
                <div className={style.reportImg} ><img src="https://d25uasl7utydze.cloudfront.net/kuwa/report_send%20(1).svg" alt="report" /></div>
                <div className={style.reportText}>Email: <span> supplements@feelvaleo.com</span><br /> Contact Number: <span>+971-585-44-8626</span> </div>
            </div>
            <div className={style.clock}>
                <div className={style.clockImg}><img src="https://d25uasl7utydze.cloudfront.net/kuwa/clock.svg" alt="report" /></div>
                <div className={style.clockText}>Monday to Saturday: 9am - 10pm <br /> Sundays: 10am - 6pm</div>
            </div>
        </div>
    )
}
export default StoreInformation

