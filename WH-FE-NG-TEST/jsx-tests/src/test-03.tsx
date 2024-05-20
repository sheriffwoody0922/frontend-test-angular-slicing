/**
 * In the following React template, create a simple form at the top that allows the user to enter in a first name, last name, and phone number and there should be a submit button. 
 * Once the submit button is pressed, the information should be displayed in a list below (automatically sorted by last name) along with all the previous information that was entered.
 * This way the application can function as a simple phone book. 
 * When your application loads, the input fields (not the phone book list) should be prepopulated with the following values already:
 * 
    First name = Coder
    Last name = Byte
    Phone = 8885559999
 * 
 */

import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const style = {
    table: {
        borderCollapse: "collapse"
    },
    tableCell: {
        border: '1px solid gray',
        margin: 0,
        padding: '5px 10px',
        width: 'max-content',
        minWidth: '150px'
    },
    form: {
        container: {
            padding: '20px',
            border: '1px solid #F0F8FF',
            borderRadius: '15px',
            width: 'max-content',
            marginBottom: '40px'
        },
        inputs: {
            marginBottom: '5px'
        },
        submitBtn: {
            marginTop: '10px',
            padding: '10px 15px',
            border: 'none',
            backgroundColor: 'lightseagreen',
            fontSize: '14px',
            borderRadius: '5px'
        }
    }
} as const;

function PhoneBookForm({ addEntryToPhoneBook }) {
    const [firstName, setFirstName] = useState('Coder');
    const [lastName, setLastName] = useState('Byte');
    const [phone, setPhone] = useState('8885559999');

    const handleSubmit = (e) => {
        e.preventDefault();
        addEntryToPhoneBook({ firstName, lastName, phone });
    }

    return (
        <form onSubmit={handleSubmit} style={style.form.container}>
            <label>First name:</label>
            <br />
            <input
                style={style.form.inputs}
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                type='text'
            />
            <br />
            <label>Last name:</label>
            <br />
            <input
                style={style.form.inputs}
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                type='text'
            />
            <br />
            <label>Phone:</label>
            <br />
            <input
                style={style.form.inputs}
                value={phone}
                onChange={e => setPhone(e.target.value)}
                type='text'
            />
            <br />
            <input
                style={style.form.submitBtn}
                type='submit'
                value='Add User'
            />
        </form>
    )
}

function InformationTable({ entries }) {
    // Sort entries by last name
    const sortedEntries = entries.sort((a, b) => a.lastName.localeCompare(b.lastName));

    return (
        <table style={style.table} className='informationTable'>
            <thead>
                <tr>
                    <th style={style.tableCell}>First name</th>
                    <th style={style.tableCell}>Last name</th>
                    <th style={style.tableCell}>Phone</th>
                </tr>
            </thead>
            <tbody>
                {sortedEntries.map((entry, index) => (
                    <tr key={index}>
                        <td style={style.tableCell}>{entry.firstName}</td>
                        <td style={style.tableCell}>{entry.lastName}</td>
                        <td style={style.tableCell}>{entry.phone}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

function Application(props) {
    const [entries, setEntries] = useState([]);

    const addEntryToPhoneBook = (entry) => {
        setEntries([...entries, entry]);
    }

    return (
        <section>
            <PhoneBookForm addEntryToPhoneBook={addEntryToPhoneBook} />
            <InformationTable entries={entries} />
        </section>
    );
}
    
ReactDOM.render(
    <Application />,
    document.getElementById('test-03')
);