import {
  ID_TYPE,
  IRestoreContent,
  ISegmentTemplate,
  ISegmentTemplateData
} from '@src/entities'
import { keysToCamel } from '@src/utils/snakeToCamel'

export class Template implements ISegmentTemplate {
  createdDatetime: string
  description: string
  id: number
  idType: ID_TYPE
  modifiedDatetime: string
  name: string
  restoreContent: { data: IRestoreContent[] }

  constructor(data: ISegmentTemplateData) {
    this.createdDatetime = data.created_datetime
    this.description = data.description
    this.id = data.id
    this.idType = data.id_type
    this.modifiedDatetime = data.modified_datetime
    this.name = data.name

    const restoreContent = data.restore_content.data.map((data) => keysToCamel(data))
    this.restoreContent = { data: restoreContent }
  }

  validate(): boolean {
    throw new Error('Method not implemented.')
  }
}
