import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  CustomInput
} from 'reactstrap'

export default {
  title: '컴포넌트 (vuexy)/🍎 atoms/Radio',
  component: Card,
  parameters: {
    docs: {
      description: {
        component:
          '버튼 컴포넌트입니다.' +
          "<br/> ```import { Button } from 'reactstrap' ```가 필요합니다.  "
      }
    }
  }
}

export const RadioCustom = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Custom</CardTitle>
      </CardHeader>

      <CardBody>
        <CardText className="mb-0">
          Use <code>&lt;CustomInput /&gt;</code> instead of{' '}
          <code>&lt;Input /&gt;</code> to create custom input.
        </CardText>
        <div className="demo-inline-spacing">
          <CustomInput
            type="radio"
            id="exampleCustomRadio"
            name="customRadio"
            inline
            label="Active"
            defaultChecked
          />
          <CustomInput
            type="radio"
            id="exampleCustomRadio2"
            name="customRadio"
            inline
            label="Inactive"
          />
          <CustomInput
            type="radio"
            id="exampleCustomRadio3"
            inline
            label="Active Disabled"
            disabled
            defaultChecked
          />
          <CustomInput
            type="radio"
            id="exampleCustomRadio4"
            inline
            label="Inactive disabled"
            htmlFor="exampleCustomRadio4_X"
            disabled
          />
        </div>
      </CardBody>
    </Card>
  )
}

export const RadioColors = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Colors</CardTitle>
      </CardHeader>
      <CardBody>
        <CardText className="mb-0">
          Use class <code>&lt;.custom-control-[color]</code> for colored Radio.
        </CardText>
        <div className="demo-inline-spacing">
          <CustomInput
            type="radio"
            className="custom-control-Primary"
            id="Primary"
            label="Primary"
            defaultChecked
            inline
          />
          <CustomInput
            type="radio"
            className="custom-control-secondary"
            id="secondary"
            label="Secondary"
            defaultChecked
            inline
          />
          <CustomInput
            type="radio"
            className="custom-control-success"
            id="success"
            label="Success"
            defaultChecked
            inline
          />
          <CustomInput
            type="radio"
            className="custom-control-warning"
            id="warning"
            label="Warning"
            defaultChecked
            inline
          />
          <CustomInput
            type="radio"
            className="custom-control-danger"
            id="danger"
            label="Danger"
            defaultChecked
            inline
          />
          <CustomInput
            type="radio"
            className="custom-control-info"
            id="info"
            label="Info"
            defaultChecked
            inline
          />
        </div>
      </CardBody>
    </Card>
  )
}
