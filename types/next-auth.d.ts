// types/next-auth.d.ts

declare module 'next-auth' {
  interface Session {
    user: {
      name?: string | null,
      email?: string | null,
       photo?: string | null,
      _id?: string,
      plan?: string,
      createdAt ? : Date
    };
  }
}
