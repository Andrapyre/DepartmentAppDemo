import Head from "next/head"
import { useRouter } from "next/router"
import React from "react"
import DepartmentForm from "../../components/DepartmentForm"
import { IDepartment } from "../../store/slices/departments"

export default function DepartmentPage() {
  const router = useRouter()
  const { pid } = router.query

  const validatePid = (id: unknown): string => {
    return id as string
  } //expand this later. Should return page error if string cannot be parsed

  const department: IDepartment = {
    departmentName: "History",
    departmentId: validatePid(pid),
    contactEmail: "john@smith.com",
    contactPhone: "724-825-9373",
    contactName: "John Smith",
  }

  return (
    <div>
      <Head>
        <title>{`${department.departmentName} Department`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DepartmentForm isCreate={false} department={department} />
    </div>
  )
}
