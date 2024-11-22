const router = require("express").Router();
const { Detail } = require("../models/details");

router.get("/", async (req, res) => {
	try {
		const details = await Detail.find();
		if (details.length > 0)
			return res.status(200).send({ details });
        else {
		    res.status(400).send({ message: "Details doesn't exist!" });
        }
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;
