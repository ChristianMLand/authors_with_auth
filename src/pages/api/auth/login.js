import User from "@/models/user.model";
import connect from '@/utils/connect';
import withSessionRoute from "@/utils/session";

async function handler(req, res) {
    if (req.method !== "POST")
        return res.status(404).json({ message: "404 not found" });

    await connect("authorsDB");

    try {
        const user = await User.login(req.body);
        req.session.user = user;
        await req.session.save();
        return res.json(user);
    } catch (error) {
        return res.status(401).json(error);
    }
}

export default withSessionRoute(handler);