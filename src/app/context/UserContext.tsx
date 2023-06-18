'use client'
import React, { createContext, useContext } from 'react';
import { User } from '../types/User';
import getUser from '../requests/user/getUser';

// Because we are casting an empty object as a User
// guests are users with an empty object instead of returning null
// isLoggedin is a boolean that can be used to check if the user is logged in
const UserContext = createContext<User>({ 'loggedIn': false } as User);
export const useUserContext = () => useContext(UserContext);

interface UserContextProviderProps {
	children: React.ReactNode;
}

// Just use getUser() in the future after axios is repalced with fetch, nextJS will dedupe the requests
const UserContextProvider: React.FC<UserContextProviderProps> = ({ children }) => {
	const { data: userData } = getUser();

	return (
		<>
			{/* If we get something from this request the user is logged in */}
			{userData ?
				<UserContext.Provider value={{ ...userData, 'loggedIn': true }}>{children}</UserContext.Provider>
				:
				children
			}
		</>
	);
};

export default UserContextProvider;