export { default } from "next-auth/middleware";

// export withAuth({
//   // Matches the pages config in `[...nextauth]`
//   pages: {
//     signIn: "/signIn",
//   },
// });

export const config = {
  matcher: ["/((?!signUp|signIn|$).*)"],
};
