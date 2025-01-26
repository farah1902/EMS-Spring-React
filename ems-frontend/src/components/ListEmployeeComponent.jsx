import React, {useEffect, useState} from 'react'
import { deleteEmployee, listEmployees } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'

const ListEmployeeComponent = () => {


    const [employees, setEmployees] = useState([])

    const navigator = useNavigate();

    useEffect(() => {
        getAllEmployees();
    }, [])

    function getAllEmployees(){
        listEmployees().then((response) => {
            setEmployees(response.data);
        }).catch(error =>{
            console.error(error);
        })
    }

    function addNewEmployee(){
        navigator('/add-employee')
    }

    function updateEmployee(id){
        navigator(`/edit-employee/${id}`)
    }

    function removeEmployee(id){
        console.log(id);

        //confirmation pup-up
        const confirmDelete = window.confirm(`Are you sure you want to delete this employee (ID: ${id}) ?`);

        if(confirmDelete) {
            //if the user confirms, proceed the deletion
            deleteEmployee(id).then((response) => {
                getAllEmployees();
            }).catch(error => {
                console.error(error);
            })
        }
        else {
            // If the user cancels, do nothing
            console.log("Deletion canceled.");
        }
    }

/*     const dummyData = [
        {
            "id": 1,
            "firstName": "Saad",
            "lastName": "Farah",
            "email": "s@gmail.com"
        },
        {
            "id": 2,
            "firstName": "Sd",
            "lastName": "Fa",
            "email": "sd@gmail.com"
        },
        {
            "id": 3,
            "firstName": "Saa",
            "lastName": "Fara",
            "email": "sa@gmail.com"
        },
        {
            "id": 4,
            "firstName": "Ali",
            "lastName": "Farah",
            "email": "ali@gmail.com"
        },
        {
            "id": 5,
            "firstName": "Hafsa",
            "lastName": "Farah",
            "email": "h@gmail.com"
        }
    ] */

  return (
    <div className='container'>

        <h2 className='text-center'>List of Employees</h2>
        
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Employee Id</th>
                    <th>Employee First Name</th>
                    <th>Employee Last Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {  /* dummyData */
                    employees.map(employee =>
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>
                                <button className='btn btn-info' onClick={() => updateEmployee(employee.id)}>Update</button>
                                <button className='btn btn-danger' onClick={() => removeEmployee(employee.id)}
                                    style={{marginLeft: '10px'}}
                                    >Delete</button>
                            </td>
                            
                        </tr>
                    )
                }

            </tbody>
        </table>
        <button type="button" className="btn btn-outline-primary mb-2" onClick={addNewEmployee}>Add Employee</button>
    </div>
  )
}

export default ListEmployeeComponent