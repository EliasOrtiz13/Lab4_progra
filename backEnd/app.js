// URL:  http://localhost:5000
//importamos los modulos
const express = require('express') 
const mongoose = require('mongoose')
const Clients = require('./data/Clients')
const cors = require('cors')

const app = express() //invocando el express

const Name_DB = 'dataClient' // Nombre de la database
const DB_USER = 'elias'
const DB_PASSWORD = 'elias'

// =======Configuracion de mi compañero=======
// const DB_USER = 'cristhian'
// const DB_PASSWORD = 'cristhian'
// ===========================================

app.use(express.json()) //requiridos
app.use(cors({origin:'http://localhost:4200'}))

app.get('/', (req, res) => {
    res
        .send(//Codigo HTML de la pagina principal
        '<html><title>MiApi</title><body><h1> Data de Clientes </h1><a href= "/clients">Lista de Clientes</a></body></html>'
        )
})

// Read: todos los items
app.get('/clients', async (req, res) => {
    try {
        const clients = await Clients.find()
        res.status(200).json(clients)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

// Read: un item
app.get('/clients/:id', async (req, res) => {
    const id = req.params.id // extraer id del dato
    try {
        const client = await Clients.findOne({_id: id})
        if(!client){
            res.status(422).json({ message: 'Cliente no encontrado'})
            return
        }
        res.status(200).json(client)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

// Create
app.post('/clients', async (req, res) => { // async -> await
    const { dni, surname, name, age, salary } = req.body
    if(!dni || !surname || !name || !age || !salary) {
        res.status(422).json({ error: 'Proveer el dni, apellido, nombre, edad y salario del cliente'})
        return
    }
    if(typeof dni !== "number" || typeof age !== "number" || typeof salary !== "number"){  //Si se ingresa un str en dni, edad o salario
        res.status(422).send({ error: 'Ingrese solo números para el dni, edad o salario'})
        return
    }
    if(typeof surname !== "string" || typeof name !== "string"){
        res.status(422).send({ error: 'No puede ingresar números en el apellido y el nombre'})
    return
    }
    const client = {
        dni,
        surname,
        name,
        age,
        salary,
    }
    try {
        await Clients.create(client)
        res.status(201).json({ message:'!Ha sido creado un nuevo cliente!'})
    } catch (error) {
        res.status(500).json({ error: error}) // la mejor alternativa es crear un log de errores
    }
})

// Update
app.patch('/clients/:id', async (req, res) => {
    const id = req.params.id
    const { surname, name, age, salary } = req.body
    const updatedClient = {
        surname,
        name,
        age,
        salary,
    }
    try {
        const updateClient = await Clients.updateOne({_id: id}, updatedClient)
        if(updateClient.matchedCount === 0){
            res.status(422).json({message: 'Cliente no encontrado'})
            return
        }
        res.status(200).json({updatedClient})
    } catch (error) {
        res.status(500).json({ error: error })
    }  
})

// Delete
app.delete('/clients/:id', async (req, res) => {
    const id = req.params.id
    const client = await Clients.findOne({_id: id})
    if(!client){
        res.status(422).json({message: 'Cliente no encontrado'})
        return
    }
    try {
        await Clients.deleteOne({_id: id})
        res.status(200).json({message: 'Cliente removido'})
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@myapi.hxjesbx.mongodb.net/${Name_DB}?retryWrites=true&w=majority`
    // Despues de .net/  colocar el nombre de la base de datos de Mongo
    ).then(() => {
        console.log('Connectado al MONGODB')
        app.listen(5000)
    })
    .catch((err) => {
        console.log(err)
})

app.all('*', (req, res) => {
    res
        .status(404) //Error
        .send('<h1>NO ENCONTRADO</h1>') //Pagina por defecto cuando no se encuentra la direccion url
})