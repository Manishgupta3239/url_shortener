import LandingPage from '@/components/LandingPage'
import { getServerSession } from "next-auth/next";
import { authOptions } from './api/auth/[...nextauth]/route';


export default async function Home() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  
  return (
    <div>
      <LandingPage user={user}/>
    </div>
  
  );
}
