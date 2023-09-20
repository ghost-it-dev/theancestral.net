'use server';
import User, { UserInterface } from '@/src/models/User';
import { cookies, headers } from 'next/headers';
import dbConnect from '@/src/lib/dbConnection';
import Session from '@/src/models/Session';
import mongoose from 'mongoose';
import { UserCreateData } from './validations/user';

// Return the user object if the user is logged in, otherwise return null
async function getUserFromSession(): Promise<Omit<UserInterface, 'password'> | null> {
  dbConnect();
  const sessionCookie = cookies().get('session')?.value;
  const isValidSession = mongoose.isValidObjectId(sessionCookie);
  const session = await Session.findOne({ _id: isValidSession ? sessionCookie : null });
  if (!session) return null;
  const user = await User.findById(session.userID).select(['-password']);

  if (session && session?.userAgent !== headers().get('user-agent')) {
    await Session.findByIdAndDelete(sessionCookie);
    return null;
  }

  if (!user) return null;
  return JSON.parse(JSON.stringify(user));
}

// Return the role of the user making the request
async function getRequestRole(): Promise<UserInterface['role'] | 'guest'> {
  const user = await getUserFromSession();
  return user?.role || 'guest';
}

async function getUserById(_id: UserInterface['_id']): Promise<UserInterface | { error: string }> {
  dbConnect();
  const isValidPost = mongoose.isValidObjectId(_id);
  if (!isValidPost) return { error: 'Invalid post id' };

  const user = await User.findOne({ _id }).select(['-password', '-session']);
  if (!user) return { error: 'User not found' };

  return user;
}

async function deleteUserById(_id: UserInterface['_id']): Promise<{ error?: string; message?: string }> {
  dbConnect();
  const reqRole = await getRequestRole();
  if (reqRole !== 'admin') return { error: 'You do not have permission to delete this user' };
  const user = await User.findOne({ _id });
  if (!user) return { error: 'User not found' };

  await User.findByIdAndDelete(_id);
  return { message: 'User succesfully deleted' };
}

async function createUser(data: UserCreateData): Promise<{ message?: string; error?: string }> {
  dbConnect();
  const reqRole = await getRequestRole();
  if (reqRole !== 'admin') return { error: 'You do not have permission to create a user' };

  const user = new User({
    email: data.email,
    name: data.name,
    password: data.password,
    username: data.username,
    role: data.role,
  });

  await user.save();
  return { message: 'User succesfully created' };
}

export { getUserFromSession, createUser, getUserById, deleteUserById, getRequestRole };
