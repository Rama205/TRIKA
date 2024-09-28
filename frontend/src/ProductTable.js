import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import './ProductTable.css'; 

const ProductTable = () => {
  const [products, setProducts] = useState([]); 
  const [filteredProducts, setFilteredProducts] = useState([]); 
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(''); 
  const [selectedRows, setSelectedRows] = useState([]); 
  const [currentPage, setCurrentPage] = useState(0); 
  const [itemsPerPage] = useState(10); 
  const [showToast, setShowToast] = useState(false); 
  const [toastMessage, setToastMessage] = useState(''); 

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/products');
        setProducts(response.data.products);
        setFilteredProducts(response.data.products); 
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Debounced search effect
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // Apply the search when the debounced term changes
  useEffect(() => {
    if (debouncedSearchTerm === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
      setCurrentPage(0); 
    }
  }, [debouncedSearchTerm, products]);

  // Handle row selection
  const handleRowClick = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((row) => row !== id)); 
    } else {
      setSelectedRows([...selectedRows, id]); 
    }
  };

  // Delete a product individually
  const deleteProduct = (id) => {
    // Remove the product from the filtered products list
    const updatedProducts = filteredProducts.filter((product) => product.id !== id);

    // Remove the product from the selected rows if it's in the selected rows
    const updatedSelectedRows = selectedRows.filter((rowId) => rowId !== id);

    // Update both filtered products and selected rows
    setFilteredProducts(updatedProducts);
    setSelectedRows(updatedSelectedRows);


    showToastMessage('Product deleted successfully.');
  };

  // Mass delete selected rows
  const deleteSelectedRows = () => {
    const updatedProducts = filteredProducts.filter(
      (product) => !selectedRows.includes(product.id)
    );

    // Update both filtered products and clear selected rows
    setFilteredProducts(updatedProducts);
    setSelectedRows([]);

 
    showToastMessage('Selected products deleted successfully.');
  };


  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000); 
  };

  // Handle pagination page change
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  // Paginate filtered products
  const offset = currentPage * itemsPerPage;
  const currentItems = filteredProducts.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="product-table-container">
      <h1>Product Listing</h1>

      <div className="search-bar">
        <label htmlFor="search">Search by Name:</label>
        <input
          id="search"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products..."
        />
      </div>

      {/* Display total number of selected rows */}
      <div className="selected-count">
        <p>Total Selected Rows: {selectedRows.length}</p>
      </div>

      <table className="product-table">
        <thead>
          <tr>
            <th>Select</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((product) => (
            <tr
              key={product.id}
              className={selectedRows.includes(product.id) ? 'selected-row' : ''}
              onClick={() => handleRowClick(product.id)}
            >
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(product.id)}
                  onChange={() => handleRowClick(product.id)}
                />
              </td>
              <td>{product.title}</td>
              <td>${product.price}</td>
              <td>{product.description}</td>
              <td>
                <button onClick={(e) => { e.stopPropagation(); deleteProduct(product.id); }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="delete-selected" onClick={deleteSelectedRows}>
        Delete Selected
      </button>

      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />

     
      {showToast && (
        <div className="toast">
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default ProductTable;
