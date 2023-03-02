import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Search() {
    const [input, setInput] = useState("");
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        navigate(`/searched/${input}`);
        // setInput("");
    };

    return (
        <FormStyle onSubmit={submitHandler}>
            <div>
                <FaSearch></FaSearch>
                <input
                    onChange={(e) => setInput(e.target.value)}
                    type="text"
                    value={input}
                />
            </div>
        </FormStyle>
    );
}

const FormStyle = styled.form`
    margin: 0rem 10rem;
    div {
        width: 75%;
        margin: 0 10%;

        position: relative;
    }

    input {
        border: none;
        background: linear-gradient(35deg, #494949, #303030);
        font-size: 1.5rem;
        color: white;
        padding: 1rem 3rem;
        border: none;
        border-radius: 1rem;
        outline: none;
        width: 100%;
    }
    svg {
        position: absolute;
        top: 50%;
        left: 0%;
        transform: translate(100%, -50%);
        color: white;
    }

    @media (max-width: 960px) {
        width: 70%;
        margin: 0 15%;
        input {
          
            width:100%
            font-size: 1.2rem;
            padding: 0.5rem 2rem;
        
        }
    }

    @media (max-width: 768px) {
        width: 70%;
        margin: 0 15%;
    }

    @media (max-width: 480px) {
        width: 70%;
        margin: 0 15%;
    }
`;

export default Search;
