export const validateConservation = (data) => {
  const errors = {};
  
  if (!data.nama) {
    errors.nama = 'Nama program konservasi wajib diisi';
  }
  
  if (!data.tanggal_mulai) {
    errors.tanggal_mulai = 'Tanggal mulai wajib diisi';
  }
  
  if (data.tanggal_selesai && new Date(data.tanggal_selesai) < new Date(data.tanggal_mulai)) {
    errors.tanggal_selesai = 'Tanggal selesai harus setelah tanggal mulai';
  }
  
  return errors;
};

export const validateNews = (data) => {
  const errors = {};
  
  if (!data.judul) {
    errors.judul = 'Judul berita wajib diisi';
  }
  
  if (!data.konten || data.konten.length < 100) {
    errors.konten = 'Konten berita minimal 100 karakter';
  }
  
  return errors;
}; 