'use client';
import { useRouter } from 'next/navigation';
import LoginHeader from './component/LoginHeader/LoginHeader';
import LoginCard from './component/LoginCard/LoginCard';


export default function LoginPage() {


  
      return (
        <>
          <div >
            <LoginHeader  />
            <LoginCard />
          </div>
        </>
      )
    }
    