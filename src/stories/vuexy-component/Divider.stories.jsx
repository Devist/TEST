import React, { useState } from 'react'
import { Button, ButtonGroup, Row, Col, CardText } from 'reactstrap'
import { Story } from '@storybook/react'

import {
  User,
  GitHub,
  Calendar,
  Inbox,
  Camera,
  Award,
  Star
} from 'react-feather'

export default {
  title: '컴포넌트 (vuexy)/🍎 atoms/Divider',
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
  },
  argTypes: {
    className: {
      description: '색상이나 컨텐츠 영역의 변경은 class로 변경합니다.',
      defaultValue: 'divider',
      options: [
        'divider',
        'divider divider-left',
        'divider divider-left-center',
        'divider divider-right-center',
        'divider divider-primary',
        'divider divider-secondary',
        'divider divider-success',
        'divider divider-danger',
        'divider divider-warning'
      ],
      control: { type: 'select' }
    },
    icon: {
      description: '텍스트 대신 아이콘을 사용합니다',
      options: ['user', 'github', null],
      control: { type: 'select' }
    }
  }
}

const Template = ({ text, icon, ...args }) => {
  const someResult = someFunction(icon)

  return (
    <div {...args}>
      <div className="divider-text">
        {icon ? someResult : null}
        {text}
      </div>
    </div>
  )
}

export const Divider = Template.bind({})
Divider.args = {
  text: '텍스트',
  className: 'divider'
}

const someFunction = (icon) => {
  // Makes some computations and returns something
  switch (icon) {
    case 'user':
      return <User />
    case 'github':
      return <GitHub />
    case null:
      return null
    default:
      return <User />
  }
}

// export const Text = () => <ButtonCheckboxRadio />
