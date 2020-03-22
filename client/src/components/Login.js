import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useLocalStorage } from "../hooks/useLocalStorage";

const Login = () => {

    const history = useHistory();

    //  Get token from localstorage
    const [token, setToken] = useLocalStorage("token", "");

    //  Input values
    const [input, setInput] = useState({
        username: "Lambda School",
        password: "i<3Lambd4"
    });

    //  Add input value to state
    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }

    //  Log user in
    const submit = (e) => {
        e.preventDefault();

        axiosWithAuth()
            .post("/login", input)
            .then(res => {

                //  Log response data
                console.log("[Login] Success!", res);

                //  Save token to localstorage
                setToken(res.data.payload);

                // when you have handled the token, navigate to the BubblePage route
                history.push("/Bubbles");
            })
            .catch(err => {
                console.log("[Login] Error", err);
            });
    }

    return (
        <>
            <h1>Welcome to the Bubble App!</h1>

            <form onSubmit={submit}>
                <input type="text" name="username" onChange={handleChange} value={input.username} />
                <input type="password" name="password" onChange={handleChange} value={input.password} />
                <input type="submit" />
            </form>
        </>
    );
};

export default Login;
