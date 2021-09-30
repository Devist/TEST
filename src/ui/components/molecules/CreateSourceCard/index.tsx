import { Card, CardBody, CardFooter, CardText } from 'reactstrap'
import React, { useMemo } from 'react'
import { CREATE_SOURCE } from '@src/entities'

type Props = {
  clickHandler?: () => void
  selected?: boolean
  type: CREATE_SOURCE // copy 미사용
}

function CreateSourceCard({ clickHandler, selected = false, type }: Props) {
  const title: string = useMemo(() => {
    const titles = {
      [CREATE_SOURCE.CREATE]: '직접 만들기',
      [CREATE_SOURCE.TEMPLATE]: '마켓팅 템플릿 사용하기',
      [CREATE_SOURCE.COPY]: ''
    }
    return titles[type]
  }, [])

  const description: string = useMemo(() => {
    const descriptions = {
      [CREATE_SOURCE.CREATE]: '필요한 레이블을 직접 구성합니다.',
      [CREATE_SOURCE.TEMPLATE]:
        '마케팅에 이용되는 ADID 추출을 위한 세그먼트 템플릿입니다.',
      [CREATE_SOURCE.COPY]: ''
    }
    return descriptions[type]
  }, [])

  // const events

  return (
    <>
      <Card
        color={selected ? 'primary' : null}
        className="cursor-pointer"
        inverse={selected}
        onClick={clickHandler}>
        <CardBody>
          <CardText tag="h5" className={selected ? 'text-white' : null}>
            {title}
          </CardText>
        </CardBody>
        <CardFooter>{description}</CardFooter>
      </Card>
    </>
  )
}

export default CreateSourceCard
