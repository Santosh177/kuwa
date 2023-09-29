import { useRouter } from 'next/navigation';
import SignUpHeader from './SignupHeader/SignUpHeader';
import SignupCard from './SignupCard/SignupCard';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation'
export default async function SignupPage() {


   
  const token = cookies().get('token');
  if(token && token.value){
    redirect("/")
  }

  
      return (
        <>
          <SignUpHeader />
          <SignupCard />
        
        </>
      )
    }
    