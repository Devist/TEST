import { AGGREGATE_BASE_2, DATA_TYPE, ILabel, ILabelData } from './label.types'
import { Label } from './label'
import { mockCustom } from '../custom/custom.mock'
import { YN } from '../common-enum'

export const mockLabelData = (): ILabelData[] => [
  {
    id: 10174,
    name: 'abnormal_by_nid',
    description: '테스트용',
    data_type: DATA_TYPE.JSON,
    simple_description: 'Abnormal NID 유저',
    key_description: '키설명',
    value_description: '값 설명',
    gbq_dataset_name: 'user_labels_test',
    gbq_table_name: 'label_abnormal_by_nid',
    is_enabled: YN.NO,
    department_name: '개인화서비스개발팀',
    manager_name: '홍승한',
    share_targets: 'hongsh93@netmarble.com',
    first_job_date: '2021-03-25',
    latest_job_date: '2021-03-25',
    latest_data_count: 38195633,
    latest_data_ts: 1616624186000,
    latest_data_completion_datetime: '2021-03-25 04:40:15',
    data_range_type: 0,
    data_range_extra: '',
    aggregate_base1: 0,
    aggregate_base2: AGGREGATE_BASE_2.ADID,
    update_range: 0,
    aggregate_range: 0,
    update_range_description: 'update_range 설명',
    adid_result_aggregation: 'count',
    created_datetime: '2021-03-25 03:34:56',
    modified_datetime: '2021-03-25 04:40:15',
    hashtags: [],
    external_requests: [],
    segment_job_definitions: [],
    profile: null
  },
  // validation check 위한
  {
    id: 10174,
    name: 'abnormal_by_nid',
    description: '테스트용',
    data_type: DATA_TYPE.BOOLEAN,
    simple_description: 'Abnormal NID 유저',
    key_description: '키설명',
    value_description: '값 설명',
    gbq_dataset_name: 'user_labels_test',
    gbq_table_name: 'label_abnormal_by_nid',
    is_enabled: YN.YES,
    department_name: '개인화서비스개발팀',
    manager_name: '홍승한',
    share_targets: 'hongsh93@netmarble.com',
    first_job_date: '2021-03-25',
    latest_job_date: '2021-03-25',
    latest_data_count: 38195633,
    latest_data_ts: 1616624186000,
    latest_data_completion_datetime: '2021-03-25 04:40:15',
    data_range_type: 0,
    data_range_extra: '',
    aggregate_base1: 0,
    aggregate_base2: AGGREGATE_BASE_2.ALL,
    update_range: 0,
    aggregate_range: 0,
    update_range_description: 'update_range 설명',
    adid_result_aggregation: 'count',
    created_datetime: '2021-03-25 03:34:56',
    modified_datetime: '2021-03-25 04:40:15',
    hashtags: [],
    external_requests: [],
    segment_job_definitions: [],
    profile: null
  }
]

export const mockLabel = (data: ILabelData[] = mockLabelData()): ILabel[] =>
  data.map((item) => new Label(item, mockCustom()[0]))
