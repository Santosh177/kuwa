'use client';
import './video-banner.scss';
export default function VideoBanner() {


//   <video id="background-video" autoPlay loop muted poster="https://assets.codepen.io/6093409/river.jpg">
//   <source src="https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/pexels-pachon-in-motion-15424864-720x1280-30fps.mp4" type="video/mp4" />
// </video>

  return (
    <div id="video-banner-wrapper" onClick={()=>alert("Redirect to page")}>
      <div id='mobileScreen'>
        <video id="background-video"  autoPlay loop muted >
          <source src="https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/pexels-pachon-in-motion-15424864-720x1280-30fps.mp4" type="video/mp4" />
        </video>
      </div>
      <div  id='desktopScreen' >
        <video id="background-video" autoPlay loop muted  >
          <source src="https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/pexels-sapan-narula-4460336-1920x1080-25fps.mp4" type="video/mp4" />
        </video>
      </div>
    </div>

  )
}
