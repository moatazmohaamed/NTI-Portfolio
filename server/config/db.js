const mongoose = require('mongoose');

if (process.env.NODE_ENV === "development") {
    console.log("Running in dev mode");
}

mongoose.connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
}).then(() => {
    console.log('Database connected successfully');
}).catch((err) => {
    console.error('Database connection error:', err);
});