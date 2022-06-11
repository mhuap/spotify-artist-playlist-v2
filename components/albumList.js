import React from "react";
import Checkbox from "./checkbox";

function AlbumList({
    selectAll,
    onClickMasterCheckbox,
    selectedAlbums,
    createPlaylist,
    albums
}) {
    return (
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
            <div className="content album-list">{albums}</div>
            <div className="content artist-button">
                <button onClick={createPlaylist}>Create playlist</button>
            </div>
        </>
    );
}

export default AlbumList;
