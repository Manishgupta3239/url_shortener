// /app/api/auth/[...nextauth]/route.ts
import NextAuth, { Session  ,Token } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import ConnectDb from "@/lib/connection";
import { User } from "@/models/UserModel/user";
import { userType } from "../../../../../types/userType";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    
    async signIn({ user }:{user : userType}) {
      await ConnectDb();
      const existingUser = await User.findOne({ email: user.email });
      if (!existingUser) {
        await User.create({ email: user.email, name: user.name });
      }
      return true;
    },

    async jwt({token , user}:{token:Token , user?:userType}){
      await ConnectDb();
      const usr = await User.findOne({ email: user?.email });
      if (usr) {
        token._id = usr._id.toString();
        token.plan = usr.plan;
        token.createdAt = usr.createdAt;
        token.credits = usr.credits
      }
    
      return  token
    },

    async session({ session , token } :{session : Session ,token : Token}){
      if (session.user) {
         session.user._id = token._id as string;
        session.user.plan = token.plan;
        session.user.createdAt = token.createdAt;
        session.user.credits = token.credits
      }
      return session;
    },
    
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };


// import ConnectDb from "@/lib/connection";
// import { User } from "@/models/UserModel/user";
// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";

// export const GET = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,  // generate kar sakta hai, optional but recommended
//   callbacks:{
//       async signIn({user}){
//         await ConnectDb();
//         const existingUser = await User.findOne({email : user.email});

//         if(! existingUser){
//           await User.create({
//             email : user.email,
//             name : user.name
//           })
//           console.log("user created",user.email);
//         }else{
//           console.log("user already exists",existingUser.email);
//         }
//         return true
//       },

//       async session({session}){
//         await ConnectDb();
//         const user = await User.findOne({email : session.user?.email});
//         if(user){
//           session.user.plan = user.plan;
//           session.user._id = user._id.toString();
//           session.user.createdAt = user.createdAt;
//         }
//         return session
//       }
//   }
// });

// export const POST = GET;