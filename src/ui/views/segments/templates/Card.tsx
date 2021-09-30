import { Card, CardBody, CardText, Button, Badge, Row, Col } from 'reactstrap'
import { getDayAndTimeForDisplay } from '@src/utils/DateUtil'
import { BookOpen, Edit, Edit2, Edit3, Trash, FilePlus } from 'react-feather'
import React from 'react'
import DisplayBox from '@ui/components/atoms/DisplayBox'
import ConditionSummary from '@ui/components/atoms/ConditionSummary'
import SegmentConditionSummary from '@ui/components/organisms/SegmentConditions/Summary'

/** ************************************************************************
 * name :
 * description :

 * todo 작성 필요
 *************************************************************************** */
function TemplateCard() {
  return (
    <div className={'list-view'}>
      <Card className="ecommerce-card">
        <CardBody>
          <div className="d-flex align-items-end">
            <h3 className="font-weight-bolder">복귀+미과금</h3>
            <h5 className="text-primary ml-1">ADID 템플릿</h5>
          </div>
          <div className="mt-little mb-little">
            hello world,hello world,hello world,hello world,hello world,hello world,hello
            world,hello world,hello world,hello world,hello world,hello world,hello
            world,hello world,hello world,hello world,hello world,
          </div>
          <SegmentConditionSummary className="mt-1" />
        </CardBody>
        {/* 버튼 모음 영역 */}
        <div className="item-options text-center px-5">
          {/* 메모 버튼 */}
          <Button color="primary">
            <FilePlus className="mr-50" size={14} />
            <span>사용하여 세그먼트 생성하기</span>
          </Button>

          {/* 자세히 버튼 */}
          <Button color="light" tag={'hello'} className="btn-cart move-cart">
            <Edit className="mr-50" size={14} />
            <span>수정하기</span>
          </Button>

          {/* 자세히 버튼 */}
          <Button color="warning" tag={'hello'} className="btn-cart move-cart">
            <Trash className="mr-50" size={14} />
            <span>삭제하기</span>
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default TemplateCard
