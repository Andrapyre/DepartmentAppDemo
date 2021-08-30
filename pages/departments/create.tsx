import Head from "next/head"
import { useRouter } from "next/router"
import React from "react"
import DepartmentForm, { IDepartment } from "../../components/DepartmentForm"

export default function CreateDepartmentPage() {
  return (
    <div>
      <Head>
        <title>Create Department</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DepartmentForm isCreate={true} />
    </div>
  )
}
