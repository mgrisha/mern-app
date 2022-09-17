import { useEffect } from "react";

import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { WorkoutDetails } from "../components/WorkoutDetails";
import { WorkoutForm } from "../components/WorkoutForm";
import { useAuthContext } from "../hooks/useAuthContext";

export const Home = () => {
	const { workouts, dispatch } = useWorkoutContext();
	const { user } = useAuthContext();

	useEffect(() => {
		const getWorkouts = async () => {
			const responseWorkouts = await fetch('/api/workouts', {
				headers: {
					'Authorization': `Bearer ${user.token}`
				}
			});
			const jsonWorkouts = await responseWorkouts.json();

			if (responseWorkouts.ok) {
				dispatch({ type: 'SET_WORKOUTS', payload: jsonWorkouts });
			}
		}
		if (user) {
			getWorkouts();
		}
	},[dispatch, user]);
	return (
		<div className="home">
			<div className="workouts">
				{workouts && workouts.map((workout) => (
					<WorkoutDetails key={workout._id} workout={workout} />
				))}
			</div>
			<WorkoutForm />
		</div>
	);
}
