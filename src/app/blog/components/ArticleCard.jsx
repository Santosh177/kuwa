"use client"
import "./ArticleCard.scss";
import { useRouter } from 'next/navigation';


const ArticleCard = ({ articleData = []}) => {
    //   const [isShowShare, setIsShowShare] = useState(false);
    //   const [shareLink, setShareLink] = useState('')
    const router = useRouter()
     function handleCard(seoUrl){
         window.location.href = `/blog/article-page/${seoUrl}`
        return ;
    }
    return (
        <>
            <div id="health_article_container" className="main">
                <div id="health_article_cards_div" className="cards">
                    {articleData && articleData.length>0 && articleData.map((value, index) => {
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
                                        <div id={`article card ${value.healthHubCategory} content`} className="card-container"
                                        //  onClick={() => handelOnclick()}
                                         >
                                            <div id={`article card ${value.healthHubCategory}`} className={`categoryName`}>
                                                { value.healthHubCategory}
                                            </div>
                                            <div id={`article card ${value.articleNameEnglish}`} className={`article-head`}>
                                                { value.articleNameEnglish}  
                                            </div>
                                            <div id={`article card ${value.healthHubCategory} description`} className={`article-cont`}>
                                                { value.articleDescriptionEnglish}
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
        </>
    );
};

export default ArticleCard;