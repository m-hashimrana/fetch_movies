import React, { useRef } from 'react';
import classes from './AddMovie.module.css';

const AddMovie = ({ onAddMovie }) => {
	const titleRef = useRef('');
	const openingTexteRef = useRef('');
	const releaseDateRef = useRef('');
	const submitHandler = (e) => {
		e.preventDefault();
		const movie = {
			title: titleRef.current.value,
			openingText: openingTexteRef.current.value,
			releaseDate: releaseDateRef.current.value,
		};
		onAddMovie(movie);
		titleRef.current.value = '';
		openingTexteRef.current.value = '';
		releaseDateRef.current.value = '';
	};
	return (
		<form onSubmit={submitHandler}>
			<div className={classes.control}>
				<label htmlFor='title'>Title</label>
				<input type='text' id='title' ref={titleRef} />
			</div>
			<div className={classes.control}>
				<label htmlFor='opening-text'>Opening Text</label>
				<textarea rows='5' id='opening-text' ref={openingTexteRef}></textarea>
			</div>
			<div className={classes.control}>
				<label htmlFor='date'>Release Date</label>
				<input type='text' id='date' ref={releaseDateRef} />
			</div>
			<button>Add Movie</button>
		</form>
	);
};

export default AddMovie;
