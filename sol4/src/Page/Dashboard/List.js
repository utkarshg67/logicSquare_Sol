import React, { useState, useEffect } from 'react';
import { FaTrash } from "react-icons/fa";
import { HiOutlinePencilAlt } from "react-icons/hi";

function List({ employees, handleEdit, handleDelete }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [shuffledEmployees, setShuffledEmployees] = useState([]);

    useEffect(() => {
        shuffleEmployees();
    }, []);

    const shuffleEmployees = () => {
        const shuffled = [...employees].sort(() => Math.random() - 0.5);
        setShuffledEmployees(shuffled);
    };

    const filteredEmployees = shuffledEmployees.filter(employee => {
        const fullName = (employee.firstName && employee.lastName) ? `${employee.firstName} ${employee.lastName}`.toLowerCase() : '';
        const designation = employee.designation ? employee.designation.toLowerCase() : '';
        const query = searchQuery.toLowerCase();
        return fullName.includes(query) || designation.includes(query);
    });

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <div className='contain-table'>
            <input
                type="text"
                placeholder="Search by name "
                value={searchQuery}
                onChange={handleSearchInputChange}
                style={{ marginBottom: '10px', width: '200px', marginRight: '10px' }}
            />
            <table className='striped-table'>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Salary</th>
                        <th>Age</th>
                        <th colSpan={2} className="text-center">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEmployees.length > 0 ? (
                        filteredEmployees.map((employee, i) => (
                            <tr key={employee.id}>
                                <td>{i + 1}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.email}</td>
                                <td>{employee.salary}</td>
                                <td>{employee.age}</td>
                                <td className="text-right">
                                    <button
                                        onClick={() => handleEdit(employee.id)}
                                        className="button muted-button"
                                    >
                                      <HiOutlinePencilAlt />  Edit
                                    </button>
                                </td>
                                <td className="text-left">
                                    <button
                                        onClick={() => handleDelete(employee.id)}
                                        className="button muted-button"
                                    >
                                      <FaTrash />  Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7}>No Employees</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default List;
