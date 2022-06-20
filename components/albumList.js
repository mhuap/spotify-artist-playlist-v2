import React, { useState, useEffect } from "react";
import Checkbox from "./checkbox";
import { AdjustmentsIcon } from "@heroicons/react/outline";
import SettingOption from "./settingOption";

function AlbumList({
    selectAll,
    onClickMasterCheckbox,
    selectedAlbums,
    createPlaylist,
    albums,
    onChangeSettingOptions,
    url
}) {
    const [openSettings, setOpenSettings] = useState(false);
    const [albumOption, setAlbumOption] = useState(true);
    const [compilationOption, setCompilationOption] = useState(true);
    const [singlesOption, setSinglesOption] = useState(false);
    const [appearsOption, setAppearsOption] = useState(false);

    const toggleSettings = () => setOpenSettings(!openSettings);

    useEffect(() => {
        onChangeSettingOptions(albumOption, compilationOption, singlesOption, appearsOption)
    
    }, [albumOption, compilationOption, singlesOption, appearsOption])
    

    return (
        <>
            <div className="content">
                <a
                    className="text-caps button total-center artist-link"
                    target="_blank"
                    rel="noreferrer"
                    href={url}
                >
                    <img
                        src="/images/Spotify_Icon_RGB_White.png"
                        alt="spotify logo icon"
                    />
                    Listen on Spotify
                </a>
            </div>
            <div className="content title-bar">
                <div
                    className={
                        "master-checkbox" +
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
                <div className="settings-icon" onClick={toggleSettings}>
                    <AdjustmentsIcon />
                </div>
            </div>
            <div
                className={"content settings" + (openSettings ? "" : " closed")}
            >
                <SettingOption
                    labelText="Albums"
                    isSelected={albumOption}
                    onClickSetting={() => setAlbumOption(!albumOption)}
                />
                <SettingOption
                    labelText="Compilations"
                    isSelected={compilationOption}
                    onClickSetting={() => setCompilationOption(!compilationOption)}
                />
                <SettingOption
                    labelText="Singles & EPs"
                    isSelected={singlesOption}
                    onClickSetting={() => setSinglesOption(!singlesOption)}
                />
                <SettingOption
                    labelText="Appears on"
                    isSelected={appearsOption}
                    onClickSetting={() => setAppearsOption(!appearsOption)}
                />
            </div>

            <div className="content album-list">{albums}</div>
            <div className="content artist-button">
                <button onClick={createPlaylist}>Create Spotify playlist</button>
            </div>
        </>
    );
}

export default AlbumList;
