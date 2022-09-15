import { useEffect } from "react";

import {useWorkoutContext} from "../hooks/useWorkoutContext";

// import { getWorkouts } from "../api";
import { WorkoutDetails } from "../components/WorkoutDetails";
import { WorkoutForm } from "../components/WorkoutForm";

export const Home = () => {
	// const [workouts, setWorkouts] = useState(null);
	const { workouts, dispatch } = useWorkoutContext();
	useEffect(() => {
		const getWorkouts = async () => {
			const responseWorkouts = await fetch('/api/workouts');
			const jsonWorkouts = await responseWorkouts.json();

			if (responseWorkouts.ok) {
				// setWorkouts(jsonWorkouts);
				dispatch({ type: 'SET_WORKOUTS', payload: jsonWorkouts });
			}
		}
		getWorkouts();
	},[dispatch]);
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
