**Product Listing Application**
This project is a simple Product Listing web application built with React for the frontend and Express and Node js for the backend. 
It allows users to view products, search for products by name, and delete individual or multiple products.
The products are fetched from an external API (DummyJSON).

**Features**
      Search products by name with debounced input.
      Pagination to display products in chunks of 10 per page.
      Select and delete individual or multiple products.
      Toast notifications for successful deletion
      
  **Installation and Setup**
  1.clone the project
  2.cd to TRIKA (main folder)
  3.cd frontend -npm install
  4.cd .. - cd backend - npm install -npm run dev (The backend server will be running at http://localhost:3000)
  5.cd .. -cd frontend - npm start(The React app will be running at http://localhost:3001)

**Backend API**
The backend Express server fetches product data from the DummyJSON API.
Route - GET /products: Returns a list of products with relevant fields.


**Technologies Used**
    **Frontend:**
          React: For building the user interface
          Axios: For making HTTP requests
          ReactPaginate: For pagination
          
  **Backend**
      Node.js: JavaScript runtime
      Express: Web framework for Node.js
      Axios: For fetching data from external API
      CORS: For handling cross-origin requests

    
