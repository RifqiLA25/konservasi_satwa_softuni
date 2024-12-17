import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, Typography, Paper, Button, 
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, IconButton 
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from '../context/AuthContext';
import { getConservations, deleteConservation } from '../services/apiService';

function Conservation() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [conservations, setConservations] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchConservations();
  }, []);

  const fetchConservations = async () => {
    try {
      const response = await getConservations();
      setConservations(response.results || []);
    } catch (err) {
      setError('Gagal memuat data program konservasi');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus program konservasi ini?')) {
      try {
        await deleteConservation(id);
        fetchConservations();
      } catch (err) {
        setError('Gagal menghapus program konservasi');
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Program Konservasi
      </Typography>

      {user?.is_staff && (
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => navigate('/conservation/create')}
          sx={{ mb: 3 }}
        >
          Tambah Program Konservasi
        </Button>
      )}

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nama Program</TableCell>
              <TableCell>Satwa</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Tanggal Mulai</TableCell>
              <TableCell>Tanggal Selesai</TableCell>
              {user?.is_staff && <TableCell>Aksi</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {conservations.map((conservation) => (
              <TableRow key={conservation.id}>
                <TableCell>{conservation.nama}</TableCell>
                <TableCell>{conservation.animal?.nama}</TableCell>
                <TableCell>{conservation.status}</TableCell>
                <TableCell>{new Date(conservation.tanggal_mulai).toLocaleDateString()}</TableCell>
                <TableCell>
                  {conservation.tanggal_selesai ? 
                    new Date(conservation.tanggal_selesai).toLocaleDateString() : 
                    '-'
                  }
                </TableCell>
                {user?.is_staff && (
                  <TableCell>
                    <IconButton 
                      onClick={() => navigate(`/conservation/edit/${conservation.id}`)}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton 
                      onClick={() => handleDelete(conservation.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Conservation; 