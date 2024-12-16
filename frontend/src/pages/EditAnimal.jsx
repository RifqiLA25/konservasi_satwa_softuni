import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Alert,
} from "@mui/material";
import {
  getAnimal,
  updateAnimal,
  getSpecies,
  getLocations,
} from "../services/apiService";

function EditAnimal() {
  const { id } = useParams();
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
  const [currentImage, setCurrentImage] = useState(null);
  const [species, setSpecies] = useState([]);
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        // Ambil data animal terlebih dahulu
        const animalData = await getAnimal(id);

        if (!animalData) {
          setError("Data satwa tidak ditemukan");
          return;
        }

        // Simpan URL gambar saat ini
        setCurrentImage(animalData.gambar);

        // Jika berhasil, baru ambil data species dan locations
        const [speciesData, locationData] = await Promise.all([
          getSpecies(),
          getLocations(),
        ]);

        setFormData({
          nama: animalData.nama || "",
          species: animalData.species?.id || "",
          status: animalData.status || "",
          populasi: animalData.populasi || "",
          deskripsi: animalData.deskripsi || "",
          lokasi: animalData.lokasi?.map((loc) => loc.id) || [],
          gambar: null,
        });

        setSpecies(speciesData.results || []);
        setLocations(locationData.results || []);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message || "Gagal memuat data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLocationChange = (event) => {
    const value = event.target.value;
    setFormData((prev) => ({
      ...prev,
      lokasi: Array.isArray(value) ? value.map((id) => parseInt(id)) : [],
    }));
  };

  // Tambahkan juga handler untuk file
  const handleImageChange = (e) => {
    if (e.target.files?.[0]) {
      setFormData((prev) => ({
        ...prev,
        gambar: e.target.files[0],
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formDataToSend = new FormData();

      // Validasi
      if (!formData.nama || !formData.species || !formData.status || !formData.populasi || !formData.deskripsi || !formData.lokasi.length) {
        setError("Semua field harus diisi");
        setLoading(false);
        return;
      }

      // Append semua data ke FormData
      formDataToSend.append('nama', formData.nama);
      formDataToSend.append('species_id', formData.species);
      formDataToSend.append('status', formData.status);
      formDataToSend.append('populasi', formData.populasi.toString());
      formDataToSend.append('deskripsi', formData.deskripsi);
      
      // Handle lokasi - pastikan mengirim sebagai array
      formData.lokasi.forEach(lokasiId => {
        formDataToSend.append('lokasi', lokasiId.toString());
      });

      // Handle gambar jika ada perubahan
      if (formData.gambar instanceof File) {
        formDataToSend.append('gambar', formData.gambar);
      }

      // Debug log
      console.log('Data yang akan dikirim:');
      for (let [key, value] of formDataToSend.entries()) {
        console.log(`${key}: ${value}`);
      }

      const result = await updateAnimal(id, formDataToSend);
      console.log('Hasil update:', result);
      
      navigate("/animals");
    } catch (err) {
      console.error("Error detail:", err);
      setError("Gagal mengupdate data: " + (err.message || "Terjadi kesalahan"));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container>
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography>Loading...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Edit Data Satwa
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
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
            required
            sx={{ mb: 2 }}
          />

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Species</InputLabel>
            <Select
              name="species"
              value={parseInt(formData.species) || ""}
              onChange={handleChange}
              label="Species"
              required
            >
              {species.map((item) => (
                <MenuItem key={item.id} value={parseInt(item.id)}>
                  {item.nama}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Status Konservasi</InputLabel>
            <Select
              name="status"
              value={formData.status || ""}
              onChange={handleChange}
              label="Status Konservasi"
              required
            >
              <MenuItem value="CR">Critically Endangered</MenuItem>
              <MenuItem value="EN">Endangered</MenuItem>
              <MenuItem value="VU">Vulnerable</MenuItem>
              <MenuItem value="NT">Near Threatened</MenuItem>
              <MenuItem value="LC">Least Concern</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Lokasi</InputLabel>
            <Select
              multiple
              name="lokasi"
              value={formData.lokasi.map((id) => parseInt(id)) || []}
              onChange={handleLocationChange}
              label="Lokasi"
              required
            >
              {locations.map((loc) => (
                <MenuItem key={loc.id} value={parseInt(loc.id)}>
                  {loc.nama}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Populasi"
            name="populasi"
            type="number"
            value={formData.populasi}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Deskripsi"
            name="deskripsi"
            multiline
            rows={4}
            value={formData.deskripsi}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />

          <FormControl fullWidth sx={{ mb: 2 }}>
            {currentImage && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Gambar Saat Ini:
                </Typography>
                <img 
                  src={currentImage} 
                  alt="Preview" 
                  style={{ 
                    maxWidth: '200px', 
                    maxHeight: '200px', 
                    objectFit: 'cover' 
                  }} 
                />
              </Box>
            )}
            <input
              accept="image/*"
              id="gambar"
              type="file"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            <label htmlFor="gambar">
              <Button variant="contained" component="span">
                {currentImage ? 'Ganti Gambar' : 'Upload Gambar'}
              </Button>
            </label>
            {formData.gambar && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                File baru terpilih: {formData.gambar.name}
              </Typography>
            )}
          </FormControl>

          <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
            >
              {loading ? "Menyimpan..." : "Simpan Perubahan"}
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

export default EditAnimal;
