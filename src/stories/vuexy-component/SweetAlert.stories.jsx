import Swal from 'sweetalert2'
import { ThumbsUp, ThumbsDown } from 'react-feather'
import withReactContent from 'sweetalert2-react-content'
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Button,
  CardText,
  Row,
  Col
} from 'reactstrap'

export default {
  title: '컴포넌트 (vuexy)/🎄 molecules/Sweet Alert',
  component: Card,
  parameters: {
    docs: {
      description: {
        component:
          '화면상에 영역을 구분할 때 사용합니다. 간단하게 사용할 때는 단순히 ```<hr/>``` 태그를 사용해도 됩니다.',
        subcomponents: {
          IconOnly: 'hello'
        }
      }
    }
  }
}

export const BasicSweetAlert = () => {
  const MySwal = withReactContent(Swal)

  const handleBasicTitleAlert = () => {
    return MySwal.fire({
      title: 'Any fool can use a computer',
      customClass: {
        confirmButton: 'btn btn-primary'
      },
      buttonsStyling: false
    })
  }

  const handleTitleAlert = () => {
    return MySwal.fire({
      title: 'The Internet?,',
      text: 'That thing is still around?',
      customClass: {
        confirmButton: 'btn btn-primary'
      },
      buttonsStyling: false
    })
  }

  const handleFooterAlert = () => {
    return MySwal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: '<a href="javascript:void(0);">Why do I have this issue?</a>',
      customClass: {
        confirmButton: 'btn btn-primary'
      },
      buttonsStyling: false
    })
  }

  const handleHTMLAlert = () => {
    return MySwal.fire({
      title: '<strong>HTML <u>example</u></strong>',
      icon: 'info',
      html:
        'You can use <b>bold text</b>, ' +
        '<a href="https://pixinvent.com/" target="_blank">links</a> ' +
        'and other HTML tags',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: (
        <span className="align-middle">
          <ThumbsUp className="mr-50" size={15} />
          <span className="align-middle">Great!</span>
        </span>
      ),
      cancelButtonText: <ThumbsDown size={15} />,
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-danger ml-1'
      },
      buttonsStyling: false
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Basic</CardTitle>
      </CardHeader>
      <CardBody>
        <CardText className="mb-0">
          SweetAlert automatically centers itself on the page and looks great no
          matter if you're using a desktop computer, mobile or tablet. It's even
          highly customizable, as you can see below!
        </CardText>
        <div className="demo-inline-spacing">
          <Button color="primary" onClick={handleBasicTitleAlert} outline>
            Basic
          </Button>
          <Button color="primary" onClick={handleTitleAlert} outline>
            With Title
          </Button>
          <Button color="primary" onClick={handleFooterAlert} outline>
            With Footer
          </Button>
          <Button color="primary" onClick={handleHTMLAlert} outline>
            HTML
          </Button>
        </div>
      </CardBody>
    </Card>
  )
}

export const SweetAlertTypes = () => {
  const MySwal = withReactContent(Swal)

  const handleSuccess = () => {
    return MySwal.fire({
      title: 'Good job!',
      text: 'You clicked the button!',
      icon: 'success',
      customClass: {
        confirmButton: 'btn btn-primary'
      },
      buttonsStyling: false
    })
  }

  const handleInfo = () => {
    return MySwal.fire({
      title: 'Info!',
      text: 'You clicked the button!',
      icon: 'info',
      customClass: {
        confirmButton: 'btn btn-primary'
      },
      buttonsStyling: false
    })
  }

  const handleWarning = () => {
    return MySwal.fire({
      title: 'Warning!',
      text: ' You clicked the button!',
      icon: 'warning',
      customClass: {
        confirmButton: 'btn btn-primary'
      },
      buttonsStyling: false
    })
  }

  const handleError = () => {
    return MySwal.fire({
      title: 'Error!',
      text: ' You clicked the button!',
      icon: 'error',
      customClass: {
        confirmButton: 'btn btn-primary'
      },
      buttonsStyling: false
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Types</CardTitle>
      </CardHeader>
      <CardBody>
        <CardText className="mb-0">
          SweetAlert comes with 4 built-in types which will show a corresponding
          icon animation: "warning", "error", "success" and "info".
        </CardText>
        <div className="demo-inline-spacing">
          <Button color="success" onClick={handleSuccess} outline>
            Success
          </Button>
          <Button color="danger" onClick={handleError} outline>
            Error
          </Button>
          <Button color="warning" onClick={handleWarning} outline>
            Warning
          </Button>
          <Button color="info" onClick={handleInfo} outline>
            Info
          </Button>
        </div>
      </CardBody>
    </Card>
  )
}

export const BasicSweetCallback = () => {
  const MySwal = withReactContent(Swal)

  const handleConfirmText = () => {
    return MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-danger ml-1'
      },
      buttonsStyling: false
    }).then(function (result) {
      if (result.value) {
        MySwal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        })
      }
    })
  }

  const handleConfirmCancel = () => {
    return MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-danger ml-1'
      },
      buttonsStyling: false
    }).then(function (result) {
      if (result.value) {
        MySwal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        })
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: 'Cancelled',
          text: 'Your imaginary file is safe :)',
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        })
      }
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Callback</CardTitle>
      </CardHeader>
      <CardBody>
        <Row>
          <Col className="mb-2 mb-md-0" md="6" sm="12">
            <h5 className="mb-1">Confirm Button Text</h5>
            <Button color="primary" onClick={handleConfirmText} outline>
              Confirm Text
            </Button>
          </Col>

          <Col md="6" sm="12">
            <h5 className="mb-1">Confirm Button Color</h5>
            <Button color="primary" onClick={handleConfirmCancel} outline>
              Confirm & cancel
            </Button>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}
