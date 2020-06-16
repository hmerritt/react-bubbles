import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Login = () => {

    const history = useHistory();

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
                localStorage.setItem("token", res.data.payload);

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
