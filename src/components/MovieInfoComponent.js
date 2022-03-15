import { useEffect,useState } from "react";
import styled from "styled-components";
import axios from "axios";
const API_KEY = 'aca005f';
const Container = styled.div`
    display: flex;
    flex-direction: row;
    padding: 20px 30px;
    justify-content: center;
    border-bottom: 1px solid lightgray;
    @media  (max-width:468px){
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
}
`
const CoverImage = styled.img`
    height: 424px;
    object-fit: cover;
`;
const InfoColum =styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px;
`;
const MovieName = styled.span`
    font-size: 18px; 
    font-weight: 600;
    color: black;
    margin: 15px 0;
    white-space: nowrap;
    overflow: hidden ;
`
const MovieInfo = styled.span`
    font-size: 16px;
    font-weight: 500;
    color: black;
    overflow: hidden;
    margin: 4px 0;
    text-transform: capitalize;
    text-overflow: ellipsis;
    & span{
        opacity: 0.5;
    }
`
const Close = styled.span`
    font-size: 10px;
    font-weight: 600;
    color: black;
    background: lightgray;
    height: fit-content;
    padding: 8px;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0.8;
    @media screen {
     position: absolute;
        top: 10px;
        right: 12px;
    }
`

const MovieInfoComponent = (props) => {
    const[movieInfo,setMovieInfo] =useState();
    const {selectMovie} =props;
    useEffect(() => {
        axios.get(`https://www.omdbapi.com/?i=${selectMovie}&apikey=${API_KEY}`)
        .then((response) =>setMovieInfo(response.data));
    },[selectMovie])
    return(
     <Container id="infoMovie">
         {movieInfo?<>
            <CoverImage src={movieInfo?.Poster}/>
        <InfoColum>
            <MovieName>{movieInfo?.Type}: {movieInfo?.Title}</MovieName>
            <MovieInfo>IMDB Rating : <span>{movieInfo?.imdbRating}</span></MovieInfo>
            <MovieInfo>Year: <span>{movieInfo?.Year}</span></MovieInfo>
            <MovieInfo>Lenguage: <span>{movieInfo?.Lenguage}</span></MovieInfo>
            <MovieInfo>Rated: <span>{movieInfo?.Rated}</span></MovieInfo>
            <MovieInfo>Released: <span>{movieInfo?.Released}</span></MovieInfo>
            <MovieInfo>Genre: <span>{movieInfo?.Genre}</span></MovieInfo>
            <MovieInfo>Director: <span>{movieInfo?.Director}</span></MovieInfo>
            <MovieInfo>Actors: <span>{movieInfo?.Actors}</span></MovieInfo>
            <MovieInfo>Plot: <span>{movieInfo?.Plot}</span></MovieInfo>
        </InfoColum>
        <Close onClick={() => props.onMovieSelect()}>X</Close>
         
         </>:<span>Loading....</span>}
     </Container>
    )
}
export default MovieInfoComponent 
