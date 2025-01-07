import React, { useState } from "react";
import axios from "axios";
import Layout from "../Layout";
import { Button, Form, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router";

const AddDress = () => {
  const [nama_produk, setNama_produk] = useState("");
  const [kategori, setKategori] = useState("");
  const [ukuran, setUkuran] = useState("");
  const [warna, setWarna] = useState("");
  const [harga, setHarga] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [detail, setDetail] = useState("");
  const [status, setStatus] = useState("");
  const [foto, setFoto] = useState(null);

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFoto(file);
    } else {
      console.error("No image selected");
    }
  };

  const saveGaun = async (e) => {
    e.preventDefault();

    // Validasi semua field yang diperlukan
    if (
      !nama_produk ||
      !kategori ||
      !ukuran ||
      !warna ||
      !harga ||
      !jumlah ||
      !detail ||
      !status ||
      !foto
    ) {
      console.error("All fields are required");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const base64Image = reader.result;
        await axios.post("http://localhost:3000/api/gauns", {
          nama_produk,
          kategori,
          ukuran,
          warna,
          harga,
          jumlah,
          detail,
          status,
          foto: base64Image,
        });
        navigate("/gaun-page");
      } catch (error) {
        console.error("Error while saving dress:", error);
      }
    };

    reader.readAsDataURL(foto); // Membaca file sebagai Data URL
  };

  return (
    <Layout>
      <h2>Tambah Data Barang</h2>
      <Form onSubmit={saveGaun}>
        <Row>
          <Col>
            <Form.Group className="field">
              <Form.Label>Nama</Form.Label>
              <Form.Control
                type="text"
                className="input"
                value={nama_produk}
                onChange={(e) => setNama_produk(e.target.value)}
                placeholder="Nama"
                required
              />
            </Form.Group>

            <Form.Group className="field">
              <Form.Label>Kategori</Form.Label>
              <Form.Select
                value={kategori}
                onChange={(e) => setKategori(e.target.value)}
                required
              >
                <option value="" disabled>
                  Pilih Kategori
                </option>{" "}
                {/* Nilai kosong untuk opsi default */}
                <option value="gaunpengantin">Gaun Pengantin</option>
                <option value="kebaya">Kebaya</option>
                <option value="jas">Jas</option>
                <option value="batik">Batik</option>
                <option value="bajuadat">Baju Adat</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="field">
              <Form.Label>Ukuran</Form.Label>
              <Form.Select
                value={ukuran}
                onChange={(e) => setUkuran(e.target.value)}
                required
              >
                <option value="" disabled>
                  Pilih Ukuran
                </option>{" "}
                <option value="s">S</option>
                <option value="m">M</option>
                <option value="l">L</option>
                <option value="xl">XL</option>
                <option value="xxl">XXL</option>
                <option value="xxxl">XXXL</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="field">
              <Form.Label>Warna</Form.Label>
              <Form.Control
                type="text"
                placeholder="Warna"
                value={warna}
                onChange={(e) => setWarna(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="field">
              <Form.Label>Harga</Form.Label>
              <Form.Control
                type="number"
                placeholder="Harga"
                value={harga}
                onChange={(e) => setHarga(e.target.value)}
                required
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="field">
              <Form.Label>Jumlah</Form.Label>
              <Form.Control
                type="number"
                placeholder="Jumlah"
                value={jumlah}
                onChange={(e) => setJumlah(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Detail</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="field">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="">Status</option>
                <option value="Tersedia">Tersedia</option>
                <option value="Tidak Tersedia">Tidak tersedia</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Foto</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
            </Form.Group>

            <Form.Group>
              <Button type="submit" variant="success">
                Simpan
              </Button>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Layout>
  );
};

export default AddDress;
