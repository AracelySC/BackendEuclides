
const XLSX = require('xlsx');
const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');

const excel = XLSX.readFile('DatosTarea1.xls');
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


let euclidesDistance = 0;   //Guarda el valor de diferencia del grupo de datos actual
let minIndex = 0;
let minDistance = 0;

const corsOptions = {
    origin:'https://tarea-euclides.vercel.app', 
   // origin:'http://localhost:3001', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}


const port = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
 app.options("*",cors(corsOptions));
 app.use(cors(corsOptions));
app.listen(port);



app.get("/hello", (req, res) => {
    res.send("hello world")
    console.log("hello world");
})


app.post("/aprendizaje/get", (req, res) => {
    data = req.body.data;
    res.header("Access-Control-Allow-Origin", "*");
    var obj = dataRecintoEstilo.map(doc => Object.values(doc));
    res.send(euclides(obj,data,[0,5,6,7],7));

})

app.post("/recinto/get", (req, res) => {
    data = req.body.data;
    res.header("Access-Control-Allow-Origin", "*");
    var obj = dataAll.map(doc => Object.values(doc));
    res.send(euclides(obj,data,[3,4,5,6,7,8],1));

})
app.post("/sexo/get", (req, res) => {
    data = req.body.data;
    var obj = dataAll.map(doc => Object.values(doc));
    res.send(euclides(obj,data,[3,4,5,6,7,8],0));

})

app.post("/aprendizaje2/get", (req, res) => {
    data = req.body.data;
    var obj = dataAll.map(doc => Object.values(doc));
    res.send(euclides(obj,data,[3,4,5,6,7,8],9));

})
app.post("/profesor/get", (req, res) => {
    data = req.body.data;
    var obj = dataProfesores.map(doc => Object.values(doc));
    res.send(euclides(obj,data,[8],8));

})

app.post("/redes/get", (req, res) => {
    data = req.body.data;
    var obj = dataRedes.map(doc => Object.values(doc));
    res.send(euclides(obj,data,[0,5],5));

})


console.log(`Server running in the Port: ${port}`);
module.exports= app;
  // console.log(dataRecintoEstilo);
//    console.log(dataAll);
  //  console.log(dataProfesores);
 //    console.log(dataRedes);

    function euclides(sheet, userData, extraColums, returnColum) {
        let euclidesDistance = 0;   //Guarda el valor de diferencia del grupo de datos actual
        let minIndex = 0;
        let minDistance = 0;
   
        for (var row = 0; row < sheet.length; row++) {
            euclidesDistance = 0;
            for (var colum = 0; colum < sheet[0].length; colum++) {
                //excluye  losvalores irrelevantes del arreglo
                if (extraColums.includes(colum)==false) {
                    //Busca valores que no sean de tipo numero
                    if (isNaN(sheet[row][colum]) == false) {
                        //Euclides sumatoria
                        euclidesDistance += Math.pow(sheet[row][colum] - userData[colum], 2);
                    }
                    else {
                        //valores tipo string
                        if (sheet[row][colum] != userData[colum]) {
                            euclidesDistance += 1;
                        }
                    }
                }
            }
             //Euclides raiz
            euclidesDistance = Math.sqrt(euclidesDistance);
            if (row == 0) {
                minDistance = euclidesDistance;
                minIndex = row;
            }//Registro con mas similitud
            else if (minDistance > euclidesDistance) {
                minDistance = euclidesDistance;
                minIndex = row;
            }
        }
        
        console.log(minIndex+"   "+returnColum);
        console.log(sheet[minIndex][returnColum]);
        return sheet[minIndex][returnColum];
    }