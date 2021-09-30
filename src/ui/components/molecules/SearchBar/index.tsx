import React from 'react'

// ** 컴포넌트
import { Search } from 'react-feather'
import { Row, Col, InputGroup, InputGroupAddon, Input, InputGroupText } from 'reactstrap'

// ** 유틸
import { debounce } from '@src/utils/debounce'

type Props = {
  placeholder: string
  onSearched: (searchText: string) => void
}

/** ************************************************************************
 * name :
 * description :

 * todo 작성 필요
 *************************************************************************** */
function ProductsSearchbar({ onSearched, placeholder }: Props) {
  const events = {
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => {
      /* 이벤트 객체를 무효화하지 않도록 React 에 신호 */
      e.persist()
      onSearched(e.target.value)
    }
  }
  return (
    <div id="ecommerce-searchbar" className="ecommerce-searchbar">
      <Row className="mt-1">
        <Col sm="12">
          <InputGroup className="input-group-merge">
            <Input
              className="search-product"
              placeholder={placeholder}
              onChange={debounce(events.handleSearch, 300, false)}
            />
            <InputGroupAddon addonType="append">
              <InputGroupText>
                <Search className="text-muted" size={14} />
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </Col>
      </Row>
    </div>
  )
}

export default ProductsSearchbar
