import React, { useEffect, useState } from "react";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "react-query";
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductDetail from "./ProductDetail";


function Employee_List() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const queryClient = new QueryClient();
  const [selectedProduct, setSelectedProduct] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products');
        setData(response.data.products.map(item => ({
          ...item,
          imageUrl: item.thumbnail
        })));
        setLoading(false);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu: ', error);
        setLoading(false)
      }
    };
    fetchData();
  }, []);

  
  const createRecord = async () => {
    try {
      const response = await axios.post('https://dummyjson.com/products', {});
      console.log('Bản ghi mới đã được tạo: ', response.data);
    } catch (error) {
      console.error('Lỗi khi tạo bản ghi mới: ', error);
    }
  };

  const updateRecord = async (id) => {
    try {
      const response = await axios.put(`https://dummyjson.com/products/${id}`, {});
      console.log(`Bản ghi có ID ${id} đã được cập nhật: `, response.data);
      setSelectedProduct(response.data); // cap nhat thong tin ct sp
    } catch (error) {
      console.error(`Lỗi khi cập nhật bản ghi có ID ${id}: `, error);
    }
  };

  const deleteRecord = async (id) => {
    try {
      const response = await axios.delete(`https://dummyjson.com/products/${id}`);
      console.log(`Bản ghi có ID ${id} đã được xóa`);
    } catch (error) {
      console.error(`Lỗi khi xóa bản ghi có ID ${id}: `, error);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <header className="bg-primary text-white p-3 mb-3">Employee Management App</header>
        <h3 className="mb-3 text-center">Employees List</h3>
        <div className="container">
          {loading ? (
            <p>Đang tải...</p>
          ) : (
            <div>
              <button className="btn btn-primary mb-3" onClick={createRecord}>Add Employee</button>
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Description</th>
                    <th scope="col">Price</th>
                    <th scope="col">Brand</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map(item => (
                    <tr key={item.id}>
                      <td>{item.title}</td>
                      <td>{item.description}</td>
                      <td>{item.price}</td>
                      <td>{item.brand}</td>
                      <td>
                        <img src={item.imageUrl} alt="Product" />
                      </td>
                      <td>
                        <button className="btn btn-secondary me-2" >Update</button>
                        <button className="btn btn-danger me-2" onClick={() => deleteRecord(item.id)}>Delete</button>
                        <button className="btn btn-info" onClick={() => updateRecord(item.id)}>View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
        </div>
      </div>
      <ProductDetail product={selectedProduct}/>
    </QueryClientProvider>

  );

}

export default Employee_List;