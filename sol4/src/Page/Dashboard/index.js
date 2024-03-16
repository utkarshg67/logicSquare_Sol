import React, { useState } from 'react';
import Swal from 'sweetalert2';

import Header from './Header';
import List from './List';
import Add from './Add';
import Edit from './Edit';

import { employeesData } from '../../data';

function Dashboard() {
    const [employees, setEmployees] = useState(employeesData);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = (id) => {
        const [employee] = employees.filter(employee => employee.id === id);

        setSelectedEmployee(employee);
        setIsEditing(true);
    }

    const handleDelete = (id) => {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        }).then(result => {
            if (result.value) {
                const [employee] = employees.filter(employee => employee.id === id);

                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: `${employee.firstName} ${employee.lastName}'s data has been deleted.`,
                    showConfirmButton: false,
                    timer: 1500,
                });

                setEmployees(employees.filter(employee => employee.id !== id));
            }
        });
    }

    const handleAddEmployee = () => {
        setIsAdding(true);
    }

    return (
        <div className='container'>
            <div className="dashboard-section">
                <div className="overview-section">
                    <h2>Basic Resource Management System</h2>
                    <h3>Total Employees: {employees.length}</h3>
                    {/* Add more overview statistics here */}
                </div>
                <div className="add-employee-section">
                    <button onClick={handleAddEmployee} className='round-button' >Add New Employee</button>
                </div>
            </div>
            <div className="employees-list">
                {!isAdding && !isEditing && (
                    <>
                        <Header setIsAdding={setIsAdding} />
                        <List
                            employees={employees}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                        />
                    </>
                )}
                {isAdding && (
                    <Add
                        employees={employees}
                        setEmployees={setEmployees}
                        setIsAdding={setIsAdding}
                    />
                )}
                {isEditing && (
                    <Edit
                        employees={employees}
                        selectedEmployee={selectedEmployee}
                        setEmployees={setEmployees}
                        setIsEditing={setIsEditing}
                    />
                )}
            </div>
        </div>
    );
}

export default Dashboard;
