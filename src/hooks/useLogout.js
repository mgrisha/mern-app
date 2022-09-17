import { useAuthContext } from "./useAuthContext";
import { useWorkoutContext } from "./useWorkoutContext";

export const useLogout = () => {
	const { dispatch } = useAuthContext();
	const { dispatch: workoutsDispatch } = useWorkoutContext();

	const logout = () => {
		dispatch({ type: 'LOGOUT' });
		workoutsDispatch({ type: 'SET_WORKOUTS', payload: null });
		localStorage.removeItem('user');
	}

	return { logout };
}
