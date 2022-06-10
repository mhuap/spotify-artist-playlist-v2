import React from "react";
import { signIn, getProviders } from "next-auth/react";

function Login(props) {

    return (
        <div className="container">
            <div id="login">
                <div id="login-image"></div>

                <div className="content">
                    <h1>Discograph</h1>

                    <p className="text-grey">
                        Create a playlist of an artist's entire discography -
                        with one click
                    </p>

                    {/* className="text-caps button total-center" */}
                    {Object.values(props.providers).map(p => (
                        <button
                            key={p.id}
                            onClick={() => signIn(p.id)}
                            className="text-caps button total-center"
                        >
                            Sign in with {p.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Login;