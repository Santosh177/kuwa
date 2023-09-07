"use client"
import React, { useState } from 'react'
import TrendingCard from './TrendingCard'
import "./blogCategories.scss"
import CategoriesModal from './CategoriesModal'

function BlogCategories() {
const [isShowModal,setIsShowModal]=useState(false);

    function openCategotiesModal(){
        setIsShowModal(true);
        console.log("select")
    }
    return (
        <div className='categories-main'>
            <div className='categories-cont'>
                <div className='select-cat-div'>
                    <div className='cat-txt' >Categories</div>
                    <div className='select-cat' onClick={()=>openCategotiesModal()}>
                        <span>Select categories</span> <span id='down-arrow'> &#8964; </span>
                    </div>
                </div>
                <TrendingCard />
                {
                    isShowModal?<CategoriesModal setIsShowModal={setIsShowModal}/>:""
                }
                
            </div>
        </div>
    )
}

export default BlogCategories
