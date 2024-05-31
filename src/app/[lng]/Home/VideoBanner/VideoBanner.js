'use client';
import './video-banner.scss';
import { useRouter} from 'next/navigation';
export default function VideoBanner({videoImage,videoDesktopImage,videoRedirection}) {
  const router = useRouter();

//   <video id="background-video" autoPlay loop muted poster="https://assets.codepen.io/6093409/river.jpg">
//   <source src="https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/pexels-pachon-in-motion-15424864-720x1280-30fps.mp4" type="video/mp4" />
// </video>
 
  return (
    <div id="video-banner-wrapper" onClick={()=>router.push(videoRedirection)}>
      <div id='mobileScreen'>
        <video id="background-video"  autoPlay loop muted >
          <source src={videoImage} type="video/mp4" />
        </video>
      </div>
      <div  id='desktopScreen' >
        <video id="background-video" autoPlay loop muted  >
          <source src={videoDesktopImage} type="video/mp4" />
        </video>
      </div>
    </div>

  )
}
