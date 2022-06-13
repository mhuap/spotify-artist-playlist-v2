import { CheckIcon } from '@heroicons/react/solid'

function CheckboxSettings({checked}) {
  return <div className="checkbox-settings">
    {checked ? <CheckIcon /> : null}
  </div>
}

export default CheckboxSettings;
