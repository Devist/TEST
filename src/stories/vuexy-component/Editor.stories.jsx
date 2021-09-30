import { useState } from 'react'
import { EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'

import '@styles/react/libs/editor/editor.scss'

export default {
  title: '컴포넌트 (vuexy)/🎄 molecules/Editor',
  component: Card,
  parameters: {
    docs: {
      description: {
        component:
          '세그먼트 요약 정보에 사용됩니다' +
          "<br/> ```import { CardText } from 'reactstrap'```" +
          "<br/> ```import AppCollapse from '@core-components/app-collapse'```",
        subcomponents: {
          IconOnly: 'hello'
        }
      }
    }
  }
}

export const EditorControlled = () => {
  const [value, setValue] = useState(EditorState.createEmpty())

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Controlled Editor</CardTitle>
      </CardHeader>
      <CardBody>
        <Editor
          editorState={value}
          onEditorStateChange={(data) => setValue(data)}
        />
      </CardBody>
    </Card>
  )
}
