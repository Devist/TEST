import { Card, CardBody, CardText } from 'reactstrap'
import React from 'react'

function FaqFilter() {
  return (
    <div id="faq-search-filter">
      <Card
        className="faq-search"
        style={{
          backgroundImage: `url(${
            require('@src/ui/assets/images/banners/banner.png').default
          })`
        }}>
        <CardBody className="text-center">
          <h2 className="text-primary">FAQ - 질문에 답해 드립니다.</h2>
          <CardText className="mb-2">
            카테고리를 선택하여 필요한 도움말을 빠르게 찾을 수 있습니다.
          </CardText>
        </CardBody>
      </Card>
    </div>
  )
}

export default FaqFilter
