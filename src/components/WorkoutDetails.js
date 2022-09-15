// import {WorkoutContext} from "../context/WorkoutContext";
import {useWorkoutContext} from "../hooks/useWorkoutContext";

import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export const WorkoutDetails = (props) => {
	const workout = props.workout;
	const { dispatch } = useWorkoutContext();

	const handleDeleteWorkout = async () => {
		const response = await fetch('/api/workouts/' + workout._id, {
			method: 'DELETE'
		});
		const json = await response.json();
		if (response.ok) {
			dispatch({ type: 'DELETE_WORKOUT', payload: json });
		}
	}

	return (
		<div className="workout-details">
			<h4>{ workout.title }</h4>
			<p><strong>Load (kg): </strong>{ workout.load }</p>
			<p><strong>Reps: </strong>{ workout.reps }</p>
			<p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</p>
			<span className="material-symbols-outlined" onClick={handleDeleteWorkout}>Delete</span>
		</div>
	);
}
