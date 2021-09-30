// ** Table Columns
import ExpandableTable, {
  data,
  basicColumns,
  columns,
  advSearchColumns
} from './TablesData'

// ** Third Party Components
import {
  ChevronDown,
  Share,
  Printer,
  FileText,
  File,
  Grid,
  Copy,
  Plus
} from 'react-feather'

import DataTable from 'react-data-table-component'

import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Button,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  FormGroup,
  Label,
  Row,
  Col
} from 'reactstrap'

// ** React Imports
import { Fragment, useState, forwardRef } from 'react'

// ** Add New Modal Component
import AddNewModal from './AddNewModal'

// ** Third Party Components
import ReactPaginate from 'react-paginate'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

export default {
  title: '컴포넌트 (vuexy)/🌋 organisms/Tables',
  component: Card,
  parameters: {
    docs: {
      description: {
        component:
          '버튼 컴포넌트입니다.' +
          "<br/> ```import { Button } from 'reactstrap' ```가 필요합니다.  "
      }
    }
  }
}

// 기본
export const DataTablesBasic = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Zero Configuration</CardTitle>
      </CardHeader>
      <DataTable
        noHeader
        pagination
        data={data}
        columns={basicColumns}
        className="react-dataTable"
        sortIcon={<ChevronDown size={10} />}
        paginationRowsPerPageOptions={[10, 25, 50, 100]}
      />
    </Card>
  )
}

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef(({ onClick, ...rest }, ref) => (
  <div className="custom-control custom-checkbox">
    <input
      type="checkbox"
      className="custom-control-input"
      ref={ref}
      {...rest}
    />
    <label className="custom-control-label" onClick={onClick} />
  </div>
))

// 버튼
export const DataTableWithButtons = () => {
  // ** States
  const [modal, setModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])

  // ** Function to handle Modal toggle
  const handleModal = () => setModal(!modal)

  // ** Function to handle filter
  const handleFilter = (e) => {
    const value = e.target.value
    let updatedData = []
    setSearchValue(value)

    const status = {
      1: { title: 'Current', color: 'light-primary' },
      2: { title: 'Professional', color: 'light-success' },
      3: { title: 'Rejected', color: 'light-danger' },
      4: { title: 'Resigned', color: 'light-warning' },
      5: { title: 'Applied', color: 'light-info' }
    }

    if (value.length) {
      updatedData = data.filter((item) => {
        const startsWith =
          item.full_name.toLowerCase().startsWith(value.toLowerCase()) ||
          item.post.toLowerCase().startsWith(value.toLowerCase()) ||
          item.email.toLowerCase().startsWith(value.toLowerCase()) ||
          item.age.toLowerCase().startsWith(value.toLowerCase()) ||
          item.salary.toLowerCase().startsWith(value.toLowerCase()) ||
          item.start_date.toLowerCase().startsWith(value.toLowerCase()) ||
          status[item.status].title
            .toLowerCase()
            .startsWith(value.toLowerCase())

        const includes =
          item.full_name.toLowerCase().includes(value.toLowerCase()) ||
          item.post.toLowerCase().includes(value.toLowerCase()) ||
          item.email.toLowerCase().includes(value.toLowerCase()) ||
          item.age.toLowerCase().includes(value.toLowerCase()) ||
          item.salary.toLowerCase().includes(value.toLowerCase()) ||
          item.start_date.toLowerCase().includes(value.toLowerCase()) ||
          status[item.status].title.toLowerCase().includes(value.toLowerCase())

        if (startsWith) {
          return startsWith
        } else if (!startsWith && includes) {
          return includes
        } else return null
      })
      setFilteredData(updatedData)
      setSearchValue(value)
    }
  }

  // ** Function to handle Pagination
  const handlePagination = (page) => {
    setCurrentPage(page.selected)
  }

  // ** Custom Pagination
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel=""
      nextLabel=""
      forcePage={currentPage}
      onPageChange={(page) => handlePagination(page)}
      pageCount={
        searchValue.length ? filteredData.length / 7 : data.length / 7 || 1
      }
      breakLabel="..."
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName="active"
      pageClassName="page-item"
      breakClassName="page-item"
      breakLinkClassName="page-link"
      nextLinkClassName="page-link"
      nextClassName="page-item next"
      previousClassName="page-item prev"
      previousLinkClassName="page-link"
      pageLinkClassName="page-link"
      breakClassName="page-item"
      breakLinkClassName="page-link"
      containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1"
    />
  )

  // ** Converts table to CSV
  function convertArrayOfObjectsToCSV(array) {
    let result

    const columnDelimiter = ','
    const lineDelimiter = '\n'
    const keys = Object.keys(data[0])

    result = ''
    result += keys.join(columnDelimiter)
    result += lineDelimiter

    array.forEach((item) => {
      let ctr = 0
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter

        result += item[key]

        ctr++
      })
      result += lineDelimiter
    })

    return result
  }

  // ** Downloads CSV
  function downloadCSV(array) {
    const link = document.createElement('a')
    let csv = convertArrayOfObjectsToCSV(array)
    if (csv === null) return

    const filename = 'export.csv'

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`
    }

    link.setAttribute('href', encodeURI(csv))
    link.setAttribute('download', filename)
    link.click()
  }

  return (
    <Fragment>
      <Card>
        <CardHeader className="flex-md-row flex-column align-md-items-center align-items-start border-bottom">
          <CardTitle tag="h4">DataTable with Buttons</CardTitle>
          <div className="d-flex mt-md-0 mt-1">
            <UncontrolledButtonDropdown>
              <DropdownToggle color="secondary" caret outline>
                <Share size={15} />
                <span className="align-middle ml-50">Export</span>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem className="w-100">
                  <Printer size={15} />
                  <span className="align-middle ml-50">Print</span>
                </DropdownItem>
                <DropdownItem
                  className="w-100"
                  onClick={() => downloadCSV(data)}>
                  <FileText size={15} />
                  <span className="align-middle ml-50">CSV</span>
                </DropdownItem>
                <DropdownItem className="w-100">
                  <Grid size={15} />
                  <span className="align-middle ml-50">Excel</span>
                </DropdownItem>
                <DropdownItem className="w-100">
                  <File size={15} />
                  <span className="align-middle ml-50">PDF</span>
                </DropdownItem>
                <DropdownItem className="w-100">
                  <Copy size={15} />
                  <span className="align-middle ml-50">Copy</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledButtonDropdown>
            <Button className="ml-2" color="primary" onClick={handleModal}>
              <Plus size={15} />
              <span className="align-middle ml-50">Add Record</span>
            </Button>
          </div>
        </CardHeader>
        <Row className="justify-content-end mx-0">
          <Col
            className="d-flex align-items-center justify-content-end mt-1"
            md="6"
            sm="12">
            <Label className="mr-1" for="search-input">
              Search
            </Label>
            <Input
              className="dataTable-filter mb-50"
              type="text"
              bsSize="sm"
              id="search-input"
              value={searchValue}
              onChange={handleFilter}
            />
          </Col>
        </Row>
        <DataTable
          noHeader
          pagination
          selectableRows
          columns={columns}
          paginationPerPage={7}
          className="react-dataTable"
          sortIcon={<ChevronDown size={10} />}
          paginationDefaultPage={currentPage + 1}
          paginationComponent={CustomPagination}
          data={searchValue.length ? filteredData : data}
          selectableRowsComponent={BootstrapCheckbox}
        />
      </Card>
      <AddNewModal open={modal} handleModal={handleModal} />
    </Fragment>
  )
}

export const DataTableExpandable = () => {
  // ** State
  const [currentPage, setCurrentPage] = useState(0)

  // ** Function to handle filter
  const handlePagination = (page) => {
    setCurrentPage(page.selected)
  }

  // ** Custom Pagination
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel={''}
      nextLabel={''}
      forcePage={currentPage}
      onPageChange={(page) => handlePagination(page)}
      pageCount={10}
      breakLabel={'...'}
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName={'active'}
      pageClassName={'page-item'}
      nextLinkClassName={'page-link'}
      nextClassName={'page-item next'}
      previousClassName={'page-item prev'}
      previousLinkClassName={'page-link'}
      pageLinkClassName={'page-link'}
      breakClassName="page-item"
      breakLinkClassName="page-link"
      containerClassName={
        'pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1'
      }
    />
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Expandable Row</CardTitle>
      </CardHeader>
      <DataTable
        noHeader
        pagination
        data={data}
        expandableRows
        columns={columns}
        expandOnRowClicked
        className="react-dataTable"
        sortIcon={<ChevronDown size={10} />}
        paginationDefaultPage={currentPage + 1}
        expandableRowsComponent={<ExpandableTable />}
        paginationRowsPerPageOptions={[10, 25, 50, 100]}
        paginationComponent={CustomPagination}
      />
    </Card>
  )
}

// Advanced Search
export const DataTableAdvSearch = () => {
  // ** States
  const [Picker, setPicker] = useState('')
  const [searchName, setSearchName] = useState('')
  const [searchPost, setSearchPost] = useState('')
  const [searchCity, setSearchCity] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const [searchEmail, setSearchEmail] = useState('')
  const [searchSalary, setSearchSalary] = useState('')
  const [filteredData, setFilteredData] = useState([])

  // ** Function to handle Pagination
  const handlePagination = (page) => setCurrentPage(page.selected)

  // ** Table data to render
  const dataToRender = () => {
    if (
      searchName.length ||
      searchPost.length ||
      searchEmail.length ||
      searchCity.length ||
      searchSalary.length ||
      Picker.length
    ) {
      return filteredData
    } else {
      return data
    }
  }

  // ** Custom Pagination
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel={''}
      nextLabel={''}
      forcePage={currentPage}
      onPageChange={(page) => handlePagination(page)}
      pageCount={dataToRender().length / 7 || 1}
      breakLabel={'...'}
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName={'active'}
      pageClassName={'page-item'}
      nextLinkClassName={'page-link'}
      nextClassName={'page-item next'}
      previousClassName={'page-item prev'}
      previousLinkClassName={'page-link'}
      pageLinkClassName={'page-link'}
      breakClassName="page-item"
      breakLinkClassName="page-link"
      containerClassName={
        'pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1'
      }
    />
  )

  // ** Function to handle name filter
  const handleNameFilter = (e) => {
    const value = e.target.value
    let updatedData = []
    const dataToFilter = () => {
      if (
        searchEmail.length ||
        searchPost.length ||
        searchCity.length ||
        searchSalary.length ||
        Picker.length
      ) {
        return filteredData
      } else {
        return data
      }
    }

    setSearchName(value)
    if (value.length) {
      updatedData = dataToFilter().filter((item) => {
        const startsWith = item.full_name
          .toLowerCase()
          .startsWith(value.toLowerCase())

        const includes = item.full_name
          .toLowerCase()
          .includes(value.toLowerCase())

        if (startsWith) {
          return startsWith
        } else if (!startsWith && includes) {
          return includes
        } else return null
      })
      setFilteredData([...updatedData])
      setSearchName(value)
    }
  }

  // ** Function to handle email filter
  const handleEmailFilter = (e) => {
    const value = e.target.value
    let updatedData = []
    const dataToFilter = () => {
      if (
        searchName.length ||
        searchPost.length ||
        searchCity.length ||
        searchSalary.length ||
        Picker.length
      ) {
        return filteredData
      } else {
        return data
      }
    }

    setSearchEmail(value)
    if (value.length) {
      updatedData = dataToFilter().filter((item) => {
        const startsWith = item.email
          .toLowerCase()
          .startsWith(value.toLowerCase())

        const includes = item.email.toLowerCase().includes(value.toLowerCase())

        if (startsWith) {
          return startsWith
        } else if (!startsWith && includes) {
          return includes
        } else return null
      })
      setFilteredData([...updatedData])
      setSearchEmail(value)
    }
  }

  // ** Function to handle post filter
  const handlePostFilter = (e) => {
    const value = e.target.value
    let updatedData = []
    const dataToFilter = () => {
      if (
        searchEmail.length ||
        searchName.length ||
        searchCity.length ||
        searchSalary.length ||
        Picker.length
      ) {
        return filteredData
      } else {
        return data
      }
    }

    setSearchPost(value)
    if (value.length) {
      updatedData = dataToFilter().filter((item) => {
        const startsWith = item.post
          .toLowerCase()
          .startsWith(value.toLowerCase())

        const includes = item.post.toLowerCase().includes(value.toLowerCase())

        if (startsWith) {
          return startsWith
        } else if (!startsWith && includes) {
          return includes
        } else return null
      })
      setFilteredData([...updatedData])
      setSearchPost(value)
    }
  }

  // ** Function to handle city filter
  const handleCityFilter = (e) => {
    const value = e.target.value
    let updatedData = []
    const dataToFilter = () => {
      if (
        searchEmail.length ||
        searchName.length ||
        searchPost.length ||
        searchSalary.length ||
        Picker.length
      ) {
        return filteredData
      } else {
        return data
      }
    }

    setSearchCity(value)
    if (value.length) {
      updatedData = dataToFilter().filter((item) => {
        const startsWith = item.city
          .toLowerCase()
          .startsWith(value.toLowerCase())

        const includes = item.city.toLowerCase().includes(value.toLowerCase())

        if (startsWith) {
          return startsWith
        } else if (!startsWith && includes) {
          return includes
        } else return null
      })
      setFilteredData([...updatedData])
      setSearchCity(value)
    }
  }

  // ** Function to handle salary filter
  const handleSalaryFilter = (e) => {
    const value = e.target.value
    let updatedData = []
    const dataToFilter = () => {
      if (
        searchEmail.length ||
        searchName.length ||
        searchPost.length ||
        searchCity.length ||
        Picker.length
      ) {
        return filteredData
      } else {
        return data
      }
    }

    setSearchSalary(value)
    if (value.length) {
      updatedData = dataToFilter().filter((item) => {
        const startsWith = item.salary
          .toLowerCase()
          .startsWith(value.toLowerCase())

        const includes = item.salary.toLowerCase().includes(value.toLowerCase())

        if (startsWith) {
          return startsWith
        } else if (!startsWith && includes) {
          return includes
        } else return null
      })
      setFilteredData([...updatedData])
      setSearchSalary(value)
    }
  }

  // ** Function to handle date filter
  const handleDateFilter = (range) => {
    const arr = []
    let updatedData = []
    const dataToFilter = () => {
      if (
        searchEmail.length ||
        searchName.length ||
        searchPost.length ||
        searchCity.length ||
        searchSalary.length
      ) {
        return filteredData
      } else {
        return data
      }
    }

    range.map((i) => {
      const date = new Date(i)

      const year = date.getFullYear()

      let month = (1 + date.getMonth()).toString()
      month = month.length > 1 ? month : `0${month}`

      let day = date.getDate().toString()
      day = day.length > 1 ? day : `0${day}`

      arr.push(`${month}/${day}/${year}`)
      return true
    })

    setPicker(range)

    if (range.length) {
      updatedData = dataToFilter().filter((item) => {
        return (
          new Date(item.start_date).getTime() >= new Date(arr[0]).getTime() &&
          new Date(item.start_date).getTime() <= new Date(arr[1]).getTime()
        )
      })
      setFilteredData([...updatedData])
      setPicker(range)
    }
  }

  return (
    <Fragment>
      <Card>
        <CardHeader className="border-bottom">
          <CardTitle tag="h4">Advance Search</CardTitle>
        </CardHeader>
        <CardBody>
          <Row form className="mt-1 mb-50">
            <Col lg="4" md="6">
              <FormGroup>
                <Label for="name">Name:</Label>
                <Input
                  id="name"
                  placeholder="Bruce Wayne"
                  value={searchName}
                  onChange={handleNameFilter}
                />
              </FormGroup>
            </Col>
            <Col lg="4" md="6">
              <FormGroup>
                <Label for="email">Email:</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Bwayne@email.com"
                  value={searchEmail}
                  onChange={handleEmailFilter}
                />
              </FormGroup>
            </Col>
            <Col lg="4" md="6">
              <FormGroup>
                <Label for="post">Post:</Label>
                <Input
                  id="post"
                  placeholder="Web Designer"
                  value={searchPost}
                  onChange={handlePostFilter}
                />
              </FormGroup>
            </Col>
            <Col lg="4" md="6">
              <FormGroup>
                <Label for="city">City:</Label>
                <Input
                  id="city"
                  placeholder="San Diego"
                  value={searchCity}
                  onChange={handleCityFilter}
                />
              </FormGroup>
            </Col>
            <Col lg="4" md="6">
              <FormGroup>
                <Label for="date">Date:</Label>
                <Flatpickr
                  className="form-control"
                  id="date"
                  value={Picker}
                  options={{ mode: 'range', dateFormat: 'm/d/Y' }}
                  onChange={(date) => handleDateFilter(date)}
                />
              </FormGroup>
            </Col>
            <Col lg="4" md="6">
              <FormGroup>
                <Label for="salary">Salary:</Label>
                <Input
                  id="salary"
                  placeholder="10000"
                  value={searchSalary}
                  onChange={handleSalaryFilter}
                />
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
        <DataTable
          noHeader
          pagination
          columns={advSearchColumns}
          paginationPerPage={7}
          className="react-dataTable"
          sortIcon={<ChevronDown size={10} />}
          paginationDefaultPage={currentPage + 1}
          paginationComponent={CustomPagination}
          data={dataToRender()}
        />
      </Card>
    </Fragment>
  )
}
