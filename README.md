# CRM Frontend - Web Dashboard

The **CRM Frontend** serves as the Managerial UI for the system. It provides a highly interactive and responsive interface designed to streamline customer relationship management. Built with **React** and **Vite**, it focuses on speed, modularity, and a seamless user experience.

---

### 1. Network Strategy & Architecture

The frontend architecture leverages modern tooling to ensure high performance and efficient data handling:

* **Build Tooling:** The project utilizes **Vite**, providing an ultra-fast development environment and optimized production builds compared to traditional bundlers.
* **API Communication:** All data exchange is handled via **Axios**, which provides a robust interface for performing asynchronous HTTP requests to the backend services.

---

### 2. Installation & Connectivity

To establish the frontend environment and connect it to the server authority, follow these procedures:

* **Dependency Injection:** Navigate to the project directory and execute `npm install`. This will install the core library suite including **React**, **Tailwind CSS** for styling, and **Axios**.
* **Environment Configuration:** You must create a `.env` file in the root directory to bridge the frontend with the server. Define your endpoint as follows: `VITE_API_URL=http://localhost:5100/api`.
* **Deployment:** Start the local development server by running `npm run dev`.

---

### 3. Technical Breakdown & Logic

The dashboard's functionality is driven by a combination of state management and persistent data handling:

* **Reactive Data Fetching:** Pages such as `Dashboard.jsx` and `Table.jsx` utilize the `useEffect` hook to automatically trigger data synchronization with the backend upon component mounting.
* **LocalStorage Persistence:** To maintain a seamless session, user metadata (such as name and role) is stored in the browser's **localStorage** upon login. This ensures the `Topbar` component can persist the "Welcome" message and user permissions across page refreshes.
* **Search Engine Logic:** The global search functionality employs a **case-insensitive filter**. It dynamically converts user datasets into strings to verify if search keywords exist across multiple fields, including Email, Name, or Mobile numbers.

---

### 4. Web Troubleshooting & Differentiation

Errors in the frontend typically fall into two categories: local build issues or connectivity mismatches:

* **Runtime Failures (White Screen):** If the application fails to render, check the Browser Console (F12). This is usually differentiated from server errors by a `Module not found` message, indicating a broken file path or an incorrect `import` statement in your components.
* **Connectivity Blocks (CORS Error):** If the console displays a Cross-Origin Resource Sharing (CORS) error, the issue lies in the **Backend** configuration. You must verify that the backend server has enabled `app.use(cors())` to permit requests from the frontend’s specific URL.

---
