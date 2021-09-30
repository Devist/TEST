import React, { useEffect } from 'react'

// ** 커스텀 컴포넌트
import Faqs from './Faqs'
import FaqFilter from './FaqFilter'
import FaqContact from './FaqContact'

// ** 스타일
import '@styles/react/apps/app-users.scss'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import '@styles/base/pages/page-faq.scss'

/** ************************************************************************
 * FAQ 페이지
 * 자주 묻는 질문과 답변을 구성하여 화면에 보여줍니다.
 * 서버에 별도로 구성하지 않기 때문에, mock 데이터를 활용합니다.
 *************************************************************************** */
function Faq() {
  return (
    <div id={'faq'}>
      <FaqFilter />
      <Faqs />
      <FaqContact />
    </div>
  )
}

export default Faq
