import { NextRequest } from "next/server";
import User from "../models/User";
import dbConnect from "./dbConnection";


async function getUser(req: NextRequest) {
	dbConnect();
	const user = await User.findOne({ refreshToken: req.cookies.get('refreshToken')?.value });

	return user
}

async function getUserRole(req: NextRequest) {
	dbConnect();
	const user = await User.findOne({ refreshToken: req.cookies.get('refreshToken')?.value });
	return user ? user.role : 'guest';
}


export { getUser, getUserRole };