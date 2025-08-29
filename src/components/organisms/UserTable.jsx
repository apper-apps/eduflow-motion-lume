import React, { useState, useEffect } from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import userService from "@/services/api/userService";
import { toast } from "react-toastify";
import { format } from "date-fns";

const UserTable = ({ searchTerm, filters = {} }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortField, setSortField] = useState("lastActive");
  const [sortDirection, setSortDirection] = useState("desc");

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await userService.getAll();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleToggleRole = async (userId, currentRole) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    try {
      const updatedUser = await userService.update(userId, { role: newRole });
      setUsers(prev => prev.map(user => 
        user.Id === userId ? { ...user, role: newRole } : user
      ));
      toast.success(`User role updated to ${newRole}`);
    } catch (err) {
      toast.error("Failed to update user role");
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await userService.delete(userId);
        setUsers(prev => prev.filter(user => user.Id !== userId));
        toast.success("User deleted successfully");
      } catch (err) {
        toast.error("Failed to delete user");
      }
    }
  };

  // Filter and sort users
  const processedUsers = users
    .filter(user => {
      const matchesSearch = !searchTerm || 
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.profile?.firstName + " " + user.profile?.lastName).toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesRole = !filters.role || user.role === filters.role;
      const matchesInstitution = !filters.institutionId || user.institutionId === filters.institutionId;
      
      return matchesSearch && matchesRole && matchesInstitution;
    })
    .sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      if (sortField === "name") {
        aValue = (a.profile?.firstName || "") + " " + (a.profile?.lastName || "");
        bValue = (b.profile?.firstName || "") + " " + (b.profile?.lastName || "");
      }
      
      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  if (loading) {
    return <Loading variant="table" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadUsers} />;
  }

  if (processedUsers.length === 0) {
    return (
      <Empty 
        variant="users" 
        onAction={() => toast.info("Invite users functionality would be implemented")}
      />
    );
  }

  return (
    <div className="glass-card">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Users</h3>
          <Button variant="primary" size="sm">
            <ApperIcon name="UserPlus" size={16} className="mr-2" />
            Invite User
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-4 px-6">
                <button
                  onClick={() => handleSort("name")}
                  className="flex items-center space-x-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
                >
                  <span>User</span>
                  <ApperIcon 
                    name={sortField === "name" && sortDirection === "desc" ? "ChevronDown" : "ChevronUp"} 
                    size={14} 
                  />
                </button>
              </th>
              <th className="text-left py-4 px-6">
                <button
                  onClick={() => handleSort("role")}
                  className="flex items-center space-x-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
                >
                  <span>Role</span>
                  <ApperIcon 
                    name={sortField === "role" && sortDirection === "desc" ? "ChevronDown" : "ChevronUp"} 
                    size={14} 
                  />
                </button>
              </th>
              <th className="text-left py-4 px-6">
                <button
                  onClick={() => handleSort("lastActive")}
                  className="flex items-center space-x-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
                >
                  <span>Last Active</span>
                  <ApperIcon 
                    name={sortField === "lastActive" && sortDirection === "desc" ? "ChevronDown" : "ChevronUp"} 
                    size={14} 
                  />
                </button>
              </th>
              <th className="text-left py-4 px-6">
                <span className="text-sm font-medium text-gray-300">Institution</span>
              </th>
              <th className="text-right py-4 px-6">
                <span className="text-sm font-medium text-gray-300">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {processedUsers.map((user) => (
              <tr key={user.Id} className="border-b border-white/5 hover:bg-white/5 transition-colors duration-200">
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                      <ApperIcon name="User" size={16} className="text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-white">
                        {user.profile?.firstName || "Unknown"} {user.profile?.lastName || "User"}
                      </div>
                      <div className="text-sm text-gray-400">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <Badge 
                    variant={user.role === "admin" ? "error" : user.role === "manager" ? "warning" : "default"}
                    className="capitalize"
                  >
                    {user.role}
                  </Badge>
                </td>
                <td className="py-4 px-6">
                  <span className="text-sm text-gray-300">
                    {format(new Date(user.lastActive), "MMM d, yyyy")}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span className="text-sm text-gray-300">{user.institutionId || "N/A"}</span>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      onClick={() => handleToggleRole(user.Id, user.role)}
                      variant="ghost"
                      size="sm"
                    >
                      <ApperIcon name="Shield" size={16} />
                    </Button>
                    <Button
                      onClick={() => toast.info("Edit user functionality would be implemented")}
                      variant="ghost"
                      size="sm"
                    >
                      <ApperIcon name="Edit" size={16} />
                    </Button>
                    <Button
                      onClick={() => handleDelete(user.Id)}
                      variant="ghost"
                      size="sm"
                      className="text-error hover:text-error hover:bg-error/10"
                    >
                      <ApperIcon name="Trash2" size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;