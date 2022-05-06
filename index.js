const BASE_URL = 'https://backend-euclides.vercel.app';

const XLSX = require('xlsx');
const express = require("express");
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());


app.get("/hello", (req, res) => {
    res.send("hello world")
    console.log("hello world");
})

app.post(BASE_URL + "/aprendizaje/get", (req, res) => {
    data = req.body.data;
    console.log(data);
    res.send("Prueba");

})

app.post(BASE_URL + "/recinto/get", (req, res) => {
    data = req.body.data;
    res.send("recinto");

})
app.post(BASE_URL + "/sexo/get", (req, res) => {
    data = req.body.data;
    res.send("sexo");

})

app.post(BASE_URL + "/aprendizaje2/get", (req, res) => {
    data = req.body.data;
    res.send("aprendizaje2");

})
app.post(BASE_URL + "/profesor/get", (req, res) => {
    data = req.body.data;
    res.send("profesor");

})

app.post(BASE_URL + "/redes/get", (req, res) => {
    data = req.body.data;
    res.send("redes");

})

app.listen(3000, () => {
    console.log("Server running");
});

function leerExcel(ruta) {
    const excel = XLSX.readFile(ruta);
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

//leerExcel('DatosTarea1.xls');