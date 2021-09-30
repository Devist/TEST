import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  CustomInput
} from 'reactstrap'

export default {
  title: '컴포넌트 (vuexy)/🍎 atoms/Checkbox',
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

export const CheckboxCustom = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Custom Checkboxes</CardTitle>
      </CardHeader>
      <CardBody>
        <CardText className="mb-0">
          Use <code>&lt;CustomInput /&gt;</code> instead of{' '}
          <code>&lt;Input /&gt;</code> to create custom input.
        </CardText>
        <div className="demo-inline-spacing">
          <CustomInput
            inline
            type="checkbox"
            id="exampleCustomCheckbox"
            label="Checked"
            defaultChecked
          />
          <CustomInput
            inline
            type="checkbox"
            id="exampleCustomCheckbox2"
            label="Unchecked"
          />
          <CustomInput
            inline
            type="checkbox"
            id="exampleCustomCheckbox4"
            label="Checked Disabled"
            htmlFor="exampleCustomCheckbox4_X"
            defaultChecked
            disabled
          />
          <CustomInput
            inline
            type="checkbox"
            id="exampleCustomCheckbox5"
            label="Unchecked Disabled"
            htmlFor="exampleCustomCheckbox5_X"
            disabled
          />
        </div>
      </CardBody>
    </Card>
  )
}

export const CheckboxCustomColors = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Custom Checkboxes</CardTitle>
      </CardHeader>
      <CardBody>
        <CardText className="mb-0">
          Use class <code>&lt;.custom-control-[color]</code> for colored
          checkbox.
        </CardText>
        <div className="demo-inline-spacing">
          <CustomInput
            type="checkbox"
            className="custom-control-Primary"
            id="Primary"
            label="Primary"
            defaultChecked
            inline
          />
          <CustomInput
            type="checkbox"
            className="custom-control-secondary"
            id="secondary"
            label="Secondary"
            defaultChecked
            inline
          />
          <CustomInput
            type="checkbox"
            className="custom-control-success"
            id="success"
            label="Success"
            defaultChecked
            inline
          />
          <CustomInput
            type="checkbox"
            className="custom-control-danger"
            id="danger"
            label="Danger"
            defaultChecked
            inline
          />
          <CustomInput
            type="checkbox"
            className="custom-control-warning"
            id="warning"
            label="Warning"
            defaultChecked
            inline
          />
          <CustomInput
            type="checkbox"
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
