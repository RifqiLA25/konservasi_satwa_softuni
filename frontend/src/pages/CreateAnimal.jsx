import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  FormHelperText,
} from "@mui/material";
import { createAnimal, getSpecies, getLocations } from "../services/apiService";

function CreateAnimal() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama: "",
    species: "",
    status: "",
    populasi: "",
    deskripsi: "",
    gambar: null,
    lokasi: [],
  });
  const [species, setSpecies] = useState([]);
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [speciesData, locationData] = await Promise.all([
          getSpecies(),
          getLocations(),
        ]);
        setSpecies(speciesData.results || []);
        setLocations(locationData.results || []);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Gagal memuat data species dan lokasi");
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      gambar: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();

      // Pastikan semua field required terisi
      if (
        !formData.nama ||
        !formData.species ||
        !formData.status ||
        !formData.populasi ||
        !formData.deskripsi ||
        !formData.lokasi.length
      ) {
        setError("Semua field termasuk lokasi harus diisi");
        return;
      }

      formDataToSend.append("nama", formData.nama);
      formDataToSend.append("species_id", formData.species);
      formDataToSend.append("status", formData.status);
      formDataToSend.append("populasi", parseInt(formData.populasi));
      formDataToSend.append("deskripsi", formData.deskripsi);

      // Append setiap lokasi yang dipilih
      formData.lokasi.forEach((lokasiId) => {
        formDataToSend.append("lokasi", lokasiId);
      });

      if (formData.gambar) {
        formDataToSend.append("gambar", formData.gambar);
      }

      // Log untuk debugging
      console.log("Data yang akan dikirim:", {
        nama: formData.nama,
        species: formData.species,
        status: formData.status,
        populasi: formData.populasi,
        deskripsi: formData.deskripsi,
        lokasi: formData.lokasi,
        gambar: formData.gambar,
      });

      const response = await createAnimal(formDataToSend);
      console.log("Response:", response);
      navigate("/animals");
    } catch (err) {
      console.error("Error detail:", err);
      setError(
        "Gagal menambahkan data satwa: " + (err.message || "Terjadi kesalahan")
      );
    }
  };

  const handleLocationChange = (event) => {
    const selectedLocations = Array.isArray(event.target.value)
      ? event.target.value
      : [];
    setFormData((prev) => ({
      ...prev,
      lokasi: selectedLocations,
    }));
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Tambah Data Satwa
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Nama Satwa"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            margin="normal"
            required
          />

          <FormControl fullWidth margin="normal" required>
            <InputLabel>Species</InputLabel>
            <Select
              name="species"
              value={formData.species}
              onChange={handleChange}
              label="Species"
            >
              {species.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.nama} ({item.nama_latin})
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal" required>
            <InputLabel>Lokasi</InputLabel>
            <Select
              multiple
              name="lokasi"
              value={formData.lokasi}
              onChange={handleLocationChange}
              label="Lokasi"
            >
              {locations.map((location) => (
                <MenuItem key={location.id} value={location.id}>
                  {location.nama}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Pilih minimal satu lokasi</FormHelperText>
          </FormControl>

          <FormControl fullWidth margin="normal" required>
            <InputLabel>Status Konservasi</InputLabel>
            <Select
              name="status"
              value={formData.status}
              onChange={handleChange}
              label="Status Konservasi"
            >
              <MenuItem value="CR">Critically Endangered</MenuItem>
              <MenuItem value="EN">Endangered</MenuItem>
              <MenuItem value="VU">Vulnerable</MenuItem>
              <MenuItem value="NT">Near Threatened</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Populasi"
            name="populasi"
            type="number"
            value={formData.populasi}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Deskripsi"
            name="deskripsi"
            value={formData.deskripsi}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={4}
            required
          />

          <Button variant="contained" component="label" sx={{ mt: 2, mb: 2 }}>
            Upload Gambar
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
          </Button>

          <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Simpan
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={() => navigate("/animals")}
            >
              Batal
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default CreateAnimal;
