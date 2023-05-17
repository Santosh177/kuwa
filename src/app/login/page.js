'use client';
import { useRouter } from 'next/navigation';
import LoginHeader from './component/LoginHeader/LoginHeader';
import LoginCard from './component/LoginCard/LoginCard';


export default function LoginPage() {

  const router = useRouter();


     const onLogin = async() =>{
     
      try {
        const res = await fetch('/api/login', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + "didToken",
          }
        })
        if (res.status === 200) {
          router.push('/')
        } else {
          throw new Error(await res.text())
        }
      } catch (error) {
        console.error('An unexpected error happened occurred:', error)
        setErrorMsg(error.message)
      }
     }

  
      return (
        <>

          <LoginHeader  />
          <LoginCard />

          {/* <div>{theme.isLogin}</div> */}
         
          {/* <div onClick={onLogin}> Login </div> */}
        </>
      )
    }
    