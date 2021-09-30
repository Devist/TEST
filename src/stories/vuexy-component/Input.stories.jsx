import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  FormGroup,
  Label,
  Input,
  FormText,
  Row,
  Col,
  FormFeedback
} from 'reactstrap'

export default {
  title: '컴포넌트 (vuexy)/🍎 atoms/Input',
  component: Card,
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

export const InputBasic = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Basic Inputs</CardTitle>
      </CardHeader>

      <CardBody>
        <Row>
          <Col className="mb-1" xl="4" md="6" sm="12">
            <FormGroup>
              <Label for="basicInput">Basic Input</Label>
              <Input type="email" id="basicInput" placeholder="Enter Email" />
            </FormGroup>
          </Col>
          <Col className="mb-1" xl="4" md="6" sm="12">
            <FormGroup>
              <Label for="InputHelp">Input text with help</Label>{' '}
              <small className="text-muted">
                eg. <i>someone@example.com</i>
              </small>
              <Input type="email" id="InputHelp" />
            </FormGroup>
          </Col>
          <Col className="mb-1" xl="4" md="6" sm="12">
            <FormGroup>
              <Label for="disabledInput">Disabled Input</Label>
              <Input type="text" id="disabledInput" disabled />
            </FormGroup>
          </Col>
          <Col xl="4" md="6" sm="12">
            <FormGroup>
              <Label for="helperText">With Helper Text</Label>
              <Input type="text" id="helperText" placeholder="Name" />
              <FormText className="text-muted">
                Find helper text here for given textbox.
              </FormText>
            </FormGroup>
          </Col>
          <Col xl="4" md="6" sm="12">
            <FormGroup>
              <Label for="readonlyInput">Readonly input</Label>
              <Input
                type="text"
                id="readonlyInput"
                readOnly
                value="You can't update me :P"
              />
            </FormGroup>
          </Col>
          <Col xl="4" md="6" sm="12">
            <FormGroup>
              <Label for="StaticInput">Readonly Static Text</Label>
              <p className="form-control-static" id="StaticInput">
                email@pixinvent.com
              </p>
            </FormGroup>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

export const InputSizes = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Sizing Options</CardTitle>
      </CardHeader>

      <CardBody>
        <CardText>
          Use <code>bsSize="sm / lg"</code> attribute with Input tag to change
          size of input.
        </CardText>
        <Row>
          <Col sm="12">
            <FormGroup>
              <Label for="input-large">Large</Label>
              <Input
                type="text"
                id="input-large"
                bsSize="lg"
                placeholder="Large Input"
              />
            </FormGroup>
          </Col>
          <Col sm="12">
            <FormGroup>
              <Label for="input-default">Default</Label>
              <Input
                type="text"
                id="input-default"
                placeholder="Default Input"
              />
            </FormGroup>
          </Col>
          <Col sm="12">
            <FormGroup>
              <Label for="input-small">Small</Label>
              <Input
                type="text"
                id="input-small"
                bsSize="sm"
                placeholder="Small Input"
              />
            </FormGroup>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

export const InputSizesHorizontal = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Horizontal form label sizing</CardTitle>
      </CardHeader>
      <CardBody>
        <CardText>
          Be sure to use <code>size="sm"</code> or <code>size="lg"</code> with
          your
          <code>&lt;Label&gt;</code>s or <code>&lt;legend&gt;</code>s to
          correctly follow the size of input size.
        </CardText>
        <Row>
          <Col sm="12">
            <FormGroup row>
              <Label sm="3" size="lg" for="input-large-horizontal">
                Large
              </Label>
              <Col sm="9">
                <Input
                  type="text"
                  id="input-large-horizontal"
                  bsSize="lg"
                  placeholder="Large Input"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm="3" for="input-default-horizontal">
                Default
              </Label>
              <Col sm="9">
                <Input
                  type="text"
                  id="input-default-horizontal"
                  placeholder="Default Input"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm="3" size="sm" for="input-small-horizontal">
                Small
              </Label>
              <Col sm="9">
                <Input
                  type="text"
                  id="input-small-horizontal"
                  bsSize="sm"
                  placeholder="Small Input"
                />
              </Col>
            </FormGroup>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

export const InputValidationState = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Input Validation State</CardTitle>
      </CardHeader>

      <CardBody>
        <CardText>
          Use attribute <code>valid/invalid</code> with input tag to indicate
          input state.
        </CardText>
        <Row>
          <Col md="6" sm="12">
            <FormGroup>
              <Label for="validState">Valid State</Label>
              <Input type="text" id="validState" name="validState" valid />
              <FormFeedback valid>Sweet! That name is available.</FormFeedback>
            </FormGroup>
          </Col>
          <Col md="6" sm="12">
            <FormGroup>
              <Label for="invalidState">Invalid State</Label>
              <Input
                type="text"
                id="invalidState"
                name="invalidState"
                invalid
              />
              <FormFeedback>Oh no! That name is already taken.</FormFeedback>
            </FormGroup>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}
