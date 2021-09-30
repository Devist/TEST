import { Fragment } from 'react'
import Cleave from 'cleave.js/react'
import 'cleave.js/dist/addons/cleave-phone.us'
import { InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap'

export default {
  title: '컴포넌트 (vuexy)/🍎 atoms/Input Mask',
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

export const DateMask = () => {
  const options = { date: true, delimiter: '-', datePattern: ['Y', 'm', 'd'] }
  return (
    <Fragment>
      <label htmlFor="date">Date</label>
      <Cleave
        className="form-control"
        placeholder="2001-01-01"
        options={options}
        id="date"
      />
    </Fragment>
  )
}

export const TimeMask = () => {
  const options = { time: true, timePattern: ['h', 'm', 's'] }
  return (
    <Fragment>
      <label htmlFor="time">Time</label>
      <Cleave
        className="form-control"
        placeholder="12:00:00"
        options={options}
        id="time"
      />
    </Fragment>
  )
}

export const PhoneMask = () => {
  const options = { phone: true, phoneRegionCode: 'US' }
  return (
    <Fragment>
      <label htmlFor="phone-number">Phone Number</label>
      <InputGroup className="input-group-merge">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>US (+1)</InputGroupText>
        </InputGroupAddon>
        <Cleave
          className="form-control"
          placeholder="1 234 567 8900"
          options={options}
          id="phone-number"
        />
      </InputGroup>
    </Fragment>
  )
}

export const NumeralFormattingMask = () => {
  const options = { numeral: true, numeralThousandsGroupStyle: 'thousand' }

  return (
    <Fragment>
      <label htmlFor="numeral-formatting">Numeral Formatting</label>
      <Cleave
        className="form-control"
        placeholder="10,000"
        options={options}
        id="numeral-formatting"
      />
    </Fragment>
  )
}
