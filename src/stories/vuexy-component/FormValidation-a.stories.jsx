import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { useState } from 'react'
import Select from 'react-select'
import classnames from 'classnames'
import Cleave from 'cleave.js/react'
import Flatpickr from 'react-flatpickr'
import { selectThemeColors } from '@utils'
import { useForm, Controller } from 'react-hook-form'
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Button,
  Form,
  Input,
  FormGroup,
  Label,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from 'reactstrap'

import 'cleave.js/dist/addons/cleave-phone.us'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/libs/react-select/_react-select.scss'

export default {
  title: '컴포넌트 (vuexy)/🌋 organisms/Form Validation/React Hook Form',
  component: Card,
  parameters: {
    docs: {
      description: {
        component:
          '화면상에 영역을 구분할 때 사용합니다. 간단하게 사용할 때는 단순히 ```<hr/>``` 태그를 사용해도 됩니다.'
      }
    }
  }
}

const colourOptions = [
  { value: 'ocean', label: 'Ocean' },
  { value: 'blue', label: 'Blue' },
  { value: 'purple', label: 'Purple' },
  { value: 'red', label: 'Red' },
  { value: 'orange', label: 'Orange' }
]

const defaultValues = {
  phoneNumber: '',
  ReactSelect: null,
  reactFlatpickr: null
}

export const ValidationThirdPartyComponents = () => {
  const [data, setData] = useState(null)

  const { handleSubmit, control } = useForm({ defaultValues })

  const onSubmit = (data) => setData(data)

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Third Party Components</CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label for="react-select">React Select</Label>
            <Controller
              isClearable
              as={Select}
              id="react-select"
              control={control}
              name="ReactSelect"
              options={colourOptions}
              className={classnames('react-select', {
                'is-invalid': data !== null && data.ReactSelect === null
              })}
              classNamePrefix="select"
              theme={selectThemeColors}
            />
          </FormGroup>
          <FormGroup>
            <Label for="react-flatpickr">React Flatpickr</Label>
            <Controller
              as={Flatpickr}
              control={control}
              id="react-flatpickr"
              name="reactFlatpickr"
              className={classnames('form-control', {
                'is-invalid': data !== null && data.reactFlatpickr === null
              })}
            />
          </FormGroup>
          <FormGroup>
            <Label for="phone-number">Input Mask</Label>
            <InputGroup className="input-group-merge">
              <InputGroupAddon addonType="prepend">
                <InputGroupText
                  className={classnames({
                    'border-danger':
                      data !== null &&
                      (data.phoneNumber === null || !data.phoneNumber.length)
                  })}>
                  US (+1)
                </InputGroupText>
              </InputGroupAddon>
              <Controller
                as={Cleave}
                id="phone-number"
                name="phoneNumber"
                control={control}
                className={classnames('form-control', {
                  'is-invalid':
                    data !== null &&
                    (data.phoneNumber === null || !data.phoneNumber.length)
                })}
                placeholder="1 234 567 8900"
                options={{ phone: true, phoneRegionCode: 'US' }}
              />
            </InputGroup>
          </FormGroup>
          <FormGroup className="d-flex mb-0">
            <Button className="mr-1" color="primary" type="submit">
              Submit
            </Button>
            <Button outline color="secondary" type="reset">
              Reset
            </Button>
          </FormGroup>
        </Form>
      </CardBody>
    </Card>
  )
}

export const ValidationOnChange = () => {
  const SignupSchema = yup.object().shape({
    email: yup.string().email().required(),
    lastName: yup.string().min(3).required(),
    firstName: yup.string().min(3).required(),
    password: yup.string().min(6).required()
  })

  const { register, errors, handleSubmit } = useForm({
    mode: 'onChange',
    resolver: yupResolver(SignupSchema)
  })

  const onSubmit = (data) => {
    console.log(data)
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Validation Schema With OnChange</CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label for="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              innerRef={register({ required: true })}
              invalid={errors.firstName && true}
              placeholder="Bruce"
            />
            {errors && errors.firstName && (
              <FormFeedback>{errors.firstName.message}</FormFeedback>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              innerRef={register({ required: true })}
              invalid={errors.lastName && true}
              placeholder="Wayne"
            />
            {errors && errors.lastName && (
              <FormFeedback>{errors.lastName.message}</FormFeedback>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              innerRef={register({ required: true })}
              invalid={errors.email && true}
              placeholder="bruce.wayne@email.com"
            />
            {errors && errors.email && (
              <FormFeedback>{errors.email.message}</FormFeedback>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              innerRef={register({ required: true })}
              invalid={errors.password && true}
              placeholder="password"
            />
            {errors && errors.password && (
              <FormFeedback>{errors.password.message}</FormFeedback>
            )}
          </FormGroup>
          <FormGroup className="d-flex mb-0">
            <Button className="mr-1" color="primary" type="submit">
              Submit
            </Button>
            <Button outline color="secondary" type="reset">
              Reset
            </Button>
          </FormGroup>
        </Form>
      </CardBody>
    </Card>
  )
}
