import withSessionRoute from "@/utils/session";

async function handler(req, res) {
    req.session.destroy();
    res.json({ message: "success" });
}

export default withSessionRoute(handler);