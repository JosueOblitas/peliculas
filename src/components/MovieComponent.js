import styled from "styled-components"

const MovieContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    width: 280px;
    box-shadow: 0 3px 10px 0 #aaa;
    cursor: pointer;
`;
const CoverImage = styled.img`
    height: 444px;
    object-fit: cover;
`;
const MovieName =styled.span`
    font-size: 18px; 
    font-weight: 600;
    color: black;
    margin: 15px 0;
    white-space: nowrap;
    overflow: hidden ;
`;
const InfoColum =styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;
const MovieInfo = styled.span`
    font-size: 16px;
    font-weight: 500;
    text-transform: capitalize;
`;

const Link = styled.a`
    text-decoration: none;
`
const MovieComponent = (props) => {
    const {Title, Year, imdbID, Type, Poster} = props.movie;
    return(
        <Link href="#infoMovie">
        <MovieContainer onClick={() => props.onMovieSelect(imdbID)}>
            <CoverImage src={Poster}/>
            <MovieName>{Title}</MovieName>
            <InfoColum>
                <MovieInfo>Year: {Year}</MovieInfo>
                <MovieInfo>Type: {Type}</MovieInfo>
            </InfoColum>
        </MovieContainer>

        </Link>
    )
}
export default MovieComponent