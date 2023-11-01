"use client"
import React from 'react'
import "./blogCategories.scss"
function CategoriesModal({setIsLoading,setArticleData,categoriesList,setIsShowModal}) {
   function hideCategotiesModal(){
    setIsShowModal(false)
    }
    function hideCategotiesModalOutside(e){

      if(e.target.className==="CategoriesModal-main"){
        setIsShowModal(false)
      }
      e.stopPropagation();
    }
    const  hanlleCategoryData=async(item)=>{
      try{
        setIsLoading(true)
        const seoName = item.seoUrl
        const categoryDataRes = await fetch(`${process.env.BACKEND_END_POINT_URL}/health-hub/article-category/${seoName}`);
        const categoryData = await categoryDataRes.json();
        const { healthHub=[] } = categoryData || {};
        if (healthHub && healthHub.length>0){
          setArticleData([...healthHub].slice(0,4))
        }else{
          setArticleData([]);
        }
        hideCategotiesModal();
        setIsLoading(false)

      }catch(error){
      console.log("Error while fetching article details ",error)
        setIsLoading(false)
      }
    }
  return (
    <div className='CategoriesModal-main' onClick={(e)=>hideCategotiesModalOutside(e)}>
        <div className='CategoriesModal'>
          <div className='cat-txt'>Select Categories</div>
          <div className='cross-btn' onClick={()=>hideCategotiesModal()}>&#10005;</div>
          <div className='list-item-cont'>
          <ul>
            {
              categoriesList && categoriesList.length>0 &&  categoriesList.map((item,index)=>{
                    return(
                        <li
                        onClick={()=>hanlleCategoryData(item)}
                      >{item.categoryNameEnglish}</li>
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
