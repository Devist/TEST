import { useState, Fragment } from 'react'

import UILoader from '../../ui/@core/components/ui-loader'
import Spinner from '../../ui/@core/components/spinner/Loading-spinner'
import {
  Card,
  CardHeader,
  CardTitle,
  CardText,
  CardBody,
  Button
} from 'reactstrap'

export default {
  title: '컴포넌트 (vuexy)/🎄 molecules/Blocking',
  component: UILoader,
  parameters: {
    docs: {
      description: {
        component:
          '세그먼트 요약 정보에 사용됩니다' +
          "<br/> ```import { useState, Fragment } from 'react' ```" +
          "<br/> ```import UILoader from '@core-components/ui-loader' ```" +
          "<br/> ```import Spinner from '@core-components/spinner/Loading-spinner' ```",
        subcomponents: {
          IconOnly: 'hello'
        }
      }
    }
  }
}

export const MessageBlocking = () => {
  const [block, setBlock] = useState(false)

  const handleBlock = () => {
    setBlock(true)

    setTimeout(() => {
      setBlock(false)
    }, 3000)
  }

  const Loader = () => {
    return (
      <Fragment>
        <Spinner />
        <CardText className="mb-0 mt-3 text-white">Please Wait...</CardText>
      </Fragment>
    )
  }

  return (
    <UILoader blocking={block} loader={<Loader />}>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Message</CardTitle>
        </CardHeader>
        <CardBody>
          <CardText>
            Lorem ipsum dolor sit amet, an vel affert soleat possim. Usu meis
            neglegentur ut, oporteat salutandi dignissim at mea. Pericula
            erroribus quaerendum ex duo, his autem accusamus ad, alienum
            detracto rationibus vis et. No est volumus ocurreret vituperata.
          </CardText>
          <Button color="primary" outline onClick={handleBlock}>
            Block
          </Button>
        </CardBody>
      </Card>
    </UILoader>
  )
}

export const BasicBlocking = () => {
  const [block, setBlock] = useState(false)

  const handleBlock = () => {
    setBlock(true)

    setTimeout(() => {
      setBlock(false)
    }, 2000)
  }

  return (
    <UILoader blocking={block}>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Basic</CardTitle>
        </CardHeader>
        <CardBody>
          <CardText>
            Lorem ipsum dolor sit amet, an vel affert soleat possim. Usu meis
            neglegentur ut, oporteat salutandi dignissim at mea. Pericula
            erroribus quaerendum ex duo, his autem accusamus ad, alienum
            detracto rationibus vis et. No est volumus ocurreret vituperata.
          </CardText>
          <Button color="primary" outline onClick={handleBlock}>
            Block
          </Button>
        </CardBody>
      </Card>
    </UILoader>
  )
}
