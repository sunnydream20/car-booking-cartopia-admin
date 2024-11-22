const { HomeBanner } = require("../models/homebanner");

const router = require("express").Router();

router.get("/", async (req, res) => {
	try {
		const homebanners = await HomeBanner.find({});
        res.status(200).json({homebanners});
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.get("/:id", async (req, res) => {
    try {
        const homebanner = await HomeBanner.findById(req.params.id);
        res.status(200).send(homebanner);
    } catch (error) {
        console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
    }
})

router.post("/", async(req, res) => {
    try {
        const {url, title, des} = req.body.currentBanner;

        let newHomeBanner = new HomeBanner({
            url: url,
            title: title,
            des: des,
        });
        await newHomeBanner.save();
        res.status(200).send({message: "successfully saved"});
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Internal Server Error"});
    }
})

router.put("/:id", async (req, res) => {
    try {
        const homebanner = await HomeBanner.findById(req.params.id);
        const {url, title, des} = req.body.currentBanner;
        homebanner.url = url;
        homebanner.title = title;
        homebanner.des = des;
        homebanner.save();
        res.status(200).send(homebanner);
    } catch (error) {
        console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
    }
})


router.delete("/:id", async (req, res) => {
    try {
        await HomeBanner.findByIdAndDelete(req.params.id);
        res.status(200).send({message: "succesfully deleted"});
    } catch (error) {
        console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
    }
})
module.exports = router;
