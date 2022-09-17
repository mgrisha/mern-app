import { createContext, useReducer } from "react";

export const AuthContext = createContext();

const initialState = {
	user: null
}

export const authReducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN':
			return {
				user: action.payload
			}
		case 'LOGOUT':
			return initialState;
		default:
			return state;
	}
}

export const AuthContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, initialState);

	console.log('AuthContext state >', state);

	return (
		<AuthContext.Provider value={{...state, dispatch}}>
			{ children }
		</AuthContext.Provider>
	);
}
