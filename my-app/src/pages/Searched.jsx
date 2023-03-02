import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { Link } from "react-router-dom";

function Searched() {
    const [searchedRecepies, setSearchedRecepies] = useState([]);
    let params = useParams();
    const getSearched = async (name) => {
        // name parametresi, Cuisine sayfasından geliyor.
        const data = await fetch(
            `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`
        );
        const recipes = await data.json();
        setSearchedRecepies(recipes.results);
    };

    useEffect(() => {
        getSearched(params.search);
    }, [params.search]); // burada params.search yazmamızın sebebi, searched sayfasında farklı bir kategoriye tıkladığımızda, useEffect çalışsın ve getSearched fonksiyonu çalışsın. Bu yüzden params.search yazdık.

    return (
        <Grid>
            {searchedRecepies.map((item) => {
                return (
                    <Card key={item.id}>
                        <Link to={`/recipe/${item.id}`}>
                            <img src={item.image} alt="" />
                            <h4>{item.title}</h4>
                        </Link>
                    </Card>
                );
            })}
        </Grid>
    );
}

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    grid-gap: 3rem;
`;
const Card = styled.div`
    position: relative;

    img {
        width: 100%;
        border-radius: 2rem;
    }
    a {
        text-decoration: none;
    }
    h4 {
        text-align: center;
        padding: 1rem;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        color: white;
    }
`;

export default Searched;
