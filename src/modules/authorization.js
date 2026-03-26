// RBAC logic for Role-Based Access Control testing

// Define roles and permissions
const roles = {
    admin: {
        can: ['read', 'write', 'delete'],
    },
    user: {
        can: ['read'],
    },
};

// Function to check permissions
const canAccess = (role, action) => {
    if (roles[role] && roles[role].can.includes(action)) {
        return true;
    }
    return false;
};

// Example tests
const testRBAC = () => {
    console.log('Admin can delete:', canAccess('admin', 'delete')); // true
    console.log('User can delete:', canAccess('user', 'delete')); // false
};

testRBAC();