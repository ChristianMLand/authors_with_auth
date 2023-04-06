import { NextResponse } from "next/server";
import { getIronSession } from "iron-session/edge";

export const middleware = async req => {
    const res = NextResponse.next();
    const session = await getIronSession(req, res, {
        cookieName: "UserCookie",
        password: process.env.COOKIE_SECRET, // set in env file, must be at least 32 chars
        cookieOptions: { secure: process.env.NODE_ENV === "production" }
    });
    // redirect to login page if not logged in
    if (!session.user) return NextResponse.redirect(new URL('/', req.url));
    return res;
}

export const config = {
     // ensure user is logged in when visiting any of these routes
    matcher: [
        '/authors/:id*', 
        '/api/authors/:id*',
        '/api/users/:id+'
    ]
}