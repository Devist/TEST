import {
  CustomInput,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  FormFeedback
} from 'reactstrap'
import React, { useState } from 'react'
import { ICondition } from '@src/entities'

import Repeater from '@core-components/repeater'
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { X, Plus, Trash } from 'react-feather'
import { Controller, useForm } from 'react-hook-form'
import Select from 'react-select'
import { selectThemeColors } from '@ui/utility/Utils'
import classnames from 'classnames'

type Props = {
  condition: ICondition
}

const valueOptions = [
  { value: '=', label: '=' },
  { value: '!=', label: '!=' },
  { value: '>', label: '>' },
  { value: '<', label: '<' },
  { value: '>=', label: '>=' },
  { value: '<=', label: '<=' },
  { value: 'LIKE', label: 'LIKE' },
  { value: 'NOT LIKE', label: 'NOT LIKE' }
]

function ResultFilter({ condition }: Props) {
  const [showSetArea, setShowSetArea] = useState<boolean>(false)

  const [count, setCount] = useState(1)
  const { register, errors, handleSubmit, control } = useForm()
  const [currentOption, setCurrentOption] = useState({ value: 'COUNT', label: 'COUNT' })
  const [currentValueOption, setCurrentValueOption] = useState({ value: '=', label: '=' })

  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false)

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen)

  const increaseCount = () => {
    setCount(count + 1)
  }

  const deleteForm = (e: any) => {
    e.preventDefault()
    e.target.closest('form').remove()
    if (!e.target.closest('form')) setCount(0)
  }

  return (
    <div className="d-flex flex-column justify-content-between font-small-3 ">
      <strong className="mb-little">결과값 필터</strong>
      <div className="d-flex flex-column justify-content-between font-small-3 full-height">
        {count < 1 && <>모든 결과 포함</>}
        {showSetArea && (
          <div className="mt-1">
            <Repeater count={count}>
              {(i: any) => (
                <Form key={i}>
                  {i > 0 && <div className="mb-little font-small-1">그리고</div>}
                  <div className="d-flex justify-content-between align-items-center mb-little">
                    <div className="mx-little" style={{ width: '30%' }}>
                      <Select
                        isClearable={false}
                        theme={selectThemeColors}
                        className={classnames('react-select criteria-select', {
                          'is-invalid': !currentOption
                        })}
                        defaultValue={{ value: '=', label: '=' }}
                        classNamePrefix="select"
                        options={valueOptions}
                        onChange={(data: any) => setCurrentValueOption(data)}
                        placeholder={<div className="text-muted">조건</div>}
                        style={{ fontSize: 9 }}
                      />
                    </div>
                    <div style={{ width: '60%' }}>
                      <Input
                        isClearable={false}
                        theme={selectThemeColors}
                        className={classnames('', {
                          'is-invalid': !currentOption
                        })}
                        style={{ fontSize: 9 }}
                      />
                    </div>
                    <div className="d-flex justify-content-end align-items-center">
                      {count - 1 == i && (
                        <Dropdown
                          direction="right"
                          className="align-self-end"
                          isOpen={dropdownOpen}
                          toggle={toggleDropdown}>
                          <DropdownToggle tag="span" right>
                            <Plus
                              size={16}
                              className="mx-little cursor-pointer"
                              onClick={toggleDropdown}
                            />
                          </DropdownToggle>

                          <DropdownMenu>
                            <DropdownItem onClick={increaseCount}>AND</DropdownItem>
                            <DropdownItem>OR</DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      )}

                      <Trash size={16} className="cursor-pointer" onClick={deleteForm} />
                    </div>
                  </div>
                </Form>
              )}
            </Repeater>
          </div>
        )}
        {!showSetArea && (
          <Button
            color="primary"
            outline
            size="sm"
            className="align-self-end"
            onClick={() => {
              setShowSetArea(true)
              setCount(1)
            }}>
            + 추가
          </Button>
        )}
      </div>
    </div>
  )
}

export default ResultFilter
