import React from "react";
import CheckboxSettings from "./checkboxSettings";

function SettingOption({ labelText, isSelected, onClickSetting }) {
    return (
        <label>
            <input type="checkbox" checked={isSelected} onChange={onClickSetting}/>
            <CheckboxSettings checked={isSelected} />
            {labelText}
        </label>
    );
}

export default SettingOption;
