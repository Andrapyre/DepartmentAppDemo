import type { NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import React, { useState } from "react"
import { Button, FormControl, InputGroup } from "react-bootstrap"
import DepartmentCard from "../components/DepartmentCard"
import { IDepartment } from "../models/Department"
import styles from "../styles/Home.module.css"

const Home: NextPage = () => {
  const initialState = [
    {
      departmentName: "Ancient Near East",
      departmentId: "e2847dde-00e5-44c6-b1df-24cb1f86e2a3",
      contactName: "John Tabath",
      contactEmail: "j.tabath@sampleuni.edu",
      contactPhone: "(413)-335-7844",
    },
    {
      departmentName: "Philosophy",
      departmentId: "b99d6b16-8c89-4739-9247-3df38cc14137",
      contactName: "Myrtle Brockhingham",
      contactEmail: "m.brockingham@sampleuni.edu",
      contactPhone: "(413)-802-9664",
    },
    {
      departmentName: "Political Science",
      departmentId: "cb55472c-b524-42f6-9c9f-272359bebf01",
      contactName: "Sam Jackson",
      contactEmail: "s.jackson@sampleuni.edu",
      contactPhone: "(413)-789-4177",
    },
    {
      departmentName: "Mathematics",
      departmentId: "8e9fe666-940b-4e6e-b1b3-5915e53f208e",
      contactName: "Doris Clayport",
      contactEmail: "d.clayport@sampleuni.edu",
      contactPhone: "(413)-229-7635",
    },
  ]

  const [departments, setDepartments] = useState<IDepartment[]>(initialState)
  const [searchResults, setSearchResults] = useState<IDepartment[]>([])

  const searchDepartments = (searchValue: string) => {
    if (searchValue) {
      const newSearchResults = departments.filter((department) => {
        const doesSearchIncludeDepartmentName =
          department.departmentName.includes(searchValue)
        const doesSearchIncludeLCDepartmentName = department.departmentName
          .toLowerCase()
          .includes(searchValue)
        const doesSearchIncludeDepartmentId =
          department.departmentId.includes(searchValue)
        const doesSearchIncludeContactName =
          department.contactName.includes(searchValue)
        const doesSearchIncludeContactEmail =
          department.contactEmail.includes(searchValue)
        const doesSearchIncludeContactPhone =
          department.contactPhone.includes(searchValue)
        return (
          doesSearchIncludeLCDepartmentName ||
          doesSearchIncludeDepartmentName ||
          doesSearchIncludeDepartmentId ||
          doesSearchIncludeContactName ||
          doesSearchIncludeContactEmail ||
          doesSearchIncludeContactPhone
        )
      })
      setSearchResults(newSearchResults)
    } else {
      setSearchResults([])
    }
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Department Demo App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h5>Departments</h5>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Search for Department"
            aria-label="Search for Department"
            aria-describedby="basic-addon2"
            onChange={(e) => searchDepartments(e.target.value)}
          />

          <InputGroup.Append>
            <Button variant="success">
              <Link
                // className="createDepLink"
                href="/departments/create"
              >
                <a>Create New Department</a>
              </Link>
            </Button>
          </InputGroup.Append>
          <div className="searchDropdown">
            <div className="searchResult">
              {searchResults.map((result) => {
                return (
                  <div key={result.departmentId}>
                    <Link
                      // className="navlink dropdown-item"
                      href={`/departments${result.departmentId}`}
                    >
                      <a>{result.departmentName}</a>
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
        </InputGroup>
        {departments.map((department) => {
          return (
            <DepartmentCard
              key={department.departmentId}
              department={department}
            ></DepartmentCard>
          )
        })}
      </div>
      )
    </div>
  )
}

export default Home
