import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Pagination, Dropdown, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import CustomTable from "../Components/Table";
import Layout from "../Components/Layout";
import { useNavigate } from "react-router-dom";

const GaunPage = () => {
  const [gauns, setGaun] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  const handleTambahData = () => {
    navigate(`add-gaun`);
  }

  useEffect(() => {
    getGauns();
  }, [currentPage, itemsPerPage, selectedCategory]);
  

  const getGauns = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/gauns");
      setGaun(response.data);
  
      let filteredGauns = response.data;
  
      if (selectedCategory !== "All") {
        filteredGauns = response.data.filter(
          (gaun) => gaun.kategori === selectedCategory
        );
      }
  
      setGaun(filteredGauns);
      setGaun((prevGauns) => {
        // operasi berdasarkan prevGauns
        return filteredGauns;
      });
      
      setTotalPages((prevTotalPages) => {
        // operasi berdasarkan prevTotalPages
        return total;
      });
  
      const total = Math.ceil(filteredGauns.length / itemsPerPage);
      setTotalPages(total);
    } catch (error) {
      console.error("Error fetching gauns:", error);
    }
  };
  
  

  const columns = [
    "No",
    "Nama",
    "Kategori",
    "Ukuran",
    "Warna",
    "Harga",
    "Jumlah",
    "Detail",
    "Status",
    "Foto",
    "Action",
  ];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = gauns.slice(indexOfFirstItem, indexOfLastItem);

  const data = [
    ...gauns.map((gaun, index) => ({
      No: index + 1,
      id: gaun.id,
      Nama: gaun.nama_produk,
      Kategori: gaun.kategori,
      Ukuran: gaun.ukuran,
      Warna: gaun.warna,
      Harga: gaun.harga,
      Jumlah: gaun.jumlah,
      Detail: gaun.detail,
      Status: gaun.status,
      Foto: (
        <img
          src={gaun.foto}
          alt={`Foto ${gaun.nama_produk}`}
          style={{ width: "100px" }}
        />
      ),
      'Action': (
        <div key={`action-${index}`}>
          <Link to={`edit-gaun/${gaun.id}`}>
            <Button>Edit</Button>
          </Link>
          <Button onClick={() => handleShowModal(gaun.id)} variant="danger">
            Hapus
          </Button>
        </div>
      ),
    })),
  ];

  const handleShowModal = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setDeleteId(null);
    setShowModal(false);
  };

  const handleConfirmDelete = async () => {
    if (deleteId) {
      try {
        await axios.delete(`http://localhost:3000/api/gauns/${deleteId}`);
        getGauns();
      } catch (error) {
        console.log(error);
      }
      handleCloseModal();
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCategoryChange = (kategori) => {
    setSelectedCategory(kategori);
  };

  return (
    <Layout>
      <div>
        <h1>Data Barang</h1>

        <div style={{ display: "flex", alignItems: "center" }}>
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              Kategori: {selectedCategory}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleCategoryChange("All")}>
                All
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => handleCategoryChange("GaunPengantin")}
              >
                Gaun Pengantin
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleCategoryChange("Jas")}>
                Jas
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleCategoryChange("Kebaya")}>
                Kebaya
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleCategoryChange("Batik")}>
                Batik
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

            <Button variant="success" style={{ marginLeft: "10px" }} 
            onClick={handleTambahData}
            
            >
              Tambah Data
            </Button>
        </div><br />

        <CustomTable
          columns={columns}
          data={data.map((row) => ({
            ...row,
            Action: (
              <div key={`action-${row.No}`}>
                <Link to={`edit-gaun/${row.id}`}>
                  <Button>Edit</Button>
                </Link>
                <Button onClick={() => handleShowModal(row.id)} variant="danger">
                  Hapus
                </Button>
              </div>
            ),
          }))}
        />
        

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

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Konfirmasi Hapus</Modal.Title>
          </Modal.Header>
          <Modal.Body>Apakah Anda yakin ingin menghapus?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Batal
            </Button>
            <Button variant="danger" onClick={handleConfirmDelete}>
              Hapus
            </Button>
          </Modal.Footer>
        </Modal>

      </div>
    </Layout>
  );
};

export default GaunPage;
