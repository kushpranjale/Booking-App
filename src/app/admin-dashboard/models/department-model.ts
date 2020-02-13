export interface Department {
    department_id: number;
    department_name: string;
    location: string;
    services: string;
}

export interface DepartmentManager {
    emp_username: string;
    department_id: number;
    department_name: string;
    from_date: string;
    to_date: string;
}
