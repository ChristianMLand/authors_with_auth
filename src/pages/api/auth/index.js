import withSessionRoute from "@/utils/session";
// making a request to /api/auth should return the logged in user if exists
async function handler(req, res) {
    res.send(req.session.user);
}

export default withSessionRoute(handler);