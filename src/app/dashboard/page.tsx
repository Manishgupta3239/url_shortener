
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { userType } from '../../../types/userType';
import UserDashboard from "@/components/UserDashboard";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  const user = session?.user as userType;

  return (
    <>
      <UserDashboard image={user.image || ""} />
      {/* {<ProDashboard user={user}/>} */}
    </>
  );
}
