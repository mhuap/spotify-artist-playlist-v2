import { signOut, useSession } from "next-auth/react";
import React from "react";

function Layout({ children, pageId }) {
    const { data: session } = useSession();

    return (
        <>
            <div className="background-gradient"></div>
            <div className="container">
                <header>
                    <div className="content username">
                        {session.user.name}
                        <a className="sign-out" onClick={() => signOut()}>
                            Sign out
                        </a>
                    </div>
                </header>
                <div id={pageId}>{children}</div>
            </div>
        </>
    );
}

export default Layout;
