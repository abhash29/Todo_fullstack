import { Hono } from 'hono'
import {neon} from "@neondatabase/serverless";
import {z} from "zod";

import { cors } from 'hono/cors'

const app = new Hono()

app.use(
  '*',
  cors({
    origin: 'http://localhost:5173',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowHeaders: ['Content-Type'],
  })
)

const connectdb = () => {
    return neon("postgresql://neondb_owner:npg_gYrqOZa0uUt6@ep-calm-term-a4eqq827-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require");
}

const sql = connectdb();
async function createTable() {
await sql`
  CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );
`;

await sql`
  CREATE TABLE IF NOT EXISTS todo(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    work VARCHAR(250) NOT NULL,
    time VARCHAR(250) NOT NULL,
    status BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );
`;
}
createTable();



//ZOD
const userSchema = z.object({username: z.email(), password: z.string().min(3), firstName: z.string(), lastName: z.string()});
const todoSchemaZod = z.object({work: z.string().min(3), time: z.string(), status: z.boolean().default(false), user_id: z.number()});
const updateTodoSchema = z.object({work: z.string().min(3).optional(), time: z.string().optional(), status: z.boolean().default(false).optional(), user_id: z.number().optional()});

//Routes
//1. to add todo
app.post('/todos', async (c) => {
  try{
    const body  = await c.req.json();
    const result = todoSchemaZod.safeParse(body);
    if(!result.success){
      return c.json({msg: "Wrong inputs"}, 400);
    }
    const todo = result.data;
    await sql `
        INSERT INTO todo (work, time, status, user_id)
        VALUES (${todo.work}, ${todo.time}, ${todo.status}, ${todo.user_id})
    `
    return c.json({msg: "Todo added"}, 200)
  }
  catch(error){
    console.log(error);
    return c.json({msg: "Internal error"}, 500);
  }
})
//2. to delete todo
app.delete('/todos/:id', async (c) => {
  const id = Number(c.req.param('id'));
  try{
    const result = await sql `
      DELETE FROM todo
      where id=${id}
      RETURNING id
    `;
    if(result.length===0){
      return c.json({msg: "Todo not found"}, 404);
    }
    return c.json({msg: "Todo deleted: ", id}, 200);
  }
  catch(error){
    console.log(error);
    return c.json({msg: "Internal error"}, 500);
  }
})
//3. to update todo
app.put('/todos/:id', async (c) => {
  const id = Number(c.req.param('id'));
  const body = await c.req.json();
  const result = updateTodoSchema.safeParse(body);
  if(!result.success){
    return c.json({msg: "Invalid inputs"}, 400);
  }
  try{
    const {work, time,  status } = result.data;
    await sql`
      UPDATE todo
      SET
        work   = COALESCE(${work}, work),
        time   = COALESCE(${time}, time),
        status = COALESCE(${status}, status)
      WHERE id = ${id}
    `;
    return c.json({msg: "Updated successfully"});
  }
  catch(error){
    console.log(error);
    return c.json({msg: "Internal error"}, 500);
  }
})
//4. get list of todos
app.get('/todos/user/:id', async (c) => {
  const userId = Number(c.req.param('id'));
  try{
    const result = await sql `
      SELECT * FROM todo WHERE user_id = ${userId}
    `;
    return c.json(result)
  }
  catch(error){
    console.log(error);
    return c.json({msg: "Internal error"}, 500);
  }
})
//5. single todo
app.get('/todos/user/:id/todo/:id2', async (c) => {
  const userId = Number(c.req.param('id'))
  const todoId = Number(c.req.param('id2'))
  try{
    const result = await sql`
      SELECT * FROM todo where user_id=${userId} AND id=${todoId}
    `;
    if(result.length===0){
      return c.json({msg: "Todo not found"}, 404);
    }
    return c.json(result[0])
  }
  catch(error){
    console.log(error);
    return c.json({msg: "Internal error"}, 500);
  }
})

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
