import GoogleProvider from 'next-auth/providers/google';
import connectDB from '@/config/database';
import User from '@/models/User';

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
      await connectDB();
      // 2. check if user exist
      const userExists = await User.findOne({ email: profile.email });
      // 3. add to database if not
      if (!userExists) {
        // Truncate use name if too long
        const username = profile.name.slice(0, 20);
        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });
      }
      // 4. login user
      return true;
    },
    async session({ session }) {
      // 1. get user from databse
      const user = await User.findOne({ email: session.user.email });
      // 2. assign session id to session
      session.user.id = user._id.toString();
      // 3. return sesion
      return session;
    },
  },
};
