import { Row, Col, Card, CardBody } from 'reactstrap'
import { PhoneCall, Mail } from 'react-feather'
import React from 'react'

function FaqContact() {
  return (
    <div id="faq-contact">
      <Row className="mt-5 pt-75">
        <Col className="text-center" sm="12">
          <h2>아직 질문이 있나요?</h2>
          <p className="mb-3">
            FAQ 에서 해결되지 않은 경우 언제든지 아래로 문의 할 수 있습니다. 곧 답변
            드리겠습니다!
          </p>
        </Col>
        <Col sm="6">
          <Card className="text-center bg-light-secondary shadow-none py-1">
            <CardBody>
              <div className="avatar avatar-tag bg-light-primary mb-2 mx-auto">
                <PhoneCall size={18} />
              </div>
              <h4>네이버 웍스: 홍승한(개인화서비스개발팀)</h4>
              <br />
              <h4>네이버 웍스: 오동환(개인화서비스개발팀)</h4>
            </CardBody>
          </Card>
        </Col>
        <Col sm="6">
          <Card className="text-center bg-light-secondary shadow-none py-1">
            <CardBody>
              <div className="avatar avatar-tag bg-light-primary mb-2 mx-auto">
                <Mail size={18} />
              </div>
              <h4>hongsh93@netmarble.com</h4>
              <br />
              <h4>whatsup@netmarble.com</h4>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default FaqContact
