const { HomeSlider } = require("../models/homeslider");

const router = require("express").Router();

router.get("/", async (req, res) => {
	try {
		const homesliders = await HomeSlider.find({});
        res.status(200).json({urls: homesliders});
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.get("/:id", async (req, res) => {
    try {
        const homeslider = await HomeSlider.findById(req.params.id);
        res.status(200).send(homeslider);
    } catch (error) {
        console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
    }
})

router.post("/", async(req, res) => {
    try {
        let newHomeSlider = new HomeSlider({
            url: req.body.currentImg,
        });
        await newHomeSlider.save();
        res.status(200).send({message: "successfully saved"});
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Internal Server Error"});
    }
})

router.put("/:id", async (req, res) => {
    try {
        const homeslider = await HomeSlider.findById(req.params.id);
        homeslider.url = req.body.currentImg;
        homeslider.save();
        res.status(200).send(homeslider);
    } catch (error) {
        console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
    }
})


router.delete("/:id", async (req, res) => {
    try {
        await HomeSlider.findByIdAndDelete(req.params.id);
        res.status(200).send({message: "succesfully deleted"});
    } catch (error) {
        console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
    }
})
module.exports = router;
