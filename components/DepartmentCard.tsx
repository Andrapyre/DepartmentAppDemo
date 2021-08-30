import React from "react"
import Card from "react-bootstrap/Card"
import DropdownButton from "react-bootstrap/DropdownButton"
import Dropdown from "react-bootstrap/Dropdown"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBuilding } from "@fortawesome/free-solid-svg-icons"
import { IDepartment } from "./DepartmentForm"
interface Props {
  department: IDepartment
}

export default function DepartmentCard({ department }: Props) {
  const handleDelete = () => {
    //call redux delete from here
  }
  return (
    <Card className="departmentCard">
      <Card.Body>
        <Card.Title>{department.departmentName}</Card.Title>
        <div className="d-flex justify-content-center departmentCardContent">
          <FontAwesomeIcon icon={faBuilding} size="6x" />
        </div>
        <div className="d-flex justify-content-center departmentCardContent">
          <div style={{ display: "block" }}>
            <DropdownButton
              id="dropdown-basic-button"
              title="Open"
              variant="success"
            >
              <div className="navlink dropdown-item">
                <Link href={`/departments${department.departmentId}`}>
                  Edit
                </Link>
              </div>

              <Dropdown.Item onClick={handleDelete}>Delete</Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}
