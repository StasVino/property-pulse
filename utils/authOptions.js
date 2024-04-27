import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  callbacks: {
    // Invoked on successful signin
    async signIn({ profile }) {
      // 1. connect to database
      // 2. check if user exist
      // 3. add to database if not
      // 4. login user
    },
    async session({ session }) {
      // 1. get user from databse
      // 2. assign session id to session
      // 3. return sesion
    },
  },
};
