import Head from "next/head"
import React from "react"
import DepartmentForm from "../../components/DepartmentForm"

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
