import React, { memo, useEffect, useMemo, useState } from 'react'

// ** 컴포넌트
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Col,
  FormGroup,
  FormFeedback,
  Row
} from 'reactstrap'

// ** 써드파티 컴포넌트
import Select from 'react-select'
import { useForm, Controller } from 'react-hook-form'
import classnames from 'classnames'
import options from './options.json'

// ** 유틸
import { selectThemeColors } from '@ui/utility/Utils'

// ** 비즈니스
import { useStores } from '@src/stores'

type Option = {
  value: string
  label: string
}

/** ************************************************************************
 * name : 프로필 검색 필터 카드
 * description :

 * todo 작성 필요
 *************************************************************************** */
function FilterCardSegmentTemplates() {
  // ** state
  const [isStarted, setIsStarted] = useState<Boolean>(false)
  const [currentTemplateOption, setCurrentTemplateOption] = useState<Option>(
    options.initTemplateOption
  )

  const { userStore } = useStores()

  const { register, errors, handleSubmit, control } = useForm()

  const templateOptions = options.templateOptions

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">세그먼트 생성 템플릿</CardTitle>
        </CardHeader>
        <CardBody>
          <Row className="align-items-center">
            {/* 게임 선택 */}
            <Col className="my-md-0 my-1" md="4">
              <FormGroup>
                <Controller
                  name="GameToLookup"
                  control={control}
                  render={() => (
                    <Select
                      isClearable={false}
                      theme={selectThemeColors}
                      className={classnames('react-select', {
                        'is-invalid': isStarted && !currentTemplateOption
                      })}
                      classNamePrefix="select"
                      options={templateOptions}
                      value={currentTemplateOption}
                      onChange={(data: any) => {
                        setCurrentTemplateOption(data)
                      }}
                    />
                  )}
                />
                <FormFeedback>템플릿 타입은 필수 선택입니다.</FormFeedback>
              </FormGroup>
            </Col>
            {currentTemplateOption.value === 'adid' && (
              <Col>
                <div className="mb-1 text-primary font-small-3">
                  사용 빈도가 높은 마케팅 세그먼트를 쉽게 만들 수 있습니다.
                </div>
              </Col>
            )}
          </Row>
        </CardBody>
      </Card>
    </>
  )
}

export default memo(FilterCardSegmentTemplates)
