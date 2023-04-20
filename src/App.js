import React, { useState } from 'react';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [newUser, setNewUser] = useState({ name: '', email: '', age: '' });
  const [editedUser, setEditedUser] = useState({});
  const [editingId, setEditingId] = useState(null);

  const handleSort = (field) => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const handleAddUser = () => {
    const id = users.length + 1;
    if (newUser.name === '' || newUser.email === '' || newUser.age === '') {
          alert('Please, fill out all fields!');
        } else {
          setUsers([...users, { ...newUser, id }]);
          setNewUser({ name: '', email: '', age: '' });
        }
    
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (sortField) {
      if (sortOrder === 'asc') {
        return a[sortField] > b[sortField] ? 1 : -1;
      } else {
        return a[sortField] < b[sortField] ? 1 : -1;
      }
    } else {
      return a.id - b.id;
    }
  });

 
  const handleEditClick = (id) => {
    setEditingId(id);
    setEditedUser(users.find((user) => user.id === id));
  };

  const handleSaveClick = () => {
    setUsers(users.map((user) => {
      if (user.id === editedUser.id) {
        return editedUser;
      }
      return user;
    }));
    setEditingId(null);
    setEditedUser({...users});
  };

  const handleCancelClick = () => {
    setEditingId(null);
    setEditedUser({});
  };

  const removeUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className='wrapper'>
      <table className='table'>
        <thead className='table-header'>
          <tr>
            <th title="Натиснувши тут, Ви можете сортувати значення від низьких до високих і навпаки" onClick={() => handleSort('id')}>ID</th>
            <th title="Натиснувши тут, Ви можете сортувати значення від низьких до високих і навпаки" onClick={() => handleSort('name')}>Name</th>
            <th title="Натиснувши тут, Ви можете сортувати значення від низьких до високих і навпаки" onClick={() => handleSort('email')}>Email</th>
            <th title="Натиснувши тут, Ви можете сортувати значення від низьких до високих і навпаки" onClick={() => handleSort('age')}>Age</th>
          </tr>
        </thead>
        <tbody className='table-body'>
          {sortedUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                {editingId === user.id ? (
                <input
                  type="text"
                  value={editedUser.name || ''}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, name: e.target.value })
                  }
                />
              ) : (
                user.name
              )}
              </td>
              <td>
                {editingId === user.id ? (
                <input
                  type="text"
                  value={editedUser.email || ''}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, email: e.target.value })
                  }
                />
              ) : (
                user.email
              )}
              </td>
              <td>
                {editingId === user.id ? (
                <input
                  type="number"
                  value={editedUser.age || ''}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, age: e.target.value })
                  }
                />
              ) : (
                user.age
              )}
              </td>
              <td>
              {editingId === user.id ? (
                <>
                  <button className='table-body__btn' onClick={handleSaveClick}>Save</button>
                  <button className='table-body__btn' onClick={handleCancelClick}>Cancel</button>
                </>
              ) : (
                <>
                  <button className='table-body__btn' onClick={() => handleEditClick(user.id)}>Edit</button>
                  <button className='table-body__btn' onClick={() => removeUser(user.id)}>Remove</button>
                </>
              )}
            </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='set-user'>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <input
          type="number"
          placeholder="Age"
          value={newUser.age}
          onChange={(e) => setNewUser({ ...newUser, age: e.target.value })}
        />
        <button className='btn' onClick={handleAddUser}>Add User</button>
      </div>
    </div>
  );
};

export default UserTable;
