const router = require("express").Router();
const { Car, validate } = require("../models/car");

router.post("/", async (req, res) => {
	try {
		// const { error } = validate(req.body);
		// if (error)
		// 	return res.status(400).send({ message: error.details[0].message });


		const car = await Car.findOne({ type: req.body.type.toUpperCase() });
		if (car)
			return res
				.status(409)
				.send({ message: "That Type already Exist!" });

		await new Car({ ...req.body, type: req.body.type.toUpperCase()}).save();
		res.status(201).send({ message: "Category created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.get("/", async (req, res) => {
	try {
		const cars = await Car.find();
		if (cars.length > 0)
			return res.status(200).send({ cars });
        else {
		    res.status(400).send({ message: "Car doesn't exist!" });
        }
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.get("/:id", async (req, res) => {
    try {
        const categoryId = req.params.id;
        const selectedCar = await Car.findById(categoryId);
        console.log(selectedCar)
        if (!selectedCar) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.json(selectedCar);
    } catch (error) {
        res.status(500).send({message: "Internal Server Error"});
    }
})

router.get("/bycat/:id", async (req, res) => {
    try {
        const categoryId = req.params.id;
        if (categoryId == "all") {
            const selectedCars = await Car.find().populate("catId");;

            if (!selectedCars) {
                return res.status(404).json({ message: 'Car not found' });
            }
            res.json(selectedCars);
        }
        else {
            const selectedCars1 = await Car.find({catId: categoryId}).populate("catId");

            if (!selectedCars1) {
                return res.status(404).json({ message: 'Car not found' });
            }
            res.json(selectedCars1);
        }
        
    } catch (error) {
        res.status(500).send({message: "Internal Server Error"});
    }
})

router.put("/:id", async (req, res) => {
    try {
        const carId = req.params.id;
        const selectedCar = await Car.findById(carId);
        const updatedCar = req.body;
        Object.assign(selectedCar, updatedCar.car);
        const savedresult = await selectedCar.save();
        res.status(200).json(savedresult);
    } catch (error) {
        res.status(500).send({message: "Internal Server Error"});
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const carId = req.params.id;
        await Car.findByIdAndDelete(carId);
        
        res.status(200).send({message: "Delete Successfully!"});
    } catch (error) {
        res.status(500).send({message: "Internal Server Error"});
    }
})


module.exports = router;
