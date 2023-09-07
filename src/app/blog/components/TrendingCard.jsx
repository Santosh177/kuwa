"use client"
// import React, { useState } from "react";
// import share from "../assets/svg/share.svg";
// import { getStringDateMonth } from "../../../utils";
import { useEffect, useState } from "react";
import "./trendingCard.scss";
// import { useRouter } from "next/router";
import { useRouter } from 'next/navigation';
// import { useState } from "react";
// import SharePopUp from "../../../components/SharePopUp/SharePopUp.jsx";
// import {trackShareBlogBtn} from "../../../analytics/index";
// import React, { useState } from 'react';

const TrendingCard = ({ articleData = [], isArabic = false }) => {

    //   const [isShowShare, setIsShowShare] = useState(false);
    //   const [shareLink, setShareLink] = useState('')
    const [pageNo, setPageNo] = useState(1);
    const [paginationNo, setPaginationNo] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
    const [paginationData,setPaginationData]=useState([]);
    const router = useRouter()
    const minToReadTxt = (isArabic) ? "دقائق قراءة" : "min read";
    articleData = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {},{}, {}, {}];
    useEffect(() => {
        setPaginationData(articleData.slice(0,4));
        // console.log("hello", Math.ceil(articleData.length / 4))
    }, [])
    console.log("paginationNo", paginationNo)
    function nextHandleClick(){
        if(pageNo<Math.ceil(articleData.length / 4)){
            const dummyData=articleData.slice((pageNo+1-1)*4,(pageNo+1-1)*4+4)
            setPaginationData([...dummyData])
            setPageNo(pageNo+1);
        }

    }
    function prevHandleClick(){
        if(pageNo>=2){
            console.log("object")
            const dummyData=articleData.slice((pageNo-1-1)*4,(pageNo-1-1)*4+4)
            setPaginationData([...dummyData])
            setPageNo(pageNo-1);
        }
    }
    function numHandleClick(index){
        const dummyData=articleData.slice(index*4,index*4+4)
        console.log("dummy",dummyData)
        setPageNo(index+1);
        setPaginationData([...dummyData])
    }
    console.log("paginationData",pageNo)
    function handleCard(){
        {console.log("router");
        router.push('/author-details')}
        return ;
    }
    return (
        <>
            <div id="health_article_container" className="trending-main">
                <div id="health_article_cards_div" className="cards">
                    {paginationData.map((value, index) => {
                        const sharevalue = isArabic ? `/ar/health-hub/article-page/${value.seoUrl}` : `/health-hub/article-page/${value.seoUrl}`;
                        const handelOnclick = () => {
                            if (value && value.seoUrl) {
                                window.location.href = isArabic
                                    ? `/ar/health-hub/article-page/${value.seoUrl}`
                                    : `/health-hub/article-page/${value.seoUrl}`;
                            }
                        };
                        const handleAuthor = (authorId) => {
                            if (authorId) {
                                window.location.href = isArabic
                                    ? `/ar/health-hub/author-profile/${authorId}`
                                    : `/health-hub/author-profile/${authorId}`;
                            }
                        };
                        return (
                            <div id={`article card ${value.healthHubCategory}`} className="card-item" key={index} 
                            onClick={()=>handleCard()}>
                                <div className="article-img"
                                //  onClick={() => handelOnclick()}
                                >
                                    <img id={`article card ${value.healthHubCategory} img`} src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGhZKbZlZxSmUCrkziF0Cjh8jWnAyXW2US-w&usqp=CAU`} alt="article-image" />
                                </div>
                                <div id={`article card ${value.healthHubCategory} content_details`} className="article-content">
                                    <div id={`article card ${value.healthHubCategory} info`} className="article-info">
                                        {/* <div id={`article card ${value.healthHubCategory} author_detail`} className="author-detail">
                      <div id={`article card ${value.healthHubCategory} author_div`}
                        className="auth-profile"
                        onClick={() => handleAuthor(value.author.id)}
                      >
                        <img  id={`article card ${value.healthHubCategory} author_img`}
                          src={value?.author?.image || ""}
                          alt="author-image"
                        />
                        <div id={`article card ${value.healthHubCategory} author_name`} className={`${(isArabic) && "auth-name-ar"} auth-name`}>
                          {value?.author?.first_name+" "+value?.author?.last_name || ""}
                        </div>
                      </div>
                      <div id={`article card ${value.healthHubCategory} share_icon_div`}
                        className="share-icon"
                        onClick={() => {
                          trackShareBlogBtn({pageName : window.location.pathname});
                          setShareLink(sharevalue);
                          setIsShowShare(true);
                          }}
                      >
                        <img id={`article card ${value.healthHubCategory} share_icon`}  src={share} alt="share-icon" />
                      </div>
                    </div> */}
                                        <div id={`article card ${value.healthHubCategory} content`} className="card-container"
                                        //  onClick={() => handelOnclick()}
                                        >
                                            <div id={`article card ${value.healthHubCategory}`} className={`${(isArabic && "categoryName-ar")} categoryName`}>
                                                {(isArabic) ? value.healthHubCategoryArabic : value.healthHubCategory}
                                                "hello brother"
                                            </div>
                                            <div id={`article card ${value.articleNameEnglish}`} className={`${(isArabic && "article-head-ar")} article-head`}>
                                                {/* {(isArabic) ? value.articleNameArabic : value.articleNameEnglish}
                                                 */}

                                                "nutritionlist"

                                            </div>
                                            <div id={`article card ${value.healthHubCategory} category`} className="category-content">
                                                <div id={`article card ${value.healthHubCategory} created`} className="created">
                                                    {/* {getStringDateMonth(value.createdAt)} */}
                                                    by Ankur Majumder
                                                </div>
                                                <div className="dot">
                                                    <div className="circle"></div>
                                                </div>
                                                <div id={`article card ${value.healthHubCategory} time`} className="time-read">
                                                    {/* {value.timeToRead + " " + `${minToReadTxt}`} */}
                                                    {/* "hello" */}
                                                    02/03/23
                                                </div>
                                            </div>
                                            <div id={`article card ${value.healthHubCategory} description`} className={`${(isArabic && "article-cont-ar")} article-cont`}>
                                                {(isArabic) ? value.articleDescriptionArabic : value.articleDescriptionEnglish}
                                                NAD-Boosting Supplements: The Key to Cellular Repair and Rejuvenation As we age...
                                            </div>
                                            {/* <div id={`article card ${value.healthHubCategory} category`} className="category-content">
                                                <div id={`article card ${value.healthHubCategory} created`} className="created">
                                                    {/* {getStringDateMonth(value.createdAt)} */}
                                                {/* </div>
                                                <div className="dot">
                                                    <div className="circle"></div>
                                                </div>
                                                <div id={`article card ${value.healthHubCategory} time`} className="time-read">
                                                    {value.timeToRead + " " + `${minToReadTxt}`}
                                                  
                                                </div>
                                            </div> */} 
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            {/* {isShowShare &&  */}
            {/* <SharePopUp shareLink={shareLink} setIsShare={setIsShowShare} isArabic={isArabic} /> */}
            {/* } */}
            <div className="pagination-main">
                <div className="prev-btn " onClick={()=>prevHandleClick()}
                style={{disabled:pageNo==1?true:false,color:pageNo==1?"#D6D6D6":"#07141A"}}
                > <span>&lt; </span>Previous</div>
                {articleData && articleData.length > 0 && articleData.map((item, index) => {
                    console.log("hiii")
                    return index+1<=Math.ceil(articleData.length / 4)?(
                        <div className={`num-btn ${pageNo==index+1?"isActive-btn":""}`} onClick={()=>numHandleClick(index)}>
                            <span style={{color:pageNo==index+1?"#FFF":""}}>{index + 1}</span>
                        </div>
                    ):""
                })}
                <div className="next-btn" onClick={()=>nextHandleClick() }
                 style={{disabled:pageNo>=Math.ceil(articleData.length / 4)?true:false,color:pageNo>=Math.ceil(articleData.length / 4)?"#D6D6D6":"#07141A"}}

                > Next  <span>&gt;</span></div>
            </div>
        </>
    );
};

export default TrendingCard;