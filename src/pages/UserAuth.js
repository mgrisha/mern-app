import { useState } from "react";
import { useAuthentication } from "../hooks/useAuthentication";

export const UserAuth = ({ textAuth, typeAuth }) => {
	const [email, setEmail] = useState('');
	const [pass, setPass] = useState('');
	const { authentication, error, isLoading } = useAuthentication();

	const authSubmitForm = async (e) => {
		e.preventDefault();
		await authentication(email, pass, typeAuth);
		setEmail('');
		setPass('');
	}

	return (
		<form className="auth--form" onSubmit={authSubmitForm}>
			<h3>{textAuth}</h3>
			<label htmlFor="auth-email">Email:</label>
			<input
				id="auth-email"
				type="email"
				onChange={e => setEmail(e.target.value)}
				value={email}
			/>
			<label htmlFor="auth-password">Password:</label>
			<input
				id="auth-password"
				type="password"
				onChange={e => setPass(e.target.value)}
				value={pass}
			/>
			<button disabled={isLoading}>{textAuth}</button>
			{ error && <div className="error">{error}</div> }
		</form>
	);
}
