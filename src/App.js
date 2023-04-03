import './App.css';
import MovieList from './components/MovieList';
import { useCallback, useEffect, useState } from 'react';
import { HashLoader } from 'react-spinners';

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
			const response = await fetch('https://swapi.dev/api/films/');

			if (!response.ok) {
				throw new Error('Something went wrong...!');
			}

			const data = await response.json();
			const transformedData = data.results.map((movie_data) => {
				return {
					id: movie_data.episode_id,
					title: movie_data.title,
					openingText: movie_data.opening_crawl,
					releaseDate: movie_data.release_date,
				};
			});
			setLoading(false);
			setmovies(transformedData);
		} catch (error) {
			setError(error);
		}
		setLoading(false);
	}, []);

	useEffect(() => {
		fetchMoviesHandler();
	}, [fetchMoviesHandler]);

	return (
		<div className='App'>
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
