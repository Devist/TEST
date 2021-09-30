import { Fragment, useState } from 'react'
import { Label } from 'reactstrap'
import Flatpickr from 'react-flatpickr'

import '@styles/react/libs/flatpickr/flatpickr.scss'

export default {
  title: '컴포넌트 (vuexy)/🎄 molecules/Date & Time Picker',
  component: Fragment,
  parameters: {
    docs: {
      description: {
        component:
          '화면상에 영역을 구분할 때 사용합니다. 간단하게 사용할 때는 단순히 ```<hr/>``` 태그를 사용해도 됩니다.',
        subcomponents: {
          IconOnly: 'hello'
        }
      }
    }
  }
}

export const PickerDefault = () => {
  const [picker, setPicker] = useState(new Date())
  return (
    <Fragment>
      <Label for="default-picker">Default</Label>
      <Flatpickr
        className="form-control"
        value={picker}
        onChange={(date) => setPicker(date)}
        id="default-picker"
      />
    </Fragment>
  )
}

export const PickerHumanFriendly = () => {
  const [picker, setPicker] = useState(new Date())
  return (
    <Fragment>
      <Label for="hf-picker">Human Friendly</Label>
      <Flatpickr
        value={picker}
        id="hf-picker"
        className="form-control"
        onChange={(date) => setPicker(date)}
        options={{
          altInput: true,
          altFormat: 'F j, Y',
          dateFormat: 'Y-m-d'
        }}
      />
    </Fragment>
  )
}

export const Timepickers = () => {
  const [basic, setBasic] = useState(new Date())

  return (
    <Fragment>
      <Label id="timepicker">Basic 24hrs</Label>
      <Flatpickr
        className="form-control"
        value={basic}
        id="timepicker"
        options={{
          enableTime: true,
          noCalendar: true,
          dateFormat: 'H:i',
          time_24hr: true
        }}
        onChange={(date) => setBasic(date)}
      />
    </Fragment>
  )
}
