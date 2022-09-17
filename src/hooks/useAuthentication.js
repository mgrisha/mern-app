import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useAuthentication = () => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(null);
	const { dispatch } = useAuthContext();

	const authentication = async (email, password, typeAuth) => {
		setError(null);
		setIsLoading(true);

		const response = await fetch(`/api/user/${typeAuth}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password })
		});
		const json = await response.json();

		if (!response.ok) {
			setIsLoading(false);
			setError(json.error);
		}
		if (response.ok) {
			// save the user to localstorage
			localStorage.setItem('user', JSON.stringify(json));

			// update the auth context
			dispatch({ type: 'LOGIN', payload: json });

			setIsLoading(false);
		}
	}

	return { authentication, error, isLoading };
}
