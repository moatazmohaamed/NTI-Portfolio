const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

const projectsRoute = require("./routes/projectsRoute");
const teamRoute = require("./routes/teamRoute");
const testimonialsRoute = require("./routes/testimonialsRoute");
const contactFormRoute = require("./routes/contactFormRoute");
const categoryRoute = require("./routes/categoryRoute");
const servicesRoute = require("./routes/servicesRoute");
const aboutUsRoute = require("./routes/aboutUsRoute");
const faqRoute = require("./routes/faqRoute");


app.use(
  cors()
);


app.use(express.json());
app.use(morgan("dev"));
app.use('/uploads', express.static('uploads'));



// Routes
app.use("/api/projects", projectsRoute);
app.use("/api/team-members", teamRoute);
app.use("/api/testimonials", testimonialsRoute);
app.use("/api/contact", contactFormRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/services", servicesRoute);
app.use("/api/about-us", aboutUsRoute);
app.use("/api/faqs", faqRoute);

app.use('/', (req,res)=>{
  res.send("helllow")
})

module.exports = app;