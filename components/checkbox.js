import { CheckIcon } from '@heroicons/react/solid'

function Checkbox({checked}) {
  return <div className="checkbox">
    {checked ? <CheckIcon /> : null}
  </div>
}

export default Checkbox;
