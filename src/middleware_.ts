import { withAuth } from "next-auth/middleware";
// export const config = { matcher: ["/dashboard/:path*"] };

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      if (req)
        if (!token) {
        }
      return true;
    },
  },
});
