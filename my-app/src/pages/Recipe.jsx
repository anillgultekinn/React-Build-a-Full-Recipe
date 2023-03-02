import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import React from "react";

function Recipe() {
    let params = useParams();
    const [details, setDetails] = useState({});
    const [activeTab, setActiveTab] = useState("instructions");

    const fetchDetails = async () => {
        const data = await fetch(
            `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`
        );
        const detailData = await data.json();
        console.log(detailData);
        setDetails(detailData);
    };

    useEffect(() => {
        fetchDetails();
    }, [params.name]);

    return (
        <DeailWrapper>
            <div>
                <h2>{details.title}</h2>
                <img src={details.image} alt="" />
            </div>
            <Info>
                <Button
                    className={activeTab === "instructions" ? "active" : ""}
                    onClick={() => setActiveTab("instructions")}
                >
                    Instructions
                </Button>
                <Button
                    className={activeTab === "ingredients" ? "active" : ""}
                    onClick={() => setActiveTab("ingredients")}
                >
                    Ingredients
                </Button>

                {activeTab === "instructions" && (
                    <div>
                        <h3
                            dangerouslySetInnerHTML={{
                                __html: details.summary,
                            }}
                        ></h3>
                        <h3
                            dangerouslySetInnerHTML={{
                                __html: details.instructions,
                            }}
                        ></h3>
                    </div>
                )}
                {activeTab === "ingredients" && (
                    <ul>
                        {details.extendedIngredients &&
                            details.extendedIngredients.map((ingredient) => (
                                <li key={ingredient.id}>
                                    {ingredient.original}
                                </li>
                            ))}
                    </ul>
                )}
            </Info>
        </DeailWrapper>
    );
}

const DeailWrapper = styled.div`
    margin-top: 8rem;
    margin-bottom: 5rem;
    display: flex;
    .active {
        background: linear-gradient(35deg, #494949, #303030);
        color: white;
    }
    h3 {
        font-size: 1rem;
    }
    h2 {
        margin-bottom: 2rem;
    }
    li {
        font-size: 1.2rem;
        line-height: 2.5rem;
    }
    ul {
        margin-top: 2rem;
    }
    @media (max-width: 960px) {
        flex-direction: column;

        img {
            width: 100%;

            margin-bottom: 2rem;
        }
    }
`;

const Button = styled.button`
    padding: 1rem 2rem;
    color: #303030;
    background: white;
    border: 2px solid black;
    margin-right: 2rem;
    font-weight: 600;
    border-radius: 2rem;
    @media (max-width: 960px) {
        flex-direction: column;
    }
    @media (max-width: 660px) {
        flex-direction: column;
        margin-top: 1rem;
    }
`;
const Info = styled.div`
    margin-left: 2rem;
`;

export default Recipe;
