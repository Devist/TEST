import React, { useState } from 'react'
import { Button, UncontrolledTooltip } from 'reactstrap'

export default {
  title: '컴포넌트 (vuexy)/🍎 atoms/Tooltip',
  component: Button,
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

export const TooltipUncontrolled = () => {
  return (
    <React.Fragment>
      <Button color="primary" id="UnControlledExample">
        Uncontrolled
      </Button>
      <UncontrolledTooltip placement="top" target="UnControlledExample">
        Hello World !
      </UncontrolledTooltip>
    </React.Fragment>
  )
}

export const TooltipPosition = () => {
  return (
    <div className="demo-inline-spacing">
      <Button.Ripple color="primary" outline id="positionTop">
        Top
      </Button.Ripple>
      <UncontrolledTooltip placement="top" target="positionTop">
        Tooltip on Top
      </UncontrolledTooltip>

      <Button.Ripple color="primary" outline id="positionRight">
        Right
      </Button.Ripple>
      <UncontrolledTooltip placement="right" target="positionRight">
        Tooltip on Right
      </UncontrolledTooltip>

      <Button.Ripple color="primary" outline id="positionBottom">
        Bottom
      </Button.Ripple>
      <UncontrolledTooltip placement="bottom" target="positionBottom">
        Tooltip on Bottom
      </UncontrolledTooltip>

      <Button.Ripple color="primary" outline id="positionLeft">
        Left
      </Button.Ripple>
      <UncontrolledTooltip placement="left" target="positionLeft">
        Tooltip on Left
      </UncontrolledTooltip>
    </div>
  )
}
