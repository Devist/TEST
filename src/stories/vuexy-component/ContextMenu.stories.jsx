import { Fragment } from 'react'
import Avatar from '@core-components/avatar'
import { toast } from 'react-toastify'
import { Check } from 'react-feather'
import { Card, CardHeader, CardBody, CardTitle, Button } from 'reactstrap'
import { Menu, Item, useContextMenu } from 'react-contexify'

export default {
  title: '컴포넌트 (vuexy)/🎄 molecules/Context Menu',
  component: Fragment,
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

const ToastContent = ({ text }) => (
  <Fragment>
    <div className="toastify-header pb-0">
      <div className="title-wrapper">
        <Avatar size="sm" color="success" icon={<Check />} />
        <h6 className="toast-title">Clicked {text}</h6>
      </div>
    </div>
  </Fragment>
)

export const ContextMenu = () => {
  const { show } = useContextMenu({
    id: 'menu_left'
  })

  const handleClick = (text) => {
    toast.success(<ToastContent text={text} />, {
      hideProgressBar: true,
      closeButton: false
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Left Click</CardTitle>
      </CardHeader>
      <CardBody>
        <Button color="primary" onClick={show} outline>
          Left Click On Me
        </Button>
        <Menu id="menu_left">
          <Item onClick={() => handleClick('Option 1')}>Option 1</Item>
          <Item onClick={() => handleClick('Option 2')}>Option 2</Item>
        </Menu>
      </CardBody>
    </Card>
  )
}
