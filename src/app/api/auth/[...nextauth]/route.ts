import NextAuth from 'next-auth';

import { authOptions } from '@/lib/utils/authOptions';

// Export a standard API route handler
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
