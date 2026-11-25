const express = require('express');
const projectRoutes = require('./routes/projects')
const tasksRoutes = require('./routes/tasks')

const app = express()

app.use(express.json())

app.use((req, res, next) => {
    const startedAt = new Date()

    res.on('finish', () => {
        console.log(`${startedAt.toISOString()} - ${res.method} ${req.originalUrl}`);
    })

    next()
})

app.get('/api', (req, res) => {
    res.json({ message: "Service is healthly" })
})

app.use('/api/projects', projectRoutes)
app.use('/api/tasks', tasksRoutes)

app.use((req,res)=>{
    res.status(404).json({ error: `Маршрут ${req.originalUrl} не найден` })
})

app.use((err,req,res,next)=>{
    console.log(err);
    res.status(500).json({ error: `Внутренняя ошибка сервера`})
})

module.exports = app