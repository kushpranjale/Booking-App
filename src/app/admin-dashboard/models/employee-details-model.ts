export interface EmployeeDetail {
    emp_username: string;
    emp_password: string;
    first_name: string;
    last_name: string;
    gender: string;
    address: string;
    mobile: string;
    email: string;
    date_of_birth: Date;
    date_of_joining: Date;
    date_of_resign: Date;
    kyc_type: string;
    kyc_number: string;
    kyc_proof: string;
}

export interface EmployeeBankDetail {
    emp_username: string;
    bank_name: string;
    bank_branch: string;
    acc_no: string;
    IFSC_code: string;
    PAN_Id: string;
}

export interface EmployeeDepartmentDetail {
    emp_username: string;
    department_id: number;
    from_date: string;
    to_date: string;
}

export interface EmployeeJobDetail {
    emp_username: string;
    title: string;
    from_date: string;
    to_date: string;
}

export interface EmployeeSalariesDetail {
    emp_username: string;
    salary: string;
    from_date: string;
    to_date: string;
}
