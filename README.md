# Pizza Ordering Service

A full-stack service built with **Next.js**, PostgreSQL, Material UI, and CASL for an online pizza ordering system. The application supports multiple users, restaurants, role-based access control, and dynamic pizza and toppings management.

## Key Features

- **User Management**
  - Customers: Browse and order pizzas, view order history.
  - Restaurant Managers: Manage pizzas, toppings, and orders.

- **Restaurant Management**
  - Multiple restaurants with custom menus and toppings.
  - Each restaurant has a Super Admin and can assign roles with specific permissions.

- **Pizza & Toppings Management**
  - Dynamic pizza creation with restaurant-specific toppings.

- **Order Management**
  - Customers can place orders with selected toppings.
  - Restaurant managers can update the order status (e.g., Preparing, Delivered).

- **Role Management**
  - Assign roles with permissions like updating order status, viewing orders, or managing users.
  - Authorization handled with **CASL.js**.

## Technologies Used

- **Next.js**: Front-end framework
- **PostgreSQL**: Database
- **Material UI**: UI components
- **Material React Table**: For table management
- **Zod**: Data validation
- **CASL**: Role-based access control
