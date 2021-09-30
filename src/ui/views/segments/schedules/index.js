// ** Styles
import '@styles/react/apps/app-users.scss'
import { Fragment } from 'react'
import { Card, CardBody, CardHeader, CardTitle, Row, Col } from 'reactstrap'

// ** Third Party Components
import Select from 'react-select'
import { selectThemeColors } from '@utils'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

/** ************************************************************************
 * name :
 * description :

 * todo 작성 필요
 *************************************************************************** */
function Schedules() {
  return (
    <Fragment>
      <div className="app-schedules">
        <Card>
          <CardHeader>
            <CardTitle tag="h4">스케쥴</CardTitle>
          </CardHeader>
          <Row>
            <Col md="4">
              <Select
                isClearable={false}
                theme={selectThemeColors}
                className="react-select"
                classNamePrefix="select"
                // options={roleOptions}
                // value={currentRole}
                onChange={(data) => {
                  setCurrentRole(data)
                  dispatch(
                    getData({
                      page: currentPage,
                      perPage: rowsPerPage,
                      role: data.value,
                      currentPlan: currentPlan.value,
                      status: currentStatus.value,
                      q: searchTerm
                    })
                  )
                }}
              />
            </Col>
            <Col className="my-md-0 my-1" md="4">
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                // options={planOptions}
                // value={currentPlan}
                onChange={(data) => {
                  setCurrentPlan(data)
                  dispatch(
                    getData({
                      page: currentPage,
                      perPage: rowsPerPage,
                      role: currentRole.value,
                      currentPlan: data.value,
                      status: currentStatus.value,
                      q: searchTerm
                    })
                  )
                }}
              />
            </Col>
            <Col md="4">
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                // options={statusOptions}
                // value={currentStatus}
                onChange={(data) => {
                  setCurrentStatus(data)
                  dispatch(
                    getData({
                      page: currentPage,
                      perPage: rowsPerPage,
                      role: currentRole.value,
                      currentPlan: currentPlan.value,
                      status: data.value,
                      q: searchTerm
                    })
                  )
                }}
              />
            </Col>
          </Row>
        </Card>
      </div>
    </Fragment>
  )
}

export default Schedules
