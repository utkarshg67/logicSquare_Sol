import React from 'react';
import Swal from 'sweetalert2';

import Header from './Header';
import List from './List';
import Add from './Add';
import Edit from './Edit';

import { employeesData } from '../../data';

function DeleteRow({ handleDelete, employeeId, firstName, lastName }) {
    const confirmDelete = () => {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: `Do you want to delete ${firstName} ${lastName}?`,
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        }).then(result => {
            if (result.value) {
                handleDelete(employeeId);
            }
        });
    };

    return (
        <button onClick={confirmDelete} className="button muted-button">
            Delete
        </button>
    );
}

export default DeleteRow;
