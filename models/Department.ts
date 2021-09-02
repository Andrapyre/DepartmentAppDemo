export interface ICreateDepartment {
  departmentName: string
  contactName: string
  contactEmail: string
  contactPhone: string
}

export interface IDepartment {
  departmentId: string
  departmentName: string
  contactName: string
  contactEmail: string
  contactPhone: string
}

export class Department {
  public fromCreateDepartment(
    id: string,
    createDepartment: ICreateDepartment
  ): IDepartment {
    return {
      departmentId: id,
      departmentName: createDepartment.departmentName,
      contactName: createDepartment.contactName,
      contactEmail: createDepartment.contactEmail,
      contactPhone: createDepartment.contactPhone,
    }
  }
}
