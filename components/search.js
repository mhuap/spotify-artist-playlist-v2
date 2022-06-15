import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
// import filler from "../images/Portrait_Placeholder.png";
import useSpotify from "../hooks/useSpotify";
import Layout from "./layout";
import debounce from 'lodash.debounce';

const filler = "/images/Portrait_Placeholder.png";

function Search() {
    const [artists, setArtists] = useState([]);
    const [artistInput, setArtistInput] = useState("");
    const spotifyApi = useSpotify();

    const handleSearch = e => {
        e.preventDefault();

        if (spotifyApi.getAccessToken()) {
            spotifyApi
                .searchArtists(e.target.value)
                .then(data => {
                    const items = data.body.artists.items.map(x => {
                        return {
                            id: x.id,
                            name: x.name,
                            image:
                                x.images.length === 0
                                    ? null
                                    : x.images.slice(-1)[0].url,
                        };
                    });

                    setArtists(items);
                })
                .catch(err => {
                    console.error(err);
                });
        }
    };

    const handleArtistInputChange = e => {
        setArtistInput(e.target.value);
    };

    const debouncedResults = useMemo(() => {
        return debounce(handleSearch, 200);
    }, []);

    useEffect(() => {
        return () => {
            debouncedResults.cancel();
        };
    });

    let list = null;
    if (artists.length > 0) {
        list = artists.map(a => (
            <li key={a.id}>
                <Link href={"/artist/" + a.id}>
                    <a>
                        <img src={a.image ?? filler} alt={a.name} />
                        {a.name}
                    </a>
                </Link>
            </li>
        ));
    }

    return (
        <Layout pageId="search">
            <div className="content">
                <form action="#">
                    <input
                        type="text"
                        name="artist"
                        onChange={debouncedResults}
                        placeholder="Search for an artist"
                        required
                    />
                    <button type="submit">Search</button>
                </form>
                <ul>{list}</ul>
            </div>
        </Layout>
    );
}

export default Search;
