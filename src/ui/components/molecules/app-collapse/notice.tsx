import React, { useState, cloneElement, useEffect } from 'react'

// ** 컴포넌트
import { ChevronUp } from 'react-feather'
import { Collapse, Card, CardHeader, CardBody, CardTitle } from 'reactstrap'

// ** 써드파티 컴포넌트
import Proptypes from 'prop-types'
import classnames from 'classnames'

// ** 커스텀 컴포넌트
import { PermissionsGate } from '@ui/acl/PermissionsGate'

// ** 유틸
import { CAN } from '@ui/acl/permission-maps'
import { getDayWithWeekForDisplay } from '@src/utils/DateUtil'

type Props = {
  data: any[]
  type: string
  accordion: boolean
  active: []
  toggle: string
  titleKey: string
  contentKey: string
  className: string
  slotTitleDate: string
  slotContentUpdate: any
  slotContentDelete: any
}

/** ************************************************************************
 * todo 리팩토링 필요
 *************************************************************************** */
function NoticeCollapse({
  data,
  type,
  accordion,
  active,
  toggle,
  titleKey,
  contentKey,
  className,
  slotTitleDate,
  slotContentUpdate,
  slotContentDelete
}: Props) {
  /**
   ** If accordion is true then return only one active index else return an Array
   */
  const defaultActive = () => {
    if (accordion) {
      return active
    } else {
      return [...active]
    }
  }

  const createMarkup = (content: any) => {
    return { __html: content }
  }

  // ** State
  const [openCollapse, setOpenCollapse] = useState<any>(defaultActive())
  useEffect(() => {
    setOpenCollapse(defaultActive())
  }, [data])

  const eventHandler = {
    // ** Function to handle Collapse Toggle
    handleCollapseToggle: (id: number): void => {
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
  }

  // ** Function to render collapse
  const renderData = () => {
    return data.map((item, index) => {
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
                  onMouseEnter: () => eventHandler.handleCollapseToggle(index)
                }
              : {
                  onClick: () => eventHandler.handleCollapseToggle(index)
                })}
            /* eslint-enable */
          >
            <CardTitle className="collapse-title">{title}</CardTitle>
            <div className="flex-grow-1" />
            {slotTitleDate ? (
              <div className={'mr-2'}>
                {getDayWithWeekForDisplay(item[slotTitleDate])}
              </div>
            ) : null}
            <ChevronUp size={14} />
          </CardHeader>
          <Collapse
            isOpen={accordion ? openCollapse === index : openCollapse.includes(index)}>
            <CardBody className={'preLine'}>
              <p
                id="content-area"
                className="border mt-1 p-1"
                dangerouslySetInnerHTML={createMarkup(content)}
              />
            </CardBody>
            <PermissionsGate errorProps={{ disabled: true }} scopes={[CAN.MANAGE_NOTICE]}>
              {slotContentUpdate || slotContentDelete ? (
                <div className="d-flex px-2 pb-1 pt-0">
                  <div className="flex-grow-1" />
                  {slotContentUpdate && cloneElement(slotContentUpdate, { data: item })}
                  {slotContentDelete &&
                    cloneElement(slotContentDelete, {
                      data: item
                    })}
                </div>
              ) : null}
            </PermissionsGate>
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

export default NoticeCollapse

// ** PropTypes
NoticeCollapse.propTypes = {
  data: Proptypes.array.isRequired,
  accordion: Proptypes.bool,
  type: Proptypes.oneOf(['shadow', 'border', 'margin']),
  active: Proptypes.oneOfType([Proptypes.array, Proptypes.number]),
  titleKey: Proptypes.string,
  contentKey: Proptypes.string,
  className: Proptypes.string,
  slotTitleDate: Proptypes.any,
  slotContentUpdate: Proptypes.any,
  slotContentDelete: Proptypes.any
}

// ** Default Props
NoticeCollapse.defaultProps = {
  active: [],
  toggle: 'click'
}
