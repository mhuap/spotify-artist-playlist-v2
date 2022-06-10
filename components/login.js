import React from "react";
import { signIn } from "next-auth/react";

function Login(props) {

    return (
        <div className="container">
            <div id="login">
                <div id="login-image"></div>

                <div className="content">
                    <h1 id="app-name">Discograph</h1>

                    <p className="text-grey">
                        Create a playlist of an artist&apos;s entire discography -
                        with one click
                    </p>

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