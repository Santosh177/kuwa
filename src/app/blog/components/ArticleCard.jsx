"use client"
// import React, { useState } from "react";
// import share from "../assets/svg/share.svg";
// import { getStringDateMonth } from "../../../utils";
import "./ArticleCard.scss";
import { useRouter } from 'next/navigation';
// import { useState } from "react";
// import SharePopUp from "../../../components/SharePopUp/SharePopUp.jsx";
// import {trackShareBlogBtn} from "../../../analytics/index";
// import React, { useState } from 'react';

const ArticleCard = ({ articleData = [], isArabic = false }) => {
    //   const [isShowShare, setIsShowShare] = useState(false);
    //   const [shareLink, setShareLink] = useState('')
    const router = useRouter()
    const minToReadTxt = (isArabic) ? "دقائق قراءة" : "min read";
    //  articleData=[{},{},{},{},{},{}]
     function handleCard(seoUrl){
        // {console.log("router");
            //  router.push(`/blog/article-page/${seoUrl}`)}
         window.location.href = `/blog/article-page/${seoUrl}`
        return ;
    }
    return (
        <>
            <div id="health_article_container" className="main">
                <div id="health_article_cards_div" className="cards">
                    {articleData && articleData.length>0 && articleData.map((value, index) => {
                        console.log("value",value)
                        // const sharevalue = isArabic ? `/ar/health-hub/article-page/${value.seoUrl}` : `/health-hub/article-page/${value.seoUrl}`;
                        // const handelOnclick = () => {
                        //     if (value && value.seoUrl) {
                        //         window.location.href = isArabic
                        //             ? `/ar/health-hub/article-page/${value.seoUrl}`
                        //             : `/health-hub/article-page/${value.seoUrl}`;
                        //     }
                        // };
                        // const handleAuthor = (authorId) => {
                        //     if (authorId) {
                        //         window.location.href = isArabic
                        //             ? `/ar/health-hub/author-profile/${authorId}`
                        //             : `/health-hub/author-profile/${authorId}`;
                        //     }
                        // };
                        return (
                            <div id={`article card ${value.healthHubCategory}`} className="card-item" key={index}
                            onClick={()=>handleCard(value.seoUrl)}
                            >
                                <div className="article-img"
                                //  onClick={() => handelOnclick()}
                                 >
                                    <img id={`article card ${value.healthHubCategory} img`} src={`${value.primaryImage}`} alt="article-image" />
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
                                            </div>
                                            <div id={`article card ${value.articleNameEnglish}`} className={`${(isArabic && "article-head-ar")} article-head`}>
                                                {(isArabic) ? value.articleNameArabic : value.articleNameEnglish}  
                                            </div>
                                            <div id={`article card ${value.healthHubCategory} description`} className={`${(isArabic && "article-cont-ar")} article-cont`}>
                                                {(isArabic) ? value.articleDescriptionArabic : value.articleDescriptionEnglish}
                                            </div>
                                            <div id={`article card ${value.healthHubCategory} category`} className="category-content">
                                                <div className="author-name" id="author-name">by {value.author && value.author.first_name + " " + value.author && value.author.last_name}</div>
                                                <div className="dot">
                                                    <div className="circle"></div>
                                                </div>
                                                <div id={`article card ${value.healthHubCategory} created`} className="created">
                                                    {/* {getStringDateMonth(value.createdAt)}
                                                     */}
                                                    {value.createdAt && value.createdAt.split("T")[0].split("-").reverse().join("-")}
                                                </div>
       
                                            </div>
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
        </>
    );
};

export default ArticleCard;