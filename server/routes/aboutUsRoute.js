const router = require("express").Router();
const {
    getAbout,
    createAbout,
    updateAbout,
    deleteAbout
} = require("../controllers/aboutController");

router.get("/", getAbout).post('/', createAbout).put('/:id', updateAbout).delete('/:id', deleteAbout);

module.exports = router