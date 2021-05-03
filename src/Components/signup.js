import React, { useState } from "react";
import useSignUpForm from "./signupform.js";
import * as constants from "./constants";
import jQuery from "jquery";

const Signup = props => {
    const [isUserValid, setUserValid] = useState(false);

    const signup = () => {
        if (isUserValid) {
            props.history.push("/productionTable");
        } else if (!isUserValid) {
            window.alert("Wrong Username and Password combination!!!");
        }
    };
    const { inputs, handleInputChange, handleSubmit } = useSignUpForm(signup);
    const handleEnter = e => {
        if (e.key === "Enter") {
            handleUserCheck();
        }
    };
    const handleUserCheck = () => {
        if (
            inputs.userName !== undefined &&
            inputs.password !== undefined &&
            inputs.userName !== "" &&
            inputs.password !== ""
        ) {
            let url =
                constants.validateUserUrl +
                "/" +
                inputs.userName +
                "/" +
                inputs.password;
            jQuery.ajax({
                type: "GET",
                url: url,
                async: false,
                success: function(data) {
                    console.log(data);
                    if (data.userPresent == 1) {
                        setUserValid(true);
                    } else if (data.userPresent == 0) {
                        setUserValid(false);
                    }
                }
            });
        }
    };
    return (
        <div className="signUp">
            <form onSubmit={handleSubmit} onKeyDown={handleEnter}>
                <br></br>
                <h3>Gauge Calibration</h3>
                <div className="userCred">
                    <label className="userLabel" for="userName1">
                        Username:
                    </label>
                    <input
                        type="text"
                        name="userName"
                        onChange={handleInputChange}
                        value={inputs.userName}
                        required
                        className="userInput"
                        id="userName1"
                    />
                </div>
                <div className="passwordCred">
                    <label className="userLabel" for="password1">
                        Password :
                    </label>
                    <input
                        type="password"
                        name="password"
                        onChange={handleInputChange}
                        onBlur={handleUserCheck}
                        value={inputs.password}
                        className="userInput"
                        id="password1"
                    />
                </div>
                <br></br>
                <button type="submit" className="submitStyle">
                    Sign In
                </button>{" "}
            </form>{" "}
        </div>
    );
};
export default Signup;
