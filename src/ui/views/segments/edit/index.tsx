import Breadcrumbs from '@core-components/breadcrumbs'
import React from 'react'
import { Card, CardBody } from 'reactstrap'
import StepOne from '@ui/views/segments/edit/StepOne'
import StepTwo from '@ui/views/segments/edit/StepTwo'
import StepThree from '@ui/views/segments/edit/StepThree'
import FloatingButtons from '@ui/views/segments/edit/FloatingButtons'
import { observer } from 'mobx-react'

/** ************************************************************************
 * name : 세그먼트 생성/수정 페이지
 * description :
 * 세그먼트 생성/수정 페이지의 경우 UI 템플릿 활용이 불가하여,
 * segment-edit.scss 에 직접 마크업이 작성되어 있습니다.
 *************************************************************************** */
function SegmentEdit() {
  return (
    <>
      <Breadcrumbs
        breadCrumbTitle="세그먼트 만들기"
        breadCrumbParent="세그먼트 리스트"
        breadCrumbParentLink="/segments"
        breadCrumbActive="NEW"
      />
      <Card className="mb-5">
        <CardBody>
          {/* 1단계 - 세그먼트 기본 정보 작성 */}
          <StepOne />
          <hr className="mt-4 mb-2" />

          {/* 2단계 - 세그먼트 구성(레이블 조합) */}
          <StepTwo />
          <hr className="mt-4 mb-2" />

          {/* 3단계 - 결과값 설정 */}
          <StepThree />
        </CardBody>
      </Card>

      <FloatingButtons />
    </>
  )
}

export default observer(SegmentEdit)
