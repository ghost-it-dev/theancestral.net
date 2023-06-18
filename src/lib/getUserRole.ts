import { NextRequest } from "next/server";
import User from "../models/User";

async function getUserRole(req: NextRequest) {
	const user = await User.findOne({ refreshToken: req.cookies.get('refreshToken')?.value });
	return user ? user.role : 'guest';
}

export default getUserRole;