import React from 'react';
// Exportar fichero a Excel
import * as FileSaver from 'file-saver';
import XLSX from 'sheetjs-style';

const ExcelExport = ({excelData, fileName}) => {
    const fileType = 'application/vnd.ms-excel;charset=utf-8';
    const fileExtension = '.xlsx';

    const exportExcel = async() => {
        const newData = [];
        excelData.forEach(item => {
            newData.push(
                {
                    nombre: item.nombre,
                    cantidad: item.cantidad,
                }
            )
        })

        const ws = XLSX.utils.json_to_sheet(newData);
        const wb = { Sheets: {'data': ws}, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, {bookType: 'xlsx', type: 'array'});
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }

    return ( 
        <>
            <span className="icon solid fa-download excel-button border-buttons" onClick={(e) => exportExcel(fileName)}>
                <span className="label">Descarga</span>
            </span>
        </>
     );
}
 
export default ExcelExport;