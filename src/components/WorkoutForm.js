import { useState } from "react";

import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";

export const WorkoutForm = () => {
	const { dispatch } = useWorkoutContext();
	const [title, setTitle] = useState('');
	const [load, setLoad] = useState('');
	const [reps, setReps] = useState('');
	const [error, setError] = useState(null);
	const [emptyFields, setEmptyFields] = useState([]);
	const { user } = useAuthContext();

	if (!user) {
		setError('You must be logged in');
		return;
	}

	const handlerSubmit = async (e) => {
		e.preventDefault();
		const workout = { title, load, reps };
		const response = await fetch('/api/workouts', {
			method: 'POST',
			body: JSON.stringify(workout),
			headers: {
				'Content-type': 'application/json',
				'Authorization': `Bearer ${user.token}`
			}
		});

		const json = await response.json();

		if (!response.ok) {
			setError(json.error);
			setEmptyFields(json.emptyFields);
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
			<input type="text" id="workoutTitle" value={title} onChange={(e) => setTitle(e.target.value)} className={emptyFields.includes('title') ? 'error' : ''} />
			<label htmlFor="workoutLoad">Load (in kg):</label>
			<input type="number" id="workoutLoad" value={load} onChange={(e) => setLoad(e.target.value)} className={emptyFields.includes('load') ? 'error' : ''} />
			<label htmlFor="workoutReps">Reps:</label>
			<input type="number" id="workoutReps" value={reps} onChange={(e) => setReps(e.target.value)} className={emptyFields.includes('reps') ? 'error' : ''} />
			<button>Add Workout</button>
			{ error && <div className="error">{error}</div> }
		</form>
	);
}
