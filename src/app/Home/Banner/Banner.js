import styles from './banner.module.scss';
export default function Banner() {




  return (
    <>
      <div className={styles.mobBanner}>
        <img src="https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/top_banner_mobile.png" alt="top-banner"/>
      </div>
      <div className={styles.desktopBanner}>
        <img src="https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/top_banner_desktop.png" alt="top-banner"/>
      </div>
    </>

  )
}
