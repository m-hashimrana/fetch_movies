import './App.css';
import MovieList from './components/MovieList';
import { useCallback, useEffect, useState } from 'react';
import { HashLoader } from 'react-spinners';
import AddMovie from './components/AddMovie';

const override = {
	display: 'block',
	margin: '0 auto',
};
function App() {
	const [movies, setmovies] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchMoviesHandler = useCallback(async () => {
		setLoading(true);
		setError(null);

		try {
			// const response = await fetch('https://swapi.dev/api/films/');
			const response = await fetch('https://movie-collection-bd24c-default-rtdb.firebaseio.com/movies.json');

			if (!response.ok) {
				throw new Error('Something went wrong...!');
			}

			const data = await response.json();
			console.log('data from fetch', data);
			const loadedMovies = [];
			for (let key in data) {
				loadedMovies.push({
					id: key,
					title: data[key].title,
					openingText: data[key].openingText,
					releaseDate: data[key].releaseDate,
				});
			}

			// const transformedData = data.map((movie_data) => {
			// 	return {
			// 		id: movie_data.episode_id,
			// 		title: movie_data.title,
			// 		openingText: movie_data.opening_crawl,
			// 		releaseDate: movie_data.release_date,
			// 	};
			// });
			setLoading(false);
			setmovies(loadedMovies);
		} catch (error) {
			setError(error);
		}
		setLoading(false);
	}, []);

	useEffect(() => {
		fetchMoviesHandler();
	}, [fetchMoviesHandler]);

	const addMovieHandler = async (movie) => {
		const response = await fetch('https://movie-collection-bd24c-default-rtdb.firebaseio.com/movies.json', {
			method: 'POST',
			body: JSON.stringify(movie),
			headers: {
				'content-type': 'application/json',
			},
		});
		const data = await response.json();
		console.log('data', data);
	};

	return (
		<div className='App'>
			<section className='addMovieWrapper'>
				<AddMovie onAddMovie={addMovieHandler} />
			</section>
			<section className='fetchMovies'>
				<button onClick={fetchMoviesHandler}>Fetch Movies</button>
			</section>
			<section>
				{loading ? (
					<HashLoader cssOverride={override} />
				) : movies?.length > 0 ? (
					<MovieList movies={movies} />
				) : (
					<p> Empty List. Fetch to see list </p>
				)}
				{!loading && error && <h4>{error.message}</h4>}
			</section>
		</div>
	);
}

export default App;
