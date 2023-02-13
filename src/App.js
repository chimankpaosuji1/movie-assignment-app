import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddSearch from './components/AddSearch';
import RemoveSearch from './components/RemoveSearch';

const App = () => {
	const [movies, setMovies] = useState([]);
	const [Search, setSearch] = useState([]);
	const [searchValue, setSearchValue] = useState('');

	const getMovieRequest = async (searchValue) => {
		const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=f2d079c`;
		console.log(searchValue);
		const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson.Search) {
			setMovies(responseJson.Search);
		}
	};
	console.log(searchValue);

	useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);

	useEffect(() => {
		const movieSearch = JSON.parse(
			localStorage.getItem('recent-search')
		);

		if (movieSearch) {
			setSearch(movieSearch);
		}
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('recent-search', JSON.stringify(items));
	};

	const addFavouriteMovie = (movie) => {
		const newFavouriteList = [...Search, movie];
		setSearch(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	const removeFavouriteMovie = (movie) => {
		const newFavouriteList = Search.filter(
			(favourite) => favourite.imdbID !== movie.imdbID
		);

		setSearch(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	return (
		<div className='container-fluid movie-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Movies' />
				<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
			</div>
			<div className='row'>
				<MovieList
					movies={movies}
					handleSearchClick={addFavouriteMovie}
					favouriteComponent={AddSearch}
				/>
			</div>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Recent Search' />
			</div>
			<div className='row'>
				<MovieList
					movies={Search}
					handleSearchClick={removeFavouriteMovie}
					favouriteComponent={RemoveSearch}
				/>
			</div>
		</div>
	);
};

export default App;
