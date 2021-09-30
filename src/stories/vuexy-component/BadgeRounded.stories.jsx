import React from 'react'

import { Badge } from 'reactstrap'
import { Bell, Link } from 'react-feather'

export default {
  title: '컴포넌트 (vuexy)/🍎 atoms/BadgeRounded',
  component: Badge,
  parameters: {
    docs: {
      description: {
        component:
          '태그, 레이블 등에 사용됩니다' +
          '<br/> prop ```pill```로 인하여 둥근 뱃지가 됩니다.' +
          "<br/> ```import { Badge } from 'reactstrap' ```",
        subcomponents: {
          IconOnly: 'hello'
        }
      }
    }
  }
}

export const BadgeContextual = () => {
  return (
    <React.Fragment>
      <Badge color="primary" pill>
        Primary
      </Badge>
      <Badge color="secondary" pill>
        Secondary
      </Badge>
      <Badge color="success" pill>
        Success
      </Badge>
      <Badge color="danger" pill>
        Danger
      </Badge>
      <Badge color="warning" pill>
        Warning
      </Badge>
      <Badge color="info" pill>
        Info
      </Badge>
      <Badge color="dark" pill>
        Dark
      </Badge>
    </React.Fragment>
  )
}

export const BadgePillLight = () => {
  return (
    <React.Fragment>
      <Badge color="light-primary" pill>
        Primary
      </Badge>
      <Badge color="light-secondary" pill>
        Secondary
      </Badge>
      <Badge color="light-success" pill>
        Success
      </Badge>
      <Badge color="light-danger" pill>
        Danger
      </Badge>
      <Badge color="light-warning" pill>
        Warning
      </Badge>
      <Badge color="light-info" pill>
        Info
      </Badge>
    </React.Fragment>
  )
}

export const BadgePillNotification = () => {
  return (
    <div className="demo-inline-spacing">
      <div className="position-relative">
        <Badge pill color="primary" className="badge-up">
          4
        </Badge>
        <Bell className="text-primary" size={22} />
      </div>
      <div className="position-relative">
        <Badge pill color="danger" className="badge-up">
          5
        </Badge>
        <Bell className="text-danger" size={22} />
      </div>
      <div className="position-relative">
        <Badge pill color="info" className="badge-up">
          6
        </Badge>
        <Bell className="text-info" size={22} />
      </div>
    </div>
  )
}

export const BadgePillLink = () => {
  return (
    <Badge color="primary" pill href="#">
      <Link size={12} />
      <span className="align-middle ml-50">Link Badge Pill</span>
    </Badge>
  )
}

export const BadgePillBlock = () => {
  return (
    <Badge pill color="primary" className="d-block">
      <span>Block Badge Pill</span>
    </Badge>
  )
}
