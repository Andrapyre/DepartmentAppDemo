import React, { ChangeEvent, ChangeEventHandler, Component } from "react"
import Form from "react-bootstrap/Form"
import Col from "react-bootstrap/Col"

interface Props {
  changeHandler: (name: string, value: string) => void
  departmentName: string
  departmentValue: string
  readOnly?: boolean
  label: string
}

interface FormControlEvent {
  name: string
  value: string
}

export default function Field({
  changeHandler,
  departmentName,
  departmentValue,
  readOnly,
  label,
}: Props) {
  const handleChange = (evt: ChangeEvent<FormControlEvent>) =>
    changeHandler(evt.target.name, evt.target.value)
  return (
    <Form.Row>
      <Form.Label column="lg" lg={2}>
        {label}
      </Form.Label>
      <Col>
        <Form.Control
          readOnly={readOnly}
          name={departmentName}
          onChange={handleChange}
          size="lg"
          type="text"
          value={departmentValue}
        />
      </Col>
    </Form.Row>
  )
}
