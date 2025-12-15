const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const  {z} = require('zod');

mongoose.connect('mongodb+srv://abhash29:Abhash%406685@cluster0.07ms2qn.mongodb.net/users');
const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('hello backend');
});

//Work for database
const todoSchema = new mongoose.Schema({work: {type: String, required: true}, time: {type: String, required: true}});
const Todo = mongoose.model("Todo", todoSchema);

//Zod Schema
const todoSchemaZod = z.object({work: z.string().min(3), time: z.string()});




//backend
app.get('/todos', async (req, res) => {
    try{
        const todos = await Todo.find();
        res.json(todos);
    }
    catch(err){
        res.status(500).json(err);
    }
});
//1. Add Todo
//validate Schema
app.post('/todos', async (req, res) => {
    try{
        const {work, time} = req.body;
        const result = todoSchemaZod.safeParse({work, time});
         if(!result.success){
            return res.status(401).json({msg: "Wrong input"});
        }   
        const newTodo = new Todo({
            work, time,
        })
        await newTodo.save();
        res.status(200).json({msg: "Todo Added Successfully"});
    }
    catch(error){
        res.status(500).json(error);
    }
});
//2. Remove Todo
app.delete('/todos/:id', async (req, res) => {
    const id = req.params.id;
    try{
        const deleteTask = await Todo.findByIdAndDelete(id);
        if(!deleteTask){
            return res.status(404).json({msg: "Todo not found"});
        }
        res.status(200).json({msg: `id deleted: ${id}`});
    }
    catch(error){
        console.log(error);
    }
})
//3. Update Todo
app.put("/todos/:id", async (req, res) => {
    const id = req.params.id;
    try{
    const {work, time} = req.body;
    const result = todoSchemaZod.safeParse({work, time});
    if(!result.success){
        return res.status(400).json({msg: "Invalid input"});
    }
    const updateTask = await Todo.findByIdAndUpdate(id, {work: work, time: time});
    if(!updateTask){
        return res.status(404).json({msg: "Id not found"});
    }
    res.status(200).json({msg: 'updated successfully'});
    }
    catch(error){
        console.log(error);
    }
});
//4. Update State

app.listen(3000);