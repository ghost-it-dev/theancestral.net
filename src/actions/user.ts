'use server';
import User, { UserInterface } from '@/src/models/User';
import { cookies, headers } from 'next/headers';
import dbConnect from '@/src/lib/dbConnection';
import Session, { SessionInterface } from '@/src/models/Session';
import mongoose from 'mongoose';
import { UserCreateData } from './validations/user';

// Return the user object if the user is logged in, otherwise return null
async function getUserFromSession(): Promise<Omit<UserInterface, 'password'> | null> {
  try {
    dbConnect();

    const sessionCookie = cookies().get('session')?.value;
    const isValidSession = mongoose.isValidObjectId(sessionCookie);

    const session = await Session.findOne({ _id: isValidSession ? sessionCookie : null });

    if (!session) return null;

    if (session?.userAgent !== headers().get('user-agent')) {
      await Session.findByIdAndDelete(sessionCookie);
      return null;
    }

    const user = await User.findById(session.userID).select(['-password']);

    if (!user) return null;

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    throw new Error('Failed to get user from session');
  }
}

// Return the role of the user making the request
async function getRequestRole(): Promise<UserInterface['role'] | 'guest'> {
  try {
    const user = await getUserFromSession();
    return user?.role || 'guest';
  } catch (error) {
    throw new Error('Failed to get request role');
  }
}

async function getUserById(_id: UserInterface['_id']): Promise<UserInterface> {
  try {
    dbConnect();

    const isValidPost = mongoose.isValidObjectId(_id);
    if (!isValidPost) throw new Error('Invalid post id');

    const user = await User.findOne({ _id }).select(['-password', '-session']);

    if (!user) throw new Error('User not found');

    return user;
  } catch (error) {
    throw new Error('Failed to get user by id');
  }
}

async function deleteUserById(_id: UserInterface['_id']): Promise<{ message: string }> {
  try {
    dbConnect();

    const reqRole = await getRequestRole();
    if (reqRole !== 'admin') return new Error('You do not have permission to delete this user');

    const user = await User.findOne({ _id });

    if (!user) return new Error('User not found');

    await User.findByIdAndDelete(_id);
    return { message: 'User successfully deleted' };
  } catch (error) {
    throw new Error('Failed to delete user by id');
  }
}

async function createUser(data: UserCreateData): Promise<{ message: string }> {
  try {
    dbConnect();

    const reqRole = await getRequestRole();
    if (reqRole !== 'admin') return new Error('You do not have permission to create a user');

    const user = new User({
      email: data.email,
      name: data.name,
      password: data.password,
      username: data.username,
      role: data.role,
    });

    await user.save();
    return { message: 'User successfully created' };
  } catch (error) {
    throw new Error('Failed to create user');
  }
}

async function getUserSessions(): Promise<SessionInterface[]> {
  try {
    dbConnect();

    const user = await getUserFromSession();
    const sessions = await Session.find({ userID: user?._id });

    return sessions;
  } catch (error) {
    throw new Error('Failed to get user sessions');
  }
}

async function invalidateSessionById(_id: SessionInterface['_id']): Promise<{ message: string }> {
  try {
    dbConnect();

    const session = await Session.findById(_id);
    if (!session) return new Error('Session not found');

    await Session.findByIdAndDelete(_id);
    return { message: 'Session successfully invalidated' };
  } catch (error) {
    throw new Error('Failed to invalidate session by id');
  }
}

export { getUserFromSession, createUser, getUserById, deleteUserById, getRequestRole };
