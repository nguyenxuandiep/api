import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";


function Employee_Add() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://dummy.restapiexample.com/api/v1/create');
        setData(response.data);
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
      const response = await axios.post('https://dummy.restapiexample.com/api/v1/create', {});
      console.log('Bản ghi mới đã được tạo: ', response.data);
    } catch (error) {
      console.error('Lỗi khi tạo bản ghi mới: ', error);
    }
  };

  const updateRecord = async (id) => {
    try {
      const response = await axios.put(`https://dummy.restapiexample.com/api/v1/update/${id}`, {});
      console.log(`Bản ghi có ID ${id} đã được cập nhật: `, response.data);
    } catch (error) {
      console.error(`Lỗi khi cập nhật bản ghi có ID ${id}: `, error);
    }
  };

  const deleteRecord = async (id) => {
    try {
      const response = await axios.delete(`https://dummy.restapiexample.com/api/v1/delete/${id}`);
      console.log(`Bản ghi có ID ${id} đã được xóa`);
    } catch (error) {
      console.error(`Lỗi khi xóa bản ghi có ID ${id}: `, error);
    }
  };

  return (
    <div>
      <header className="bg-primary text-white p-3 mb-3">Employee Management App</header>
      <h3 className="mb-3 text-center">Employees List</h3>
      <div className="container">
        {loading ? (
          <p>Đang tải...</p>
        ) : (
          <div>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th scope="col">Employee First Name</th>
                  <th scope="col">Employee Last Name</th>
                  <th scope="col">Employee salary</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data?.data.map(item => (
                  <tr key={item.id}>
                    <td><input></input></td>
                    <td><input></input></td>
                    <td><input></input></td>
                    <td>
                      <button className="btn btn-secondary me-2" onClick={() => updateRecord(item.id)}>Update</button>
                      <button className="btn btn-danger me-2" onClick={() => deleteRecord(item.id)}>Delete</button>
                      <button className="btn btn-info" onClick={() => console.log(item)}>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );

}

export default Employee_List;