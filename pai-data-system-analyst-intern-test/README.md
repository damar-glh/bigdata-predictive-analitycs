# Pre-Screening Test — Data & Systems Analyst Intern

Isi folder hasil pengerjaan Pre-Screening Test posisi **Data & Systems Analyst Intern**, mencakup analisis normalisasi (1NF - 3NF) dari dataset.

## Struktur Folder

```
pre-screening-intern/
├── README.md                        - file ini
├── normalize_1NF.gs                 - Google Apps Script untuk 1NF
└── docs/
    └── normalization_notes.md       - catatan detail proses normalisasi
```

## Cara Pakai Script (`normalize_1NF.gs`)

1. Buka Google Sheets
2. Klik **Extensions → Apps Script**
3. Hapus kode default, gunakan `normalize_1NF.gs`
4. Sesuaikan variabelnya
5. Klik **Run**
6. Sheet baru `1NF` otomatis terbuat

> Script ini secara otomatis mengubah kolom repeating groups menjadi baris terpisah sesuai syarat 1NF.


## Author

**Damar** — damar-glh  
[github.com/damar-glh](https://github.com/damar-glh)