// import { Schedule } from './schedule'
// import { ISchedule, IScheduleData } from './schedule.types'

// export const mockScheduleData = (): IScheduleData[] => [
//   {
//     created_datetime: '2021-04-22T08:15:29.000Z',
//     deliverys: IDeliveryData[],
//     department_name: string,
//     duration_seconds: number,
//     end_datetime: number,
//     exec_direct: YN,
//     gcsc_context: {
//       type: 'HTTP'
//       method: 'PUT'
//       uri: 'http://trigger:9102/trigger/segment/job'
//       timezone: 'Asia/Seoul'
//     },
//     gcsc_job_name: string,
//     id: number,
//     ip: string,
//     is_enabled: YN,
//     life_cycle?: ILifeCycleData,
//     life_cycle_exclueds?: [],
//     mail: string,
//     manager_name: string,
//     modified_datetime: string,
//     name: string,
//     phone: string,
//     schedule: string,
//     segment_job_definition_id: number,
//     start_datetime: string
//   }
// ]

// export const mockSchedules = (
//   data: IScheduleData[] = mockScheduleData()
// ): ISchedule[] => data.map((item) => new Schedule(item))
