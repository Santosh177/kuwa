"use client"
import React from 'react'
import "./blogcategories.scss"
function CategoriesModal({setIsShowModal}) {
    let arr=[1,2,3,4,5,6,7,8,9,10]
   function hideCategotiesModal(){
    setIsShowModal(false)
    }
    function hideCategotiesModalOutside(e){

      if(e.target.className==="CategoriesModal-main"){
        setIsShowModal(false)
      }
      e.stopPropagation();
    }
    function hanlleCategoryData(categoryname){

      hideCategotiesModal();
    }
  return (
    <div className='CategoriesModal-main' onClick={(e)=>hideCategotiesModalOutside(e)}>
        <div className='CategoriesModal'>
          <div className='cat-txt'>Select Categories</div>
          <div className='cross-btn' onClick={()=>hideCategotiesModal()}>&#10005;</div>
          <div className='list-item-cont'>
          <ul>
            {
                arr.map((item,index)=>{
                    return(
                        <li
                        onClick={()=>hanlleCategoryData(item)}
                        >Beauty & skin</li>
                    )
                })
            }
          </ul>
          </div>
        </div>
    </div>
  )
}

export default CategoriesModal
