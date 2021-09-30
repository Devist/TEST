import React, { createContext } from 'react'

import { UserStore } from './modules/UserStore'
import { NoticeStore } from './modules/NoticeStore'

import LabelStore from '@src/stores/modules/LabelStore'
import { AppStore } from '@src/stores/modules/AppStore'
import LabelHistoryStore from '@src/stores/modules/LabelHistoryStore'
import SegmentStore from '@src/stores/modules/SegmentStore'
import SegmentMakeupStore from '@src/stores/modules/SegmentMakeupStore'
import KeywordStore from './modules/KeywordStore'

export default class RootStore {
  appStore
  userStore
  noticeStore
  labelStore
  labelHistoryStore
  segmentMakeupStore
  segmentStore
  keywordStore

  constructor() {
    this.appStore = new AppStore()
    this.userStore = new UserStore()
    this.noticeStore = new NoticeStore()
    this.labelStore = new LabelStore(this)
    this.labelHistoryStore = new LabelHistoryStore(this)
    this.segmentMakeupStore = new SegmentMakeupStore(this)
    this.segmentStore = new SegmentStore(this)
    this.keywordStore = new KeywordStore(this)
  }
}

const StoresContext = React.createContext(new RootStore())
export const useStores = () => React.useContext(StoresContext)
