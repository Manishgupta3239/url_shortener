
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { userType } from '../../../types/userType';
import UserDashboard from "@/components/UserDashboard";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  const user = session?.user as userType; 

  return (
    <>
      <UserDashboard User={user}/>
      {/* {<ProDashboard user={user}/>} */}
    </>
  );
}
