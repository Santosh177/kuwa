'use client';
import './video-banner.scss';
export default function VideoBanner({mobileImage,desktopImage,videoRedirection}) {


//   <video id="background-video" autoPlay loop muted poster="https://assets.codepen.io/6093409/river.jpg">
//   <source src="https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/pexels-pachon-in-motion-15424864-720x1280-30fps.mp4" type="video/mp4" />
// </video>
 const handleClick=()=>{

  window.location.href = videoRedirection;
  console.log(videoRedirection)
 }
  return (
    <div id="video-banner-wrapper" onClick={()=>handleClick()}>
      <div id='mobileScreen'>
        <video id="background-video"  autoPlay loop muted >
          <source src={mobileImage} type="video/mp4" />
        </video>
      </div>
      <div  id='desktopScreen' >
        <video id="background-video" autoPlay loop muted  >
          <source src={desktopImage} type="video/mp4" />
        </video>
      </div>
    </div>

  )
}
