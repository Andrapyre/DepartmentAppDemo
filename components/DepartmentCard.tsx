import React, { Component } from "react"
import Card from "react-bootstrap/Card"
import DropdownButton from "react-bootstrap/DropdownButton"
import Dropdown from "react-bootstrap/Dropdown"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBuilding } from "@fortawesome/free-solid-svg-icons"

interface Props {}

const DepartmentCard = (): string => {
  return "help"
}

// class Department extends Component {
//   constructor(props) {
//     super(props)
//     this.apiHREF = `/${props.metadata.apiKey}`
//     this.handleDelete = this.handleDelete.bind(this)
//   }
//   handleDelete() {
//     this.props.deleteHandler(this.props.index)
//   }
//   render() {
//     return (
//       <Card className="departmentCard">
//         <Card.Body>
//           <Card.Title>{this.props.metadata.departmentName}</Card.Title>
//           <div className="d-flex justify-content-center departmentCardContent">
//             <FontAwesomeIcon icon={faBuilding} size="6x" />
//           </div>
//           <div className="d-flex justify-content-center departmentCardContent">
//             <DropdownButton
//               id="dropdown-basic-button"
//               title="Open"
//               variant="success"
//               block="true"
//             >
//               <Link
//                 className="navlink dropdown-item"
//                 to={{
//                   pathname: this.apiHREF,
//                   department: this.props.metadata,
//                   isCreate: false,
//                 }}
//               >
//                 Edit
//               </Link>
//               <Dropdown.Item onClick={this.handleDelete}>Delete</Dropdown.Item>
//             </DropdownButton>
//           </div>
//         </Card.Body>
//       </Card>
//     )
//   }
// }

export default DepartmentCard
