'use server';
import User, { UserInterface } from '@/src/models/User';
import { cookies, headers } from 'next/headers';
import dbConnect from '@/src/lib/dbConnection';
import Session from '@/src/models/Session';
import mongoose from 'mongoose';
import { UpdatePasswordData, UserCreateOrUpdateData } from './validations/user';
import argon2id from 'argon2';
import { revalidatePath } from 'next/cache';

// Return the user object if the user is logged in, otherwise return null
async function getUserFromSession(): Promise<Omit<UserInterface, 'password'> | null> {
  dbConnect();
  const sessionCookie = cookies().get('session')?.value;
  const isValidSession = mongoose.isValidObjectId(sessionCookie);
  const session = await Session.findOne({ _id: isValidSession ? sessionCookie : null });
  if (!session) return null;
  const user = await User.findById(session.userID).select(['-password']);

  // If the user agent doesn't match the session user agent, delete the session
  if (session && session?.userAgent !== headers().get('user-agent')) {
    await await Session.findByIdAndDelete(cookies().get('session')?.value);
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

async function updatePassword(
  data: UpdatePasswordData,
  _id: UserInterface['_id'],
): Promise<{ error?: string; message?: string }> {
  dbConnect();
  const reqUser = await User.findById(_id);
  if (!reqUser) return { error: 'You must be logged in to change your password' };

  const validPassword = await argon2id.verify(reqUser.password, data.currentPassword);
  if (!validPassword) return { error: 'Invalid password' };

  reqUser.password = data.newPassword;
  await reqUser.save();

  return { message: 'Password changed successfully' };
}

async function getAllUsers({ pageNumber, pageSize }: { pageNumber: number, pageSize: number }): Promise<{ users?: Omit<UserInterface, 'password'>[]; totalCount: number } | { error: string }> {
  dbConnect();
  const reqUser = await getUserFromSession();
  if (!reqUser || reqUser.role !== 'admin') return { error: 'You do not have permission to get all users' };

  const query: any = {};

  const totalPostsCount = await User.countDocuments(query);
  const users = await User.find(query)
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ updatedAt: -1 })
    .select(['-password']);

  return {
    users: JSON.parse(JSON.stringify(users)),
    totalCount: totalPostsCount,
  }
}

async function getUserById(_id: UserInterface['_id']): Promise<UserInterface | { error: string }> {
  dbConnect();
  const reqUser = await getUserFromSession();
  if (!reqUser || reqUser.role !== 'admin') return { error: 'You do not have permission to get this user' };

  const isValidPost = mongoose.isValidObjectId(_id);
  if (!isValidPost) return { error: 'Invalid post id' };

  const user = await User.findOne({ _id }).select(['-password', '-session']);
  if (!user) return { error: 'User not found' };

  return user;
}

async function updateUserById(_id: UserInterface['_id'], data: Partial<UserCreateOrUpdateData>): Promise<{ error?: string; message?: string }> {
  dbConnect();
  const reqUser = await getUserFromSession();
  if (!reqUser || reqUser.role !== 'admin') return { error: 'You do not have permission to update this user' };

  const user = await User.findOne({ _id });
  if (!user) return { error: 'User not found' };

  user.email = data.email || user.email;
  user.username = data.username || user.username;
  user.role = data.role || user.role;
  user.password = data.password || user.password;

  await user.save();
  return { message: 'User succesfully updated' };
}

async function deleteUserById(_id: UserInterface['_id']): Promise<{ error?: string } | undefined> {
  dbConnect();
  const reqUser = await getUserFromSession();
  if (!reqUser || reqUser.role !== 'admin') return { error: 'You do not have permission to delete this user' };
  if (reqUser._id === _id) return { error: 'You cannot delete your own account' };

  const user = await User.findOne({ _id });
  if (!user) return { error: 'User not found' };

  await User.findByIdAndDelete(_id);
  revalidatePath('/');
}

async function createUser(data: UserCreateOrUpdateData): Promise<{ message?: string; error?: string }> {
  dbConnect();
  const reqUser = await getUserFromSession();
  if (!reqUser || reqUser.role !== 'admin') return { error: 'You do not have permission to create a user' };

  const user = new User({
    email: data.email,
    password: data.password,
    username: data.username,
    role: data.role,
  });

  await user.save();
  return { message: 'User succesfully created' };
}

export { getUserFromSession, createUser, getUserById, deleteUserById, getRequestRole, updatePassword, getAllUsers, updateUserById };
