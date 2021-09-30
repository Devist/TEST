import React from 'react'

import { Badge } from 'reactstrap'
import { Star, Link } from 'react-feather'

export default {
  title: '컴포넌트(vuexy)/🍎 atoms/BadgeRectangular',
  component: Badge,
  parameters: {
    docs: {
      description: {
        component:
          '세그먼트 요약 정보에 사용됩니다' +
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
      <Badge color="primary">Primary</Badge>
      <Badge color="secondary">Secondary</Badge>
      <Badge color="success">Success</Badge>
      <Badge color="danger">Danger</Badge>
      <Badge color="warning">Warning</Badge>
      <Badge color="info">Info</Badge>
      <Badge color="dark">Dark</Badge>
    </React.Fragment>
  )
}

export const BadgeLight = () => {
  return (
    <React.Fragment>
      <Badge color="light-primary">Primary</Badge>
      <Badge color="light-secondary">Secondary</Badge>
      <Badge color="light-success">Success</Badge>
      <Badge color="light-danger">Danger</Badge>
      <Badge color="light-warning">Warning</Badge>
      <Badge color="light-info">Info</Badge>
      <Badge color="light-dark">Dark</Badge>
    </React.Fragment>
  )
}

export const BadgeIcons = () => {
  return (
    <React.Fragment>
      <Badge color="primary">
        <Star size={12} className="align-middle" />
        <span className="align-middle ml-25">Primary</span>
      </Badge>
      <Badge color="secondary">
        <Star size={12} className="align-middle" />
        <span className="align-middle ml-25">Secondary</span>
      </Badge>
      <Badge color="success">
        <Star size={12} className="align-middle" />
        <span className="align-middle ml-25">Success</span>
      </Badge>
      <Badge color="danger">
        <Star size={12} className="align-middle" />
        <span className="align-middle ml-25">Danger</span>
      </Badge>
      <Badge color="warning">
        <Star size={12} className="align-middle" />
        <span className="align-middle ml-25">Warning</span>
      </Badge>
      <Badge color="info">
        <Star size={12} className="align-middle" />
        <span className="align-middle ml-25">Info</span>
      </Badge>
      <Badge color="dark">
        <Star size={12} className="align-middle" />
        <span className="align-middle ml-25">Dark</span>
      </Badge>
    </React.Fragment>
  )
}

export const BadgeLink = () => {
  return (
    <Badge color="primary" href="#">
      <Link size={12} />
      <span>Link Badge</span>
    </Badge>
  )
}

export const BadgeBlock = () => {
  return (
    <Badge color="primary" className="d-block">
      <span>Block Badge</span>
    </Badge>
  )
}
