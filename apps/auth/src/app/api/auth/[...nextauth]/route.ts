import NextAuth from "next-auth";

const handler: unknown = NextAuth({
    providers: [],
});

export { handler as GET, handler as POST }