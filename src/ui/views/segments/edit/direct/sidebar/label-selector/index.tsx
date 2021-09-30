import Select from 'react-select'
import { selectThemeColors } from '@ui/utility/Utils'
import { Input } from 'reactstrap'
import { debounce } from '@src/utils/debounce'
import React from 'react'
import LabelCard from './LabelCard'
import { useStores } from '@src/stores'
import { IHashtag } from '@src/entities'
import { observer } from 'mobx-react'

type Option = {
  value: string | number
  label: string
}

const configureKeywordOptions = (keywords: IHashtag[]): Option[] => {
  return keywords.reduce((acc, keyword) => {
    acc.push({ value: keyword.id, label: keyword.hashtag })
    return acc
  }, [] as Option[])
}

/** ************************************************************************
 * name :
 * description :

 * todo 작성 필요
 *************************************************************************** */
function LabelSelector() {
  const { labelStore, keywordStore } = useStores()

  const keywordOptions: Option[] = configureKeywordOptions(keywordStore.keywords)

  const events = {
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => {
      labelStore.filterToSearch(e.target.value)
    },
    filterFromKeywords: (data: Option[]) => {
      const keywords = data.map(function (item) {
        return item['label']
      })
      labelStore.findFromKeywords(keywords)
    }
  }

  return (
    <>
      <div className="sg-list">
        <div className="font-small-3">필터 및 검색</div>
        <Select
          isClearable={false}
          theme={selectThemeColors}
          isMulti
          className="react-select m-little "
          classNamePrefix="select"
          size="small"
          options={keywordOptions}
          // onChange={(data: any) => setCurrentGames(data)}
          placeholder={<div className="text-muted">키워드 검색</div>}
          onChange={(data: any) => events.filterFromKeywords(data)}
        />
        <div className="m-little">
          <Input
            type="text"
            placeholder="검색어를 입력하세요."
            onChange={debounce(events.handleSearch, 300)}
          />
        </div>

        <div className="font-small-3 mt-2">레이블 목록</div>
        <ul className="pl-3">
          <li className="font-small-1 float-left li-game-color">게임 기준 집계</li>
          <li className="font-small-1 float-left li-personalized-color ml-3">
            개인화 ID 기준 집계
          </li>
        </ul>

        <div className="sg-filter-list">
          {labelStore.filteredLabels &&
            labelStore.filteredLabels.map((label) => <LabelCard label={label} />)}
          {!labelStore.filteredLabels &&
            labelStore.labels.map((label) => <LabelCard label={label} />)}
        </div>
      </div>
    </>
  )
}

export default observer(LabelSelector)
