import { AGGREGATE_BASE_1, DATA_TYPE } from '@src/entities'

export const aggregationFilter = [
  {
    id: 'all-condition',
    title: '전체',
    value: -1,
    defaultChecked: true
  },
  {
    id: 'personalized-condition',
    title: '개인화 ID 기준으로 집계',
    value: AGGREGATE_BASE_1.GAME
  },
  {
    id: 'game-condition',
    title: '게임 기준으로 집계',
    value: AGGREGATE_BASE_1.PERSONALIZED_ID
  }
]

export const dataTypeFilter = [
  {
    id: 'all-type-condition',
    title: '전체',
    value: '',
    defaultChecked: true
  },
  {
    id: 'number-type-condition',
    title: 'Number (숫자)',
    value: DATA_TYPE.NUMBER
  },
  {
    id: 'json-type-condition',
    title: 'JSON (키/값)',
    value: DATA_TYPE.JSON
  },
  {
    id: 'string-type-condition',
    title: 'STRING (문자열)',
    value: DATA_TYPE.STRING
  },
  {
    id: 'none-type-condition',
    title: 'NONE (없음)',
    value: DATA_TYPE.NONE
  },
  {
    id: 'time-type-condition',
    title: 'TIMESTAMP (날짜)',
    value: DATA_TYPE.TIMESTAMP
  },
  {
    id: 'boolean-type-condition',
    title: 'BOOLEAN (참/거짓)',
    value: DATA_TYPE.BOOLEAN
  }
]

export const bestKeywords = [
  {
    title: 'Active',
    total: 0,
    checked: false
  },
  {
    title: 'VIP',
    total: 0,
    checked: false
  },
  {
    title: '가입',
    total: 0,
    checked: false
  },
  {
    title: '가치',
    total: 0,
    checked: false
  },
  {
    title: '개인화',
    total: 0,
    checked: false
  },
  {
    title: '과금',
    total: 0,
    checked: false
  },
  {
    title: '국가',
    total: 0,
    checked: false
  },
  {
    title: '단골',
    total: 0,
    checked: false
  },
  {
    title: '레벨',
    total: 0,
    checked: false
  },
  {
    title: '미접속',
    total: 0,
    checked: false
  },
  {
    title: '이탈',
    total: 0,
    checked: false
  }
]
