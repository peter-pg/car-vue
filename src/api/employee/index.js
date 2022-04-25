import axios from 'axios';

// 创建视频
const postEmployee = form => axios.post('http://localhost:3000/api/v1/employee', form).then(res => res.data);

// 创建视频
const postOrder = form => axios.post('http://localhost:3000/api/v1/order', form).then(res => res.data);

// 创建视频
const postGuest = form => axios.post('http://localhost:3000/api/v1/guest', form).then(res => res.data);

// 创建视频
const postStore = form => axios.post('http://localhost:3000/api/v1/store', form).then(res => res.data);

// 创建视频
const upadteEmployee = params  => axios.put('http://localhost:3000/api/v1/employee/${id}', params).then(res => res.data);




// 读取视频列表
const getEmployees = (start, limit) => axios.get('http://localhost:3000/api/v1/employees', { params: { start, limit } }).then(res => res.data);

// 读取视频列表
const getOrders = (start, limit) => axios.get('http://localhost:3000/api/v1/orders', { params: { start, limit } }).then(res => res.data);

// 读取视频列表
const getGuests = (start, limit) => axios.get('http://localhost:3000/api/v1/guests', { params: { start, limit } }).then(res => res.data);

// 读取视频列表
const getEmployeePerformance= (start, limit) => axios.get('http://localhost:3000/api/v1/employees/performance', { params: { start, limit } }).then(res => res.data);

// 读取视频列表
const getServiceCosts = (start, limit) => axios.get('http://localhost:3000/api/v1/service/costs', { params: { start, limit } }).then(res => res.data);

// 读取视频列表
const getStore = (start, limit) => axios.get('http://localhost:3000/api/v1/stores', { params: { start, limit } }).then(res => res.data);

// 创建视频
const deleteEmployee = id => axios.delete('http://localhost:3000/api/v1/employee/${id}').then(res => res.data);





export {
    getEmployees,
    postEmployee,
    postOrder,
    getOrders,
    getGuests,
    postGuest,
    getEmployeePerformance,
    deleteEmployee,
    upadteEmployee,
    getServiceCosts,
    getStore,
    postStore,
};
