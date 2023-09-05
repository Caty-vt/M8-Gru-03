import express from "express";
import fileUpload from 'express-fileupload';
import { Joya } from "./class/joyas.js";
// import pg from "pg";

const app = express();
const joya = new Joya()

app.use(express.json());
app.use(fileUpload());
app.use(express.static('public'));

app.post('/upload', async (req, res)=>{
console.log(req);
    // console.log(req.files);
    let EDFile = req.files.file;
    //console.log(EDFile)
    let i = 1;
    let nombre = `anillo${i}.png`;
    if(EDFile.mimetype == 'image/png'){
        await EDFile.mv(`./public/files/${nombre}`);
    }else{
        console.log("Error Formato Archivo 1")
    }

        res.send(`<img src='/files/anillo1.png'>`) 
})

app.get("/imagen", (req, res)=>{
    res.send(`<img src='/files/anillo1.png'>`)
});

app.get("/v1/joyas",async (req,res)=>{
    try{
        res.status(200).json(await joya.listarTodo())
    }catch(error){
        res.sendStatus(400);
    }
});

// app.get("/v1/joyas/anillo", async (req, res)=>{
//     try
//     res.json(await joya.filtrar())
// });

app.get('/v1/joyas/nombre/:nombre', async (req, res) => {
    try {
        res.status(200).json(await joya.filtrar1(req.params.nombre));
        
    } catch (error) {
        res.sendStatus(400)        
    }
});

app.get('/v1/joyas/material/:material', async (req, res) => { 
    try {
        res.status(200).json(await joya.filtrarMaterial(req.params.nombre));
    
    } catch (error) {
         res.sendStatus(400)        
}
});

app.get("/v1/joyas/:id", async (req, res) =>{
    try {
        res.status(200).json(await joya.listarId(req.params.nombre));
        
    } catch (error) {
        res.sendStatus(400)        
    }
});

app.post("/v1/joyas", async (req, res)=>{ 

    try {
        const {nombre, peso, precio, material} = req.body
        res.status(201).json(await joya.crear(nombre, peso, precio, material));
} catch (error) {
    res.sendStatus(400)        
}
});

app.put("/v1/joyas/", async (req,res)=>{
    try{
        const {id, nombre, peso, precio, material} = req.body
        res.status(201).json(await joya.editar(id, nombre, peso, precio, material));
    }catch(error){
        res.sendStatus(400)
    }
})

app.delete("/v1/joyas/:id", async(req,res)=>{
    try{
        const resultado = await joya.eliminar(req.params.id);
        //punto 6
        const eliminacionExitosa = resultado >0
        res.json({success:eliminacionExitosa})
    }catch(error){
        res.sendStatus(400)
    }
    })





app.listen(3000, ()=>{
    console.log("Levantando servidor en puerto 3000")
});