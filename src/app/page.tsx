import LandingPage from '@/components/LandingPage'
import { getServerSession } from "next-auth/next";
import { userType } from "../../types/userType";
import { authOptions } from '@/lib/authOptions';


export default async function Home() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <div>
      <LandingPage user={user as userType} />
    </div>

  );
}
