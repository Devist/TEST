import Searchbar from '@ui/components/molecules/SearchBar'
import React from 'react'
import FilterCardSegmentTemplates from '@ui/components/organisms/FilterCards/FilterCardSegmentTemplates'

import '@styles/base/pages/app-ecommerce.scss'
import TemplateCard from '@ui/views/segments/templates/Card'

/** ************************************************************************
 * name :
 * description :

 * todo 작성 필요
 *************************************************************************** */
function Templates() {
  return (
    <>
      <FilterCardSegmentTemplates />
      <Searchbar
        placeholder="검색어를 입력하세요"
        onSearched={() => {
          console.log('hello')
        }}
      />
      <TemplateCard />
      <TemplateCard />
    </>
  )
}

export default Templates
