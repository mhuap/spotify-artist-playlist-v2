import React from "react";
import Link from "next/link";

function PlaylistCreated({ href }) {
    return (
        <>
            <div id="confirmation" className="content album-list">
                <h2>Playlist created</h2>
            </div>
            <div className="content created-buttons">
                <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-caps button total-center spotify-button"
                >
                    <img
                        src="/images/Spotify_Icon_RGB_White.png"
                        alt="spotify logo icon"
                    />
                    Listen on Spotify
                </a>

                <Link href="/">
                    <a className="text-caps button total-center back-button">
                        Back to search
                    </a>
                </Link>
            </div>
        </>
    );
}

export default PlaylistCreated;
