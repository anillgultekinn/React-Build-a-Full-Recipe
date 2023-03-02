import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";

function Cuisine() {
    const [cuisine, setCuisine] = useState([]);

    let params = useParams(); //

    const getCusine = async (name) => {
        const data = await fetch(
            `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}` //
        );
        const recipes = await data.json();
        setCuisine(recipes.results);
        // console.log(recipes);
    };

    useEffect(() => {
        getCusine(params.type);
        console.log(params);
    }, [params.type]); // burada params.type yazmamızın sebebi, cuisine sayfasında farklı bir kategoriye tıkladığımızda, useEffect çalışsın ve getCusine fonksiyonu çalışsın. Bu yüzden params.type yazdık.

    return (
        <Grid
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            {cuisine.map((item) => {
                return (
                    <Card key={item.id}>
                        <Link to={`/recipe/${item.id}`}>
                            <img src={item.image} alt="" />
                            <h4> {item.title} </h4>
                        </Link>
                    </Card>
                );
            })}
        </Grid>
    );
}

const Grid = styled(motion.div)`
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

export default Cuisine;