import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  CustomInput
} from 'reactstrap'
import { Fragment } from 'react'
import { Check, X } from 'react-feather'

export default {
  title: '컴포넌트 (vuexy)/🍎 atoms/Switch',
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

export const SwitchColors = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Colors</CardTitle>
      </CardHeader>
      <CardBody>
        <CardText className="mb-0">
          Use class <code>.custom-control-colorName</code> to change switch's
          color
        </CardText>
        <div className="demo-inline-spacing">
          <div>
            <CardText className="mb-0">Primary</CardText>
            <CustomInput
              type="switch"
              id="switch-primary"
              name="primary"
              inline
              defaultChecked
            />
          </div>
          <div>
            <CardText className="mb-0">Secondary</CardText>
            <CustomInput
              className="custom-control-secondary"
              type="switch"
              id="secondary"
              name="secondary"
              inline
              defaultChecked
            />
          </div>
          <div>
            <CardText className="mb-0">Success</CardText>
            <CustomInput
              className="custom-control-success"
              type="switch"
              id="success"
              name="success"
              inline
              defaultChecked
            />
          </div>
          <div>
            <CardText className="mb-0">Danger</CardText>
            <CustomInput
              className="custom-control-danger"
              type="switch"
              id="danger"
              name="danger"
              inline
              defaultChecked
            />
          </div>
          <div>
            <CardText className="mb-0">Warning</CardText>
            <CustomInput
              className="custom-control-warning"
              type="switch"
              id="warning"
              name="warning"
              inline
              defaultChecked
            />
          </div>
          <div>
            <CardText className="mb-0">Info</CardText>
            <CustomInput
              className="custom-control-info"
              type="switch"
              id="info"
              name="info"
              inline
              defaultChecked
            />
          </div>
          <div>
            <CardText className="mb-0">Dark</CardText>
            <CustomInput
              className="custom-control-dark"
              type="switch"
              id="dark"
              name="dark"
              inline
              defaultChecked
            />
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

const Label = () => (
  <Fragment>
    <span className="switch-icon-left">
      <Check size={14} />
    </span>
    <span className="switch-icon-right">
      <X size={14} />
    </span>
  </Fragment>
)

export const SwitchIcons = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Icons</CardTitle>
      </CardHeader>
      <CardBody>
        <CardText className="mb-0">
          Use class <code>.switch-icon-left &amp; .switch-icon-right</code>{' '}
          inside of
          <code>label</code> prop to create a switch with icon.
        </CardText>
        <div className="demo-inline-spacing">
          <div>
            <CardText className="mb-0">Primary</CardText>
            <CustomInput
              type="switch"
              label={<Label />}
              id="icon-primary"
              name="icon-primary"
              inline
              defaultChecked
            />
          </div>
          <div>
            <CardText className="mb-0">Secondary</CardText>
            <CustomInput
              type="switch"
              label={<Label />}
              className="custom-control-secondary"
              id="icon-secondary"
              name="icon-secondary"
              inline
              defaultChecked
            />
          </div>
          <div>
            <CardText className="mb-0">Success</CardText>
            <CustomInput
              type="switch"
              label={<Label />}
              className="custom-control-success"
              id="icon-success"
              name="icon-success"
              inline
              defaultChecked
            />
          </div>
          <div>
            <CardText className="mb-0">Danger</CardText>
            <CustomInput
              type="switch"
              label={<Label />}
              className="custom-control-danger"
              id="icon-danger"
              name="icon-danger"
              inline
              defaultChecked
            />
          </div>
          <div>
            <CardText className="mb-0">Warning</CardText>
            <CustomInput
              type="switch"
              label={<Label />}
              className="custom-control-warning"
              id="icon-warning"
              name="icon-warning"
              inline
              defaultChecked
            />
          </div>
          <div>
            <CardText className="mb-0">Info</CardText>
            <CustomInput
              type="switch"
              label={<Label />}
              className="custom-control-info"
              id="icon-info"
              name="icon-info"
              inline
              defaultChecked
            />
          </div>
          <div>
            <CardText className="mb-0">Dark</CardText>
            <CustomInput
              type="switch"
              label={<Label />}
              className="custom-control-dark"
              id="icon-dark"
              name="icon-dark"
              inline
              defaultChecked
            />
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
