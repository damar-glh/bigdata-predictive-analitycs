function normalize1NF() {
  const SOURCE_SHEET_NAME = "Raw Data";
  const OUTPUT_SHEET_NAME = "1NF";
 
  // Index kolom sesuai struktur tabel:
  // SJ_Id, Status, Date, SJ_ref, From, Dest_1, Dest_2, Port_Code,
  // Split_Group_ID, Product_1, Product_1_Qty, Product_2, Product_2_Qty,
  // Product_3_Name, Product_3_Qty, Total_Qty, UOM, Created_By, Remarks
 
  const COL = {
    SJ_ID         : 0,
    STATUS        : 1,
    DATE          : 2,
    SJ_REF        : 3,
    FROM          : 4,
    DEST_1        : 5,
    DEST_2        : 6,
    PORT_CODE     : 7,
    SPLIT_GROUP   : 8,
    PRODUCT_1     : 9,
    PRODUCT_1_QTY : 10,
    PRODUCT_2     : 11,
    PRODUCT_2_QTY : 12,
    PRODUCT_3     : 13,
    PRODUCT_3_QTY : 14,
    TOTAL_QTY     : 15,
    UOM           : 16,
    CREATED_BY    : 17,
    REMARKS       : 18,
  };
 
  const ss          = SpreadsheetApp.getActiveSpreadsheet();
  const sourceSheet = ss.getSheetByName(SOURCE_SHEET_NAME);
 
  if (!sourceSheet) {
    SpreadsheetApp.getUi().alert(`Sheet "${SOURCE_SHEET_NAME}" tidak ditemukan!\nSesuaikan SOURCE_SHEET_NAME di kode.`);
    return;
  }
 
  // Ambil semua data
  const allData   = sourceSheet.getDataRange().getValues();
  const dataRows  = allData.slice(1); // hapus header
 
  // Header untuk sheet output 1NF
  const outputHeader = [
    "SJ_Id", "Status", "Date", "SJ_ref", "From",
    "Dest", "Port_Code", "Split_Group_ID",
    "Product", "Qty",
    "UOM", "Created_By", "Remarks"
  ];
 
  const outputRows = [];
 
  dataRows.forEach(row => {
    const sjId       = row[COL.SJ_ID];
    const status     = row[COL.STATUS];
    const date       = row[COL.DATE];
    const sjRef      = row[COL.SJ_REF];
    const from       = row[COL.FROM];
    const portCode   = row[COL.PORT_CODE];
    const splitGroup = row[COL.SPLIT_GROUP];
    const uom        = row[COL.UOM];
    const createdBy  = row[COL.CREATED_BY];
    const remarks    = row[COL.REMARKS];
 
    // Kumpulkan destinasi
    const dests = [row[COL.DEST_1], row[COL.DEST_2]].filter(d => d !== "" && d !== null && d !== undefined);
 
    // Kumpulkan produk + qty
    const products = [
      { name: row[COL.PRODUCT_1], qty: row[COL.PRODUCT_1_QTY] },
      { name: row[COL.PRODUCT_2], qty: row[COL.PRODUCT_2_QTY] },
      { name: row[COL.PRODUCT_3], qty: row[COL.PRODUCT_3_QTY] },
    ].filter(p => p.name !== "" && p.name !== null && p.name !== undefined);
 
    // Jika tidak ada produk sama sekali, skip baris
    if (products.length === 0) return;
 
    // Jika tidak ada dest, tetap buat baris dengan dest kosong
    const destList = dests.length > 0 ? dests : [""];
 
    // Setiap kombinasi dest × produk = 1 baris
    destList.forEach(dest => {
      products.forEach(prod => {
        outputRows.push([
          sjId, status, date, sjRef, from,
          dest, portCode, splitGroup,
          prod.name, prod.qty,
          uom, createdBy, remarks
        ]);
      });
    });
  });
 
  // Hapus sheet output lama jika sudah ada, buat yang baru
  let outputSheet = ss.getSheetByName(OUTPUT_SHEET_NAME);
  if (outputSheet) {
    ss.deleteSheet(outputSheet);
  }
  outputSheet = ss.insertSheet(OUTPUT_SHEET_NAME);
 
  // Tulis header
  outputSheet.getRange(1, 1, 1, outputHeader.length).setValues([outputHeader]);
  outputSheet.getRange(1, 1, 1, outputHeader.length)
    .setFontWeight("bold")
    .setBackground("#99E264")
    .setFontColor("#FFFFFF");
 
  // Tulis data
  if (outputRows.length > 0) {
    outputSheet.getRange(2, 1, outputRows.length, outputHeader.length).setValues(outputRows);
  }
 
  // Auto-resize kolom
  outputSheet.autoResizeColumns(1, outputHeader.length);
 
  // Freeze header
  outputSheet.setFrozenRows(1);
}