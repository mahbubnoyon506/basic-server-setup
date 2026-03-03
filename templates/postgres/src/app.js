const express = require("express")
const cors = require('cors');
const authRoutes = require('./routes/authRoute');
const sequelize = require("./config/db");

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Routes
app.use('/api/auth', authRoutes)

//Health check
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Backend API is running...'
    })
})

//Global 404 Handler
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' })
})

//Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something went wrong!',
        message: err.message
    })
})

// Start Server
const PORT = process.env.PORT || 5000
sequelize.sync({ alter: true })
    .then(() => {
        console.log('Database connected and synced');
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        })
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    })