'use client';
import { useRouter } from 'next/navigation';
import SignUpHeader from './SignupHeader/SignUpHeader';
import SignupCard from './SignupCard/SignupCard';


export default function SignupPage() {

  const router = useRouter();


   

  
      return (
        <>
          <SignUpHeader />
          <SignupCard />
        
        </>
      )
    }
    