"use client"
import { useEffect, useState } from "react";
import "./trendingCard.scss";
import { useRouter } from 'next/navigation';
const TrendingCard = ({ articleData = [], isArabic = false }) => {
    const [pageNo, setPageNo] = useState(1);
    const [paginationNo, setPaginationNo] = useState();
    const [paginationData, setPaginationData] = useState([]);
    const router = useRouter()
    useEffect(() => {
        setPaginationData([...articleData.slice(0, 4)]);
    }, [])
    function nextHandleClick() {
        if (pageNo < Math.ceil(articleData.length / 4)) {
            const dummyData = articleData.slice((pageNo + 1 - 1) * 4, (pageNo + 1 - 1) * 4 + 4)
            setPaginationData([...dummyData])
            setPageNo(pageNo + 1);
        }

    }
    function prevHandleClick() {
        if (pageNo >= 2) {
            console.log("object")
            const dummyData = articleData.slice((pageNo - 1 - 1) * 4, (pageNo - 1 - 1) * 4 + 4)
            setPaginationData([...dummyData])
            setPageNo(pageNo - 1);
        }
    }
    function numHandleClick(index) {
        const dummyData = articleData.slice(index * 4, index * 4 + 4)
        console.log("dummy", dummyData)
        setPageNo(index + 1);
        setPaginationData([...dummyData])
    }
    console.log("paginationData", paginationData, articleData)
    function handleCard(item) {
        window.location.href = `/blog/article-page/${item.seoUrl}`
        return;
    }
    return (
        <>
            <div id="health_article_container" className="trending-main">
                <div id="health_article_cards_div" className="cards">
                    {articleData && articleData.length > 0 && articleData.map((value, index) => {
                        return (
                            <div id={`article card ${value.healthHubCategory}`} className="card-item" key={index}
                                onClick={() => handleCard(value)}>
                                <div className="article-img"
                                >
                                    <img id={`article card ${value.healthHubCategory} img`} src={`${value.primaryImage}`} alt="article-image" />
                                </div>
                                <div id={`article card ${value.healthHubCategory} content_details`} className="article-content">
                                    <div id={`article card ${value.healthHubCategory} info`} className="article-info">
                                        <div id={`article card ${value.healthHubCategory} content`} className="card-container"
                                        >
                                            <div id={`article card ${value.healthHubCategory}`} className={`${(isArabic && "categoryName-ar")} categoryName`}>
                                                {(isArabic) ? value.healthHubCategoryArabic : value.healthHubCategory}
                                            </div>
                                            <div id={`article card ${value.articleNameEnglish}`} className={`${(isArabic && "article-head-ar")} article-head`}>
                                                {(isArabic) ? value.articleNameArabic : value.articleNameEnglish}


                                            </div>
                                            <div id={`article card ${value.healthHubCategory} category`} className="category-content">
                                                <div id={`article card ${value.healthHubCategory} created`} className="created">
                                                    {/* {getStringDateMonth(value.createdAt)} */}
                                                    by {value.author && value.author.first_name + " " + value.author && value.author.last_name}
                                                </div>
                                                <div className="dot">
                                                    <div className="circle"></div>
                                                </div>
                                                <div id={`article card ${value.healthHubCategory} time`} className="time-read">
                                                    {/* {value.timeToRead + " " + `${minToReadTxt}`} */}
                                                    {value.createdAt && value.createdAt.split("T")[0].split("-").reverse().join("-")}
                                                </div>
                                            </div>
                                            <div id={`article card ${value.healthHubCategory} description`} className={`${(isArabic && "article-cont-ar")} article-cont`}>
                                                {(isArabic) ? value.articleDescriptionArabic : value.articleDescriptionEnglish}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="pagination-main">
                {articleData && articleData.length > 0 && <div className="prev-btn " onClick={() => prevHandleClick()}
                    style={{ disabled: pageNo == 1 ? true : false, color: pageNo == 1 ? "#D6D6D6" : "#07141A" }}
                > <span>&lt; </span>Previous</div>
                }
                {articleData && articleData.length > 0 && articleData.map((item, index) => {
                    console.log("hiii")
                    return index + 1 <= Math.ceil(articleData.length / 4) ? (
                        <div className={`num-btn ${pageNo == index + 1 ? "isActive-btn" : ""}`} onClick={() => numHandleClick(index)}>
                            <span style={{ color: pageNo == index + 1 ? "#FFF" : "" }}>{index + 1}</span>
                        </div>
                    ) : ""
                })}
                {articleData && articleData.length > 0 && <div className="next-btn" onClick={() => nextHandleClick()}
                    style={{ disabled: pageNo >= Math.ceil(articleData.length / 4) ? true : false, color: pageNo >= Math.ceil(articleData.length / 4) ? "#D6D6D6" : "#07141A" }}

                > Next  <span>&gt;</span></div>
                }
            </div>
        </>
    );
};

export default TrendingCard;