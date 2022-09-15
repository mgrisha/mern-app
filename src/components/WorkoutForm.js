import { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";

export const WorkoutForm = () => {
	const { dispatch } = useWorkoutContext();
	const [title, setTitle] = useState('');
	const [load, setLoad] = useState('');
	const [reps, setReps] = useState('');
	const [error, setError] = useState(null);

	const handlerSubmit = async (e) => {
		e.preventDefault();
		const workout = { title, load, reps };
		const response = await fetch('/api/workouts', {
			method: 'POST',
			body: JSON.stringify(workout),
			headers: {'Content-type': 'application/json'}
		});

		const json = await response.json();

		if (!response.ok) {
			setError(json.error);
		}
		if (response.ok) {
			setError(null);
			setTitle('');
			setReps('');
			setLoad('');
			console.log('workout was added', json);
			dispatch({ type: 'CREATE_WORKOUT', payload: json });
		}

	}

	return (
		<form className="create" onSubmit={handlerSubmit}>
			<h3>Add a New Workout</h3>
			<label htmlFor="workoutTitle">Excersize Title:</label>
			<input type="text" id="workoutTitle" value={title} onChange={(e) => setTitle(e.target.value)} />
			<label htmlFor="workoutLoad">Load (in kg):</label>
			<input type="number" id="workoutLoad" value={load} onChange={(e) => setLoad(e.target.value)} />
			<label htmlFor="workoutReps">Reps:</label>
			<input type="number" id="workoutReps" value={reps} onChange={(e) => setReps(e.target.value)} />
			<button>Add Workout</button>
			{ error && <div className="error">{error}</div> }
		</form>
	);
}
