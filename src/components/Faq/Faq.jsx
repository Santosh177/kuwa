"use client"
import React from "react";
import Collapsible from 'react-collapsible';
import style from './faq.module.scss';


const DropdownDown = <svg xmlns="http://www.w3.org/2000/svg" width="10.126" height="5.346" viewBox="0 0 10.126 5.346"><g transform="translate(-27.063 62.11)"><path d="M32.126-56.764l.428-.372,4.635-3.973-.855-1L32.126-58.5,27.919-62.11l-.855,1L31.7-57.136Z" fill="#32445b"/></g></svg>

const FaqInfo = ({question='',answer='' , isExpand = false, index }) => {
    return (
        <div className={style.faqContainer}>
            <Collapsible  open={index === 0} trigger={
                <div className={style.faqQuesContainer}>
                    <div className={style.faqQues}>{question}</div>
                    <span className={style.faqDropDownIcon}>{DropdownDown}</span>
                </div>
            }>
            <p id={"faq-ques-co"+index} className={style.faqAns}>{answer}</p>
            </Collapsible>  
        </div>
    )
}


const Faq = ({faqs=[]}) => {
    if(faqs && faqs.length === 0)
        return null
    return(
        <>
            {faqs && faqs.length > 0 && <div className={style.faqHeaderTxt} ></div>}
            <div className={style.faqWrapper}>
                {
                    faqs.map((data,index)=>{
                        const ques = data?.question || ""
                        const ans = data?.answer || ""
                        return(
                        <FaqInfo key={index} question={ques} answer={ans} isExpand index={index}/>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Faq; 