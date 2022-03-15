import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import MovieComponent from './components/MovieComponent';
import MovieInfoComponent from './components/MovieInfoComponent';
const API_KEY = 'aca005f';
const Container = styled.div`
  display:flex;
  flex-direction:column;
  
`;
const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: black;
  color: white;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0px 3px 6px 0 #555;
`;
const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
const MovieImage = styled.img`
width: 48px;
height: 48px;
margin: 15px;
`
const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  background-color: white;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  align-items: center;
`;
const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;
const SearchInput =styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
  width: calc(100% - 5px);
`;
const MovieListContainer =styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 24px;
  justify-content: space-evenly;
`;
const Placeholder = styled.img`
@media (max-width:500px) {
  margin-top: 30px;
}
  width: 120px;
  height: 120px;
  margin: 150px 50px 50px 50px;
  opacity: 50%;
`;
const Div = styled.div`
width: 90%;
  display: flex;
  align-items: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
`
function App() {
  const [searchQuery,updateSearchQuery] =useState();
  const [timeoutId, updateTimeoutId] = useState();
  const [movieList, updateMovieList] =useState([]);
  const [selectMovie, onMovieSelect] =useState();
  const fetchData =async (searchString) =>{
    const response = await axios.get(
      `
      https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}
      `
    );
    updateMovieList(response.data.Search);
  }

  const onTextChange =(event) =>{
    clearTimeout(timeoutId);
    updateSearchQuery(event.target.value);
    const timeout = setTimeout(() => fetchData(event.target.value),500);
    updateTimeoutId(timeout)
  }
  return <Container>
    <Header>
      <AppName>
        <MovieImage src="/movie-icon.svg"/>
        React Movie App
      </AppName>
      <SearchBox>
        <SearchIcon src='/search-icon.svg' />
        <SearchInput onChange={onTextChange} value={searchQuery} placeholder='Search Movie' />
      </SearchBox>
    </Header>
    {selectMovie && <MovieInfoComponent selectMovie={selectMovie} onMovieSelect={onMovieSelect}/>}
    <MovieListContainer>
      {
        movieList?.length
        ? movieList.map((movie, index) => <MovieComponent  key={index} movie={movie} onMovieSelect={onMovieSelect} /> )
        :(
          <Div>
            <Placeholder src='/movie-icon.svg' />
            <p> If you speak Spanish please when you writing the title of the movie in the search bar do it in English because the API its 
              based on English. If you are taping the title movie in Spanish don't will have a result</p>
          </Div>
        )}
    </MovieListContainer>
  </Container>

}

export default App;
