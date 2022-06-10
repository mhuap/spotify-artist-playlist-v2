import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getSession, signOut, useSession } from "next-auth/react";
import useSpotify from "../../hooks/useSpotify";
import Album from "../../components/album";
import Checkbox from "../../components/checkbox";
import Link from "next/link";
import Layout from "../../components/layout";

function Artist() {
    const router = useRouter();
    const { artistId } = router.query;
    const { data: session } = useSession();
    const spotifyApi = useSpotify();

    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [albums, setAlbums] = useState([]);
    const [selectedAlbums, setSelectedAlbums] = useState([]);
    const [playlistCreated, setPlaylistCreated] = useState(false);
    const [href, setHref] = useState("");
    const [loading, setLoading] = useState(true);
    const [selectAll, setSelectAll] = useState(true);

    useEffect(() => {
        async function fetchData() {
            spotifyApi
                .getArtist(artistId)
                .then(data => {
                    setName(data.body.name);
                    setUrl(data.body.external_urls.spotify);
                })
                .catch(err => console.error(err));

            let offset = 0;
            let hasMore = true;

            while (hasMore) {
                await spotifyApi
                    .getArtistAlbums(artistId, {
                        include_groups: "album,compilation",
                        limit: 20,
                        offset: offset,
                    })
                    .then(data => {
                        if (data.body.next == null) {
                            hasMore = false;
                        }

                        offset += 20;
                        const items = data.body.items.map(x => {
                            return {
                                name: x.name,
                                id: x.id,
                                image: x.images.slice(-1)[0].url,
                            };
                        });

                        const filtered = items.filter(
                            (album, index, self) =>
                                index ===
                                self.findIndex(a => a.name === album.name)
                        );

                        setAlbums(prevAlbums => [...prevAlbums, ...filtered]);
                        if (selectAll) {
                            setSelectedAlbums(prevSelected => [
                                ...prevSelected,
                                ...filtered,
                            ]);
                        }
                    })
                    .catch(err => console.error(err));
            }
        }

        fetchData();
        setLoading(false);
    }, [spotifyApi]);

    const select = id => {
        const albumObject = albums.filter(x => x.id === id)[0];
        const newSelection = selectedAlbums.concat([albumObject]);
        setSelectedAlbums(newSelection);
    };

    const unselect = id => {
        const newSelection = selectedAlbums.filter(x => x.id !== id);
        setSelectedAlbums(newSelection);
    };

    const isAlbumSelected = id => {
        return selectedAlbums.some(x => x.id === id);
    };

    const onClickAlbum = e => {
        const albumId = e.target.value;

        if (isAlbumSelected(albumId)) {
            unselect(albumId);
        } else {
            select(albumId);
        }
    };

    const onClickMasterCheckbox = () => {
        if (selectAll) {
            // deselect
            setSelectAll(false);
            setSelectedAlbums([]);
        } else {
            setSelectAll(true);
            setSelectedAlbums(albums);
        }
    };

    const createPlaylist = () => {
        console.log("createPlaylist");

        let playlistId;
        let uris;
        const albums = selectedAlbums.map(x => x.id);
        const artist = name;

        spotifyApi
            .createPlaylist(artist + " Discography", {description: "Made by Discograph"})
            .then(data => (playlistId = data.body.id))
            .then(async id => {
                let allAlbums = [];
                while (albums.length > 0) {
                    const batch = albums.splice(0, 20);
                    try {
                        const getAlbums = await spotifyApi.getAlbums(batch);
                        allAlbums = allAlbums.concat(getAlbums.body.albums);
                    } catch (err) {
                        console.error("Error getting album information");
                    }
                }
                return allAlbums;
            })
            .then(all => all.map(a => a.tracks.items).flat())
            .then(tracks => (uris = tracks.map(t => t.uri)))
            .then(async data => {
                while (uris.length > 0) {
                    const batch = uris.splice(0, 50);
                    await spotifyApi
                        .addTracksToPlaylist(playlistId, batch)
                        .catch(err => {
                            console.log(err);
                            console.error("Error adding tracks to playlist");
                        });
                }
            })
            .then(data => spotifyApi.getPlaylist(playlistId))
            .then(playlist => {
                setHref(playlist.body.external_urls.spotify)
                setPlaylistCreated(true);
            })
            .catch(err => {
                console.error(err);
            });
    };

    let list = <h4>No albums found</h4>;
    if (loading) {
        list = <h4>Loading...</h4>;
    }
    if (albums.length > 0) {
        list = albums.map(a => (
            <Album
                key={a.id}
                name={a.name}
                image={a.image}
                albumId={a.id}
                isSelected={isAlbumSelected(a.id)}
                onClickAlbum={onClickAlbum}
            />
        ));
    }

    let content;
    let onClickBack;
    if (playlistCreated) {
        // confirmation
        content = (
            <>
                <div id="confirmation" className="content album-list">
                    <h2>Playlist created</h2>
                </div>
                <div className="content">
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
        // onClickBack = () => setPlaylistCreated(false);
    } else {
        // album list
        content = (
            <>
                <div className="content">
                    {/* <a className="text-caps button total-center artist-link" target="_blank" rel="noreferrer" href={url}>
          <img src='/images/Spotify_Icon_RGB_White.png' alt="spotify logo icon"/>
          Listen on Spotify
        </a> */}
                </div>
                <div
                    className={
                        "content master-checkbox" +
                        (selectAll ? "" : " unselectedAlbum")
                    }
                >
                    <label>
                        <input
                            type="checkbox"
                            onChange={onClickMasterCheckbox}
                            defaultChecked
                        />
                        <Checkbox checked={selectAll} />
                        {selectedAlbums.length} selected
                    </label>
                </div>
                <div className="content album-list">{list}</div>
                <div className="content artist-button">
                    <button onClick={createPlaylist}>Create playlist</button>
                </div>
            </>
        );
        onClickBack = () => router.back();
    }

    return (
        <Layout pageId="artist">
            <h1 className="content">{name}</h1>

            {content}
        </Layout>
    );
}

export default Artist;

export async function getServerSideProps(context) {
    const session = await getSession(context);

    return {
        props: {
            session,
        },
    };
}
