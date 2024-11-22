const router = require("express").Router();
const { Car, validate } = require("../models/car");


router.get("/promo", async (req, res) => {
	try {
		const cars = await Car.find({promo: "true"});
		if (cars.length > 0)
			return res.status(200).send({ cars });
        else {
		    res.status(400).send({ message: "Car doesn't exist!" });
        }
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.get("/popular", async (req, res) => {
	try {
		const cars = await Car.find({popular: "true"});
		if (cars.length > 0)
			return res.status(200).send({ cars });
        else {
		    res.status(400).send({ message: "Car doesn't exist!" });
        }
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.get("/promo/:id", async (req, res) => {
    try {
        const categoryId = req.params.id;
        const selectedCar = await Car.find({promo: "true", catId: categoryId});
        if (!selectedCar) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.json(selectedCar);
    } catch (error) {
        res.status(500).send({message: "Internal Server Error"});
    }
})


module.exports = router;
