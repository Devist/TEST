import React, { useState } from 'react'

// ** 컴포넌트
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Form,
  FormGroup,
  FormFeedback,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Label,
  Row,
  Col
} from 'reactstrap'
import { Plus, Edit2, X } from 'react-feather'

// ** 써드파티 컴포넌트
import { HtmlEditor, Toolbar, Editor } from '@aeaton/react-prosemirror'
import { plugins, schema, toolbar } from '@aeaton/react-prosemirror-config-default'
import classnames from 'classnames'
import Select from 'react-select'
import { toast } from 'react-toastify'

// ** 커스텀 컴포넌트
import { ToastComponent } from '@src/repositories/network/APIClient'

// ** 비즈니스
import { INotice, NOTICE_CATEGORY_TYPE } from '@src/entities'
import { useStores } from '@src/stores'
import { selectThemeColors } from '@ui/utility/Utils'

const categoryOptions = [
  { value: NOTICE_CATEGORY_TYPE.RELEASE, label: '배포' },
  { value: NOTICE_CATEGORY_TYPE.NOTICE, label: '공지' }
]

type Props = {
  type: string
  data?: INotice
  refresh: () => void
}

/** ************************************************************************
 * name : 공지사항 등록/수정 컴포넌트
 * description :
 * 공지사항 페이지에서 신규 등록 버튼을 클릭하거나,
 * 특정 공지사항에서 수정 버튼을 클릭하면 모달 형태로 표시됩니다.
 *************************************************************************** */
function CreateOrUpdate({ type, data, refresh }: Props) {
  const [disabledAnimation, setDisabledAnimation] = useState(false)
  const [category, setCategory] = useState<NOTICE_CATEGORY_TYPE>(
    NOTICE_CATEGORY_TYPE.RELEASE
  )
  const [title, setTitle] = useState<string>('')
  const [text, setText] = useState<string>('<p></p>')
  const [useForm, setUseForm] = useState<boolean>(false)
  const { userStore, noticeStore } = useStores()

  const createOrUpdateNotice = () => {
    setUseForm(true)
    if (title.length >= 2 && title.length < 50 && text.length > 7) {
      setDisabledAnimation(!disabledAnimation)
      let payload: INotice = {
        category: category,
        title: title,
        content: text,
        managerName: userStore.name,
        createdDatetime: ''
      }
      if (type === 'update') {
        payload.id = data?.id
      }
      noticeStore.createOrUpdate(payload).then(() => {
        if (type === 'create') {
          toast.success(
            <ToastComponent
              title="공지사항 생성"
              color="success"
              icon={<X />}
              message="공지사항이 생성되었습니다."
            />,
            {
              autoClose: 2000,
              hideProgressBar: true,
              closeButton: false
            }
          )
          refresh()
        } else {
          toast.success(
            <ToastComponent
              title="공지사항 수정"
              color="success"
              icon={<X />}
              message="공지사항이 수정되었습니다."
            />,
            {
              autoClose: 2000,
              hideProgressBar: true,
              closeButton: false
            }
          )
          refresh()
        }
      })
      setCategory(NOTICE_CATEGORY_TYPE.RELEASE)
      setTitle('')
      setText('<p></p>')
      setUseForm(false)
    }
  }

  const closeNotice = () => {
    setCategory(NOTICE_CATEGORY_TYPE.RELEASE)
    setDisabledAnimation(!disabledAnimation)
    setTitle('')
    setText('<p></p>')
    setUseForm(false)
  }

  const init = () => {
    if (data) {
      setTitle(data.title)
      setText(data.content)
      setCategory(data.category)
      setUseForm(false)

      setDisabledAnimation(!disabledAnimation)
    }
  }

  return (
    <div className="disabled-animation-modal">
      {type === 'create' && (
        <Button color="primary" onClick={() => setDisabledAnimation(!disabledAnimation)}>
          <Plus size={16} />
          <span className="align-middle ml-25">신규 등록</span>
        </Button>
      )}
      {type === 'update' && (
        <Button className="mr-2" color="primary" onClick={init}>
          <Edit2 size={16} />
        </Button>
      )}
      <Modal
        isOpen={disabledAnimation}
        toggle={closeNotice}
        size={'lg'}
        backdrop={'static'}
        className="modal-dialog-centered"
        fade={false}>
        <Form>
          <ModalHeader toggle={closeNotice}>
            {type === 'create' && <span>공지사항 신규 등록</span>}
            {type === 'update' && <span>공지사항 수정</span>}
          </ModalHeader>
          <ModalBody>
            <Card>
              <CardHeader className="pt-1 pb-0">
                <CardTitle tag="h4" style={{ width: '100%' }}>
                  <Row>
                    <Col className="mb-1" md="3">
                      <Label>카테고리</Label>
                      <Select
                        theme={selectThemeColors}
                        defaultValue={categoryOptions.find(
                          (element) => element.value === category
                        )}
                        className="react-select"
                        classNamePrefix="select"
                        options={categoryOptions}
                        onChange={(e: any) => {
                          setCategory(e.value)
                        }}
                        id={'notice-category'}
                      />
                    </Col>
                    <Col className="mt-2" md="9">
                      <FormGroup>
                        <Input
                          type="text"
                          value={title}
                          onChange={(e: any) => setTitle(e.target.value)}
                          placeholder="제목을 입력하세요."
                          invalid={useForm && (title.length < 2 || title.length >= 50)}
                        />
                        <FormFeedback>
                          {title.length === 0
                            ? '제목을 입력하세요.'
                            : '제목은 2글자 이상 50글자 미만입니다.'}
                        </FormFeedback>
                      </FormGroup>
                    </Col>
                  </Row>
                </CardTitle>
              </CardHeader>
              <CardBody>
                <FormGroup>
                  <div
                    className={classnames('react-select', {
                      'is-invalid': useForm && text.length <= 7
                    })}>
                    <HtmlEditor
                      schema={schema}
                      plugins={plugins}
                      value={text}
                      handleChange={setText}
                      debounce={250}>
                      <Toolbar toolbar={toolbar} />

                      <Editor />
                    </HtmlEditor>
                  </div>
                  <FormFeedback>내용을 입력하세요.</FormFeedback>
                </FormGroup>
              </CardBody>
            </Card>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={createOrUpdateNotice}>
              {type === 'create' && <span>등록</span>}
              {type === 'update' && <span>수정</span>}
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  )
}
export default CreateOrUpdate
