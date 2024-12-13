export const validateAnimal = (data) => {
    const errors = {};
    
    if (!data.nama) errors.nama = 'Nama satwa harus diisi';
    if (!data.species) errors.species = 'Species harus diisi';
    if (!data.status) errors.status = 'Status harus diisi';
    if (!data.populasi) errors.populasi = 'Populasi harus diisi';
    if (data.populasi < 0) errors.populasi = 'Populasi tidak boleh negatif';
    if (!data.deskripsi) errors.deskripsi = 'Deskripsi harus diisi';
    if (data.deskripsi.length < 50) errors.deskripsi = 'Deskripsi minimal 50 karakter';
    
    return errors;
};

export const validateNews = (data) => {
    const errors = {};
    
    if (!data.judul) errors.judul = 'Judul berita harus diisi';
    if (data.judul.length < 10) errors.judul = 'Judul minimal 10 karakter';
    if (!data.konten) errors.konten = 'Konten berita harus diisi';
    if (data.konten.length < 100) errors.konten = 'Konten minimal 100 karakter';
    if (!data.gambar) errors.gambar = 'Gambar harus diunggah';
    
    return errors;
};

export const validateConservation = (data) => {
    const errors = {};
    
    if (!data.nama) errors.nama = 'Nama program harus diisi';
    if (!data.animal) errors.animal = 'Satwa harus dipilih';
    if (!data.deskripsi) errors.deskripsi = 'Deskripsi harus diisi';
    if (data.deskripsi.length < 50) errors.deskripsi = 'Deskripsi minimal 50 karakter';
    if (!data.tanggal_mulai) errors.tanggal_mulai = 'Tanggal mulai harus diisi';
    if (!data.tanggal_selesai) errors.tanggal_selesai = 'Tanggal selesai harus diisi';
    if (data.tanggal_mulai > data.tanggal_selesai) {
        errors.tanggal_selesai = 'Tanggal selesai harus setelah tanggal mulai';
    }
    
    return errors;
};

export const validateProfile = (data) => {
    const errors = {};
    
    if (!data.bio) errors.bio = 'Bio harus diisi';
    if (data.bio.length < 10) errors.bio = 'Bio minimal 10 karakter';
    if (!data.location) errors.location = 'Lokasi harus diisi';
    
    return errors;
}; 