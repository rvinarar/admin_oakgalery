import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Pagination, Dropdown } from "react-bootstrap";
import CustomTable from "../Components/Table";
import Layout from "../Components/Layout";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const [selectedStatusPembayaran, setSelectedStatusPembayaran] = useState("");
  const [selectedStatusProduk, setSelectedStatusProduk] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    getOrders();
  }, [currentPage, itemsPerPage]);

  const getOrders = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/orders");
      // Filter data yang tidak memenuhi kondisi "lunas" dan "selesai"
      const filteredOrders = response.data.filter(
        (order) =>
          !(order.payment_status === "lunas" && order.product_status === "selesai")
      );
      setOrders(filteredOrders);

      const total = Math.ceil(filteredOrders.length / itemsPerPage);
      setTotalPages(total);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleRowStatusChange = (orderId, pembayaranStatus, produkStatus) => {
    setSelectedOrderId(orderId);
    setSelectedStatusPembayaran(pembayaranStatus);
    setSelectedStatusProduk(produkStatus);
  };

  const handleUpdateStatus = async () => {
    try {
      await axios.put(`http://localhost:3000/api/orders/${selectedOrderId}`, {
        status_pembayaran: selectedStatusPembayaran,
        status_produk: selectedStatusProduk,
      });
      getOrders(); // Refresh data after update
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handlePaymentStatusChange = (orderId, selectedStatus) => {
    setSelectedOrderId(orderId);
    setSelectedStatusPembayaran(selectedStatus);
  };

  const handleProductStatusChange = (orderId, selectedStatus) => {
    setSelectedOrderId(orderId);
    setSelectedStatusProduk(selectedStatus);
  };

  const columns = [
    "No",
    "Tanggal Penyewaan",
    "Nama Customer",
    "Alamat",
    "Pesanan",
    "No Handphone",
    "Total",
    // "Metode Pembayaran",
    // "Bukti Pembayaran",
    "Status Pembayaran",
    "Status Produk",
    "Action",
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
    "Tanggal Penyewaan": order.tanggal,
    // "Metode Pembayaran": order.payment_method,
    // "Bukti Pembayaran": order.payment_proof ? (
    //   <img src={order.payment_proof} alt="Bukti" width="50" />
    // ) : (
    //   "Tidak ada"
    // ),
    "Status Pembayaran": (
      <Dropdown
        onSelect={(selected) => handlePaymentStatusChange(order.id, selected)}
      >
        <Dropdown.Toggle
          variant="secondary"
          id={`dropdown-status-pembayaran-${index}`}
        >
          {order.payment_status || "Pilih Status Pembayaran"}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item eventKey="belum bayar">Belum Bayar</Dropdown.Item>
          <Dropdown.Item eventKey="bayar DP">Bayar DP</Dropdown.Item>
          <Dropdown.Item eventKey="lunas">Lunas</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    ),
    "Status Produk": (
      <Dropdown
        onSelect={(selected) => handleProductStatusChange(order.id, selected)}
      >
        <Dropdown.Toggle
          variant="secondary"
          id={`dropdown-status-produk-${index}`}
        >
          {order.product_status || "Pilih Status Produk"}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item eventKey="belum diproses">
            Belum diproses
          </Dropdown.Item>
          <Dropdown.Item eventKey="sedang dikemas">
            Sedang dikemas
          </Dropdown.Item>
          <Dropdown.Item eventKey="dalam pengiriman ke client">
            Dalam pengiriman
          </Dropdown.Item>
          {/* <Dropdown.Item eventKey="dalam pengembalian">
            Dalam pengembalian
          </Dropdown.Item> */}
          <Dropdown.Item eventKey="selesai">Selesai</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    ),

    Action: (
      <Button onClick={handleUpdateStatus} variant="warning">
        Update
      </Button>
    ),
  }));

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Layout>
      <div>
        <h1>Data Pesanan</h1>
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

export default ManageOrders;
