import React, { Component } from "react"
import Button from "react-bootstrap/Button"
import { Link } from "react-router-dom"
import InputGroup from "react-bootstrap/InputGroup"
import FormControl from "react-bootstrap/FormControl"
import DepartmentCard from "./DepartmentCard"

class Departments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      departments: [
        {
          departmentName: "Ancient Near East",
          apiKey: "e2847dde-00e5-44c6-b1df-24cb1f86e2a3",
          contactName: "John Tabath",
          email: "j.tabath@harvard.edu",
          phone: "(413)-335-7844",
        },
        {
          departmentName: "Philosophy",
          apiKey: "b99d6b16-8c89-4739-9247-3df38cc14137",
          contactName: "Myrtle Brockhingham",
          email: "m.brockingham@harvard.edu",
          phone: "(413)-802-9664",
        },
        {
          departmentName: "Political Science",
          apiKey: "cb55472c-b524-42f6-9c9f-272359bebf01",
          contactName: "Sam Jackson",
          email: "s.jackson@harvard.edu",
          phone: "(413)-789-4177",
        },
        {
          departmentName: "Mathematics",
          apiKey: "8e9fe666-940b-4e6e-b1b3-5915e53f208e",
          contactName: "Doris Clayport",
          email: "d.clayport@harvard.edu",
          phone: "(413)-229-7635",
        },
      ],
      searchResults: [],
    }
    this.deleteDepartment = this.deleteDepartment.bind(this)
  }
  deleteDepartment(index) {
    let newState = { ...this.state }
    newState.departments.splice(index, 1)
    this.setState(newState)
  }
  searchDepartments(searchValue) {
    if (searchValue) {
      const searchResults = this.state.departments.filter((department) => {
        const doesSearchIncludeDepartmentName =
          department.departmentName.includes(searchValue)
        const doesSearchIncludeLCDepartmentName = department.departmentName
          .toLowerCase()
          .includes(searchValue)
        const doesSearchIncludeAPIKey = department.apiKey.includes(searchValue)
        const doesSearchIncludeContactName =
          department.contactName.includes(searchValue)
        const doesSearchIncludeContactEmail =
          department.email.includes(searchValue)
        const doesSearchIncludeContactPhone =
          department.phone.includes(searchValue)
        return (
          doesSearchIncludeLCDepartmentName ||
          doesSearchIncludeDepartmentName ||
          doesSearchIncludeAPIKey ||
          doesSearchIncludeContactName ||
          doesSearchIncludeContactEmail ||
          doesSearchIncludeContactPhone
        )
      })
      let newState = { ...this.state }
      newState.searchResults = searchResults
      this.setState(newState)
    } else {
      let newState = { ...this.state }
      newState.searchResults = []
      this.setState(newState)
    }
  }
  render() {
    return (
      <div>
        <h5>Departments</h5>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Search for Department"
            aria-label="Search for Department"
            aria-describedby="basic-addon2"
            onChange={(e) => this.searchDepartments(e.target.value)}
          />

          <InputGroup.Append>
            <Button variant="success">
              <Link
                className="createDepLink"
                to={{
                  pathname: "/create",
                  isCreate: true,
                  department: this.state.departments[0],
                }}
              >
                Create New Department
              </Link>
            </Button>
          </InputGroup.Append>
          <div className="searchDropdown">
            <div className="searchResult">
              {this.state.searchResults.map((result) => {
                return (
                  <Link
                    key={result.apiKey}
                    className="navlink dropdown-item"
                    to={{
                      pathname: `/${result.apiKey}`,
                      department: result,
                      isCreate: false,
                    }}
                  >
                    {result.departmentName}
                  </Link>
                )
              })}
            </div>
          </div>
        </InputGroup>
        {this.state.departments.map((department, index) => {
          return (
            <DepartmentCard
              deleteHandler={this.deleteDepartment}
              index={index}
              key={department.apiKey}
              metadata={department}
            ></DepartmentCard>
          )
        })}
      </div>
    )
  }
}

export default Departments
