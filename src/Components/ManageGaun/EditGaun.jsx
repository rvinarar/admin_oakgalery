import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../Layout";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";

const EditGaun = () => {
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
  const { id } = useParams();

  useEffect(() => {
    getGaunById();
  }, [id]);

  const updateGaun = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nama_produk", nama_produk);
    formData.append("kategori", kategori);
    formData.append("ukuran", ukuran);
    formData.append("warna", warna);
    formData.append("harga", harga);
    formData.append("jumlah", jumlah);
    formData.append("detail", detail);
    formData.append("status", status);
    if (foto) {
      formData.append("foto", foto);
    }

    try {
      await axios.patch(`http://localhost:3000/api/gauns/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/gaun-page");
    } catch (error) {
      console.log(error);
    }
  };

  const getGaunById = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/gauns/${id}`);
      if (response.data) {
        setNama_produk(response.data.nama_produk);
        setKategori(response.data.kategori);
        setUkuran(response.data.ukuran);
        setWarna(response.data.warna);
        setHarga(response.data.harga);
        setJumlah(response.data.jumlah);
        setDetail(response.data.detail);
        setStatus(response.data.status);
        setFoto(response.data.foto); // Jika `foto` adalah URL
      } else {
        console.error("Data gaun tidak ditemukan");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Layout>
      <h2>Edit Data Barang</h2>
      <Form onSubmit={updateGaun} encType="multipart/form-data">
        <Row>
          <Col>
            <Form.Group className="field">
              <Form.Label>Nama</Form.Label>
              <Form.Control
                type="text"
                className="input"
                value={nama_produk}
                onChange={(e) => setNama_produk(e.target.value)}
                placeholder="Nama Produk"
              />
            </Form.Group>

            <Form.Group className="field">
              <Form.Label>Kategori</Form.Label>
              <Form.Select
                name="kategori"
                value={kategori}
                onChange={(e) => setKategori(e.target.value)}
              >
                <option value="gaun-pengantin">Gaun Pengantin</option>
                <option value="kebaya">Kebaya</option>
                <option value="jas">Jas</option>
                <option value="batik">Batik</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="field">
              <Form.Label>Ukuran</Form.Label>
              <Form.Select
                name="ukuran"
                value={ukuran}
                onChange={(e) => setUkuran(e.target.value)}
              >
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
                className="input"
                value={warna}
                onChange={(e) => setWarna(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="field">
              <Form.Label>Harga</Form.Label>
              <Form.Control
                type="number"
                className="input"
                value={harga}
                onChange={(e) => setHarga(e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="field">
              <Form.Label>Jumlah</Form.Label>
              <Form.Control
                type="number"
                className="input"
                value={jumlah}
                onChange={(e) => setJumlah(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="field">
              <Form.Label>Detail</Form.Label>
              <Form.Control
                as="textarea"
                name="detail"
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="field">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="tersedia">Tersedia</option>
                <option value="tidak-tersedia">Tidak tersedia</option>
              </Form.Select>
            </Form.Group>

            <Row>
              <Col>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Foto</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => setFoto(e.target.files[0])}
                  />
                </Form.Group>
              </Col>

              <Col>
                {/* Menampilkan foto sebelumnya */}
                {foto && (
                  <img
                    src={foto} // Pastikan foto ini adalah URL yang valid
                    alt="Foto Sebelumnya"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                )}
              </Col>
            </Row>

            <br />
            <Form.Group>
              <Button type="submit" variant="success">
                Edit
              </Button>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Layout>
  );
};

export default EditGaun;
