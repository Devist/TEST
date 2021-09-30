import React, { useState } from 'react'

// ** 컴포넌트
import { ChevronUp } from 'react-feather'
import { Collapse, Card, CardHeader, CardBody, CardTitle } from 'reactstrap'

// ** 써드파티 컴포넌트
import Proptypes from 'prop-types'
import classnames from 'classnames'

type Props = {
  data: any
  type: string
  accordion: boolean
  active: any
  toggle: any
  titleKey: string
  contentKey: string
  className: string
}

/** ************************************************************************
 * todo 리팩토링 필요
 *************************************************************************** */
function FaqCollapse({
  data,
  type,
  accordion,
  active,
  toggle,
  titleKey,
  contentKey,
  className
}: Props) {
  const defaultActive = () => {
    if (accordion) {
      return active
    } else {
      return [...active]
    }
  }

  // ** State
  const [openCollapse, setOpenCollapse] = useState(defaultActive())

  // ** Function to handle Collapse Toggle
  const handleCollapseToggle = (id: any) => {
    if (accordion) {
      if (id === openCollapse) {
        setOpenCollapse(null)
      } else {
        setOpenCollapse(id)
      }
    } else {
      const arr = openCollapse,
        index = arr.indexOf(id)
      if (arr.includes(id)) {
        arr.splice(index, 1)
        setOpenCollapse([...arr])
      } else {
        arr.push(id)
        setOpenCollapse([...arr])
      }
    }
  }

  // ** Function to render collapse
  const renderData = () => {
    return data.map((item: any, index: number) => {
      const title = titleKey ? item[titleKey] : item.title,
        content = contentKey ? item[contentKey] : item.content

      return (
        <Card
          className={classnames('app-collapse', {
            [item.className]: item.className,
            open: accordion
              ? openCollapse === index
              : openCollapse.includes(index) && type === 'shadow'
          })}
          key={index}>
          <CardHeader
            className={classnames('align-items-center', {
              collapsed: accordion
                ? openCollapse !== index
                : !openCollapse.includes(index)
            })}
            /* eslint-disable */
            {...(toggle === 'hover'
              ? {
                  onMouseEnter: () => handleCollapseToggle(index)
                }
              : {
                  onClick: () => handleCollapseToggle(index)
                })}
            /* eslint-enable */
          >
            <CardTitle className="collapse-title">Q. {title}</CardTitle>
            <div className="flex-grow-1" />
            <ChevronUp size={14} />
          </CardHeader>
          <Collapse
            isOpen={accordion ? openCollapse === index : openCollapse.includes(index)}>
            <CardBody className={'preLine'}>A. {content}</CardBody>
          </Collapse>
        </Card>
      )
    })
  }

  return (
    <div
      className={classnames('collapse-icon', {
        [className]: className,
        'collapse-default': !type,
        'collapse-shadow': type === 'shadow',
        'collapse-border': type === 'border',
        'collapse-margin': type === 'margin'
      })}>
      {renderData()}
    </div>
  )
}

export default FaqCollapse

// ** PropTypes
FaqCollapse.propTypes = {
  data: Proptypes.array.isRequired,
  accordion: Proptypes.bool,
  type: Proptypes.oneOf(['shadow', 'border', 'margin']),
  active: Proptypes.oneOfType([Proptypes.array, Proptypes.number]),
  titleKey: Proptypes.string,
  contentKey: Proptypes.string,
  className: Proptypes.string
}

// ** Default Props
FaqCollapse.defaultProps = {
  active: [],
  toggle: 'click'
}
