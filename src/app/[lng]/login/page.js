
import LoginHeader from './component/LoginHeader/LoginHeader';
import LoginCard from './component/LoginCard/LoginCard';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation'

export default function LoginPage() {

  const token = cookies().get('token');
  if(token && token.value){
    redirect("/")
  }
  
      return (
        <>
          <div >
            <LoginHeader  />
            <LoginCard />
          </div>
        </>
      )
    }
    