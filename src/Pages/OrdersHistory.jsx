import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Pagination, Dropdown } from "react-bootstrap";
import CustomTable from "../Components/Table";
import Layout from "../Components/Layout";

const OrdersHistory = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    getOrders();
  }, [currentPage, itemsPerPage]);

  const getOrders = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/orders");
      // Filter hanya data dengan status pembayaran "lunas" dan status produk "selesai"
      const filteredOrders = response.data.filter(
        (order) =>
          order.payment_status === "lunas" && order.product_status === "selesai"
      );
      setOrders(filteredOrders);

      const total = Math.ceil(filteredOrders.length / itemsPerPage);
      setTotalPages(total);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const columns = [
    "No",
    "Nama Customer",
    "Alamat",
    "No Handphone",
    "Pesanan",
    "Total",
    // "Metode Pembayaran",
    // "Bukti Pembayaran",
    "Status Pembayaran",
    "Status Produk",
  ];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = orders.slice(indexOfFirstItem, indexOfLastItem);

  const data = currentData.map((order, index) => ({
    No: index + 1 + (currentPage - 1) * itemsPerPage,
    "Nama Customer": order.name_cust?.name || "N/A",
    Alamat: order.address,
    "No Handphone": order.telepon,
    Pesanan: order.products.map((product) => product.nama_produk).join(", "),
    Total: order.total,
    // "Metode Pembayaran": order.payment_method,
    // "Bukti Pembayaran": order.payment_proof ? (
    //   <img src={order.payment_proof} alt="Bukti" width="50" />
    // ) : (
    //   "Tidak ada"
    // ),
    "Status Pembayaran": order.payment_status,
    "Status Produk": order.product_status,
  }));

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Layout>
      <div>
        <h1>Riwayat Pesanan</h1>
        <CustomTable columns={columns} data={data} />
      </div>
      <Pagination>
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </Layout>
  );
};

export default OrdersHistory;
