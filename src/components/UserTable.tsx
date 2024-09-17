import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { fetchUsers, setFilter } from "../redux/userSlice";
import "../App.css";

const UserTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, filters } = useSelector((state: RootState) => state.users);

  React.useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    dispatch(setFilter({ key, value }));
  };

  const filteredUsers = users.filter((user) => {
    return (
      user.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      user.username.toLowerCase().includes(filters.username.toLowerCase()) &&
      user.email.toLowerCase().includes(filters.email.toLowerCase()) &&
      user.phone.toLowerCase().includes(filters.phone.toLowerCase())
    );
  });

  return (
    <div className="table-container">
      <h1>User Management</h1>
      <table>
        <thead>
          <tr>
            <th>
              Name
              <input
                type="text"
                value={filters.name}
                onChange={(e) => handleFilterChange("name", e.target.value)}
                placeholder="Search by name"
              />
            </th>
            <th>
              Username
              <input
                type="text"
                value={filters.username}
                onChange={(e) => handleFilterChange("username", e.target.value)}
                placeholder="Search by username"
              />
            </th>
            <th>
              Email
              <input
                type="text"
                value={filters.email}
                onChange={(e) => handleFilterChange("email", e.target.value)}
                placeholder="Search by email"
              />
            </th>
            <th>
              Phone
              <input
                type="text"
                value={filters.phone}
                onChange={(e) => handleFilterChange("phone", e.target.value)}
                placeholder="Search by phone"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
