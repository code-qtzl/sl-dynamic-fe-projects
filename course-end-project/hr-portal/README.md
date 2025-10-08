# HR Portal - Modern Employee Management System

A clean, professional HR Portal built with React that provides streamlined employee management capabilities with a focus on simplicity and user experience. Features a modern design with intuitive navigation and essential HR functionality.

## 🚀 Features

### For Employees

-   **Personal Dashboard** - Welcome screen with real-time clock and personalized greeting
-   **Clean Navigation** - Simplified menu with role-based access
-   **Profile Integration** - Dynamic username display from employee records
-   **Responsive Design** - Works seamlessly on desktop, tablet, and mobile

### For HR Managers

-   **HR Dashboard** - Clean overview with quick access to main functions
-   **Employee Management** - Add, view, and manage employee records with streamlined forms
-   **Employee Directory** - View all employees with essential information
-   **Simplified Forms** - Streamlined data entry focusing on core employee information
-   **Professional Design** - Clean, business-appropriate interface

## 📦 Installation & Setup

### Prerequisites

-   Node.js (v14 or higher)
-   npm or yarn

### Installation Steps

1. **Clone the repository**

    ```bash
    git clone <repository-url>
    cd hr-portal
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Start the JSON Server (Backend)**

    ```bash
    npm run start
    ```

    This starts the JSON server on `http://localhost:3000`

4. **Start the Development Server**
    ```bash
    npm run dev
    ```
    This starts the React app on `http://localhost:5173`

## 📱 Acceptance Criteria

### 1. Employee Management System

-   **Add Employee**: Streamlined form with essential fields (name, email, phone, department, position)
-   **View Employees**: Clean directory showing all employee information
-   **Employee Profiles**: Core information display without unnecessary complexity
-   **Data Persistence**: JSON Server backend for data storage

### 2. User Authentication & Profiles

-   **Secure Login**: Role-based authentication (HR/Employee)
-   **Dynamic Usernames**: Employee dashboard shows actual user names from database
-   **Session Management**: Secure user sessions with localStorage
-   **User Registration**: Simplified 2-step employee signup process

### 3. Leave Management System

-   **Leave Requests**: Employees can submit leave requests with date validation
-   **Leave Types**: Support for sick, vacation, personal, maternity, and emergency leave
-   **Leave History**: Employees can view their complete leave request history
-   **HR Approval Workflow**: HR can review, approve, or reject leave requests
-   **Status Tracking**: Real-time status updates (pending, approved, rejected)
-   **Comments System**: HR can add comments when approving/rejecting requests
-   **Smart Validation**: Automatic workday calculation and date range validation

### 4. Modern Dashboard

-   **Personalized Welcome**: Dynamic greeting with user's actual name
-   **Real-time Clock**: Live time and date display
-   **Clean Interface**: Professional, business-appropriate design
-   **Quick Access**: Easy navigation to main features

### 5. Navigation System

-   **Role-based Menus**: Different navigation for HR vs Employees
-   **Mobile Responsive**: Collapsible hamburger menu for mobile devices
-   **User Profile**: Dropdown with user info and secure logout
-   **Clean Design**: Professional white navigation with blue accents

### 6. Technical Requirements

-   **Modern React**: Built with React 19.1.1 and modern hooks (useState, useEffect)
-   **Responsive Design**: Custom CSS with Grid/Flexbox for all screen sizes
-   **API Integration**: Full CRUD operations with JSON Server backend
-   **Error Handling**: Comprehensive validation and error feedback
-   **Performance**: Optimized rendering and efficient state management
-   **Accessibility**: Clean typography, proper contrast, and semantic HTML

### 7. Data Management

-   **Employee Records**: Complete employee information with secure storage
-   **Leave Tracking**: Comprehensive leave request and approval history
-   **Session Security**: Protected routes and secure authentication flow
-   **Real-time Sync**: Automatic data updates across all application components
-   **Data Validation**: Client and server-side validation for all forms

---

**Built with ❤️ for modern, simplified HR management**
