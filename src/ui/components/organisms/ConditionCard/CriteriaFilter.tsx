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

const options = [
  { value: 'COUNT', label: 'COUNT' },
  { value: 'MAX', label: 'MAX' },
  { value: 'MIN', label: 'MIN' },
  { value: 'CONCAT', label: 'CONCAT' },
  { value: 'AVG', label: 'AVG' }
]

const valueOptions = [
  { value: '=', label: '=' },
  { value: '!=', label: '!=' },
  { value: '>', label: '>' },
  { value: '<', label: '<' },
  { value: '>=', label: '>=' },
  { value: '<=', label: '<=' }
]

function CriteriaFilter({ condition }: Props) {
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

  const random = Math.random()

  const deleteForm = (e: any) => {
    e.preventDefault()
    e.target.closest('form').remove()
  }

  return (
    <div className="d-flex flex-column justify-content-between font-small-3">
      <strong className="mb-little">집계 필터</strong>
      <Row>
        <Col sm="12" md="4">
          <CustomInput
            id={`radio-criteria-condition-all-${Math.random()}`}
            name={`radio-criteria-condition-${random}`}
            type="radio"
            label="모두 집계"
            checked={!showSetArea}
            onChange={() => setShowSetArea(false)}
          />
        </Col>
        <Col sm="12" md="8">
          <CustomInput
            id={`radio-criteria-condition-part-${Math.random()}`}
            name={`radio-criteria-condition-${random}`}
            type="radio"
            label="일부 집계"
            checked={showSetArea}
            onChange={() => {
              setShowSetArea(true)
              setCount(0)
            }}
          />
        </Col>
      </Row>

      {showSetArea && count > 0 && (
        <div className="mt-1">
          <Repeater count={count}>
            {(i: any) => (
              <Form key={i}>
                {i > 0 && <div className="mb-little font-small-1">그리고</div>}
                <div className="d-flex justify-content-between align-items-center mb-little">
                  <div style={{ width: '30%' }}>
                    <Select
                      isClearable={false}
                      theme={selectThemeColors}
                      className={classnames('react-select criteria-select', {
                        'is-invalid': !currentOption
                      })}
                      classNamePrefix="select"
                      options={options}
                      defaultValue={{ value: 'COUNT', label: 'COUNT' }}
                      onChange={(data: any) => setCurrentOption(data)}
                      placeholder={<div className="text-muted">조건</div>}
                      style={{ fontSize: 9 }}
                    />
                  </div>
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
                  <div style={{ width: '30%' }}>
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
      {showSetArea && count === 0 && (
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
  )
}

export default CriteriaFilter
