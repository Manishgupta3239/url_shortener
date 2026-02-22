import NextAuth from "next-auth/next";
import { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import ConnectDb from "@/lib/connection";
import { User } from "@/models/UserModel/user";

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      await ConnectDb();
      const existingUser = await User.findOne({ email: user.email });
      if (!existingUser) {
        await User.create({ email: user.email, name: user.name });
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        await ConnectDb();
        const usr = await User.findOne({ email: user.email });
        if (usr) {
          token._id = usr._id.toString();
          token.plan = usr.plan;
          token.createdAt = usr.createdAt;
          token.credits = usr.credits;
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user._id = token._id as string;
        session.user.plan = token.plan as string;
        session.user.createdAt = token.createdAt as Date;
        session.user.credits = token.credits as number;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };


// import NextAuth from "next-auth/next";
// import { authOptions } from "@/lib/authOptions";

// export const authOptions : NextAuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
//   callbacks: {
    
//     async signIn({ user }) {
//       await ConnectDb();
//       const existingUser = await User.findOne({ email: user.email });
//       if (!existingUser) {
//         await User.create({ email: user.email, name: user.name });
//       }
//        console.log(user , "chla on refresh signin");
//       return true;
//     },

//     async jwt({ token, user } : {token : JWT}) {
//   // On initial sign in
//   if (user) {
//     await ConnectDb();
//     const usr = await User.findOne({ email: user.email });
//     if (usr) {
//       token._id = usr._id.toString();
//       token.plan = usr.plan;
//       token.createdAt = usr.createdAt;
//       token.credits = usr.credits;
//       console.log("JWT ran on login:", token);
//     }
//   } else {
//     console.log("JWT ran on refresh, using existing token:", token);
//   }

//   return token;
// },

//     async session({ session , token } :{session : Session ,token : JWT}){
//       console.log(session , "session hai yeh")
//       if (session.user) {
//         session.user._id = token._id as string;
//         session.user.plan = token.plan as string ;
//         session.user.createdAt = token.createdAt as Date;
//         session.user.credits = token.credits as number
//         console.log(session , "chla on refresh session");
//       }
//       return session;
//     },
    
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };





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