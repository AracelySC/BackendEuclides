const XLSX = require('xlsx');

function leerExcel(ruta){
    const  excel = XLSX.readFile(ruta);
    const hojaExcel = excel.SheetNames;
    // console.log(hojaExcel);

    const recintoEstilo = hojaExcel[0];
    const estiloSexoPromedioRecinto = hojaExcel[1];
    const profesores = hojaExcel[2];
    const redes = hojaExcel[3];

    // leer Hojas

    const dataRecintoEstilo = XLSX.utils.sheet_to_json(excel.Sheets[recintoEstilo]);
    const dataAll = XLSX.utils.sheet_to_json(excel.Sheets[estiloSexoPromedioRecinto]);
    const dataProfesores = XLSX.utils.sheet_to_json(excel.Sheets[profesores]);
    const dataRedes = XLSX.utils.sheet_to_json(excel.Sheets[redes]);
    
    // distancia1= criterioRegistro   - CriterioUsuario

    // distancia2= criterioRegistro2   - CriterioUsuario2
    
    // distancia1= Math.pow(distancia1,2)
    // distancia2= Math.pow(distancia2,2)
    
    // DistanciaTotal= distancia1 + distancia 2
    
    // La distancia total es la menor de todas? Si, entonces la Guardo.
    
    // No? Entonces sigo iterando los registros
    
    

    console.log(dataRecintoEstilo);
    console.log(dataAll);
    console.log(dataProfesores);
    console.log(dataRedes);
}

leerExcel('DatosTarea1.xls');