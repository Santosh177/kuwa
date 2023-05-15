
import styles from './blogs.module.scss';




const BlogCard = () => {

    return(
        <div className={styles.blogCardItem}>
            <div className={styles.blogImg}>
                <img src="https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/Rectangle+28.png" alt="blogimg" />
            </div>
            <div className={styles.blogInfo}>
                <div className={styles.blogCategory}>Sport Nutrition</div>
                <div className={styles.blogTitle}>NAD-Boosting Supplements For Cellular Repair & Rejuvenation</div>
                <div className={styles.createdBy}>by Ankur Majumder <span className={styles.createdDate}>02/03/23</span></div>
            </div>
        </div>
    )

}






const Blogs = () => {

    return(
       <div className={styles.blogs}>
            <h3 className={styles.headerTxt}>Blogs </h3>
            <div className={styles.blogCardList}>
                <BlogCard />
                <BlogCard />
            </div>
           
            <div className={styles.seeAllBlogBtn}>
                <a href='/' className={styles.seeAllBlogTxt}>See all blogs</a>
            </div>


       </div>
   
    )



}


export default Blogs;

  