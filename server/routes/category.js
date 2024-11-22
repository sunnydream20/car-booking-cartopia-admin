const router = require("express").Router();
const { Category, validate } = require("../models/category");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
	try {
		// const { error } = validate(req.body);
		// if (error)
		// 	return res.status(400).send({ message: error.details[0].message });


		const category = await Category.findOne({ type: req.body.type.toUpperCase() });
		if (category)
			return res
				.status(409)
				.send({ message: "That Type already Exist!" });

		await new Category({ ...req.body, type: req.body.type.toUpperCase()}).save();
		res.status(201).send({ message: "Category created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.get("/", async (req, res) => {
	try {
		const categories = await Category.find();
		if (categories.length > 0)
			return res.status(200).send({ categories });
        else {
		    res.status(400).send({ message: "Category doesn't exist!" });
        }
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.get("/:id", async (req, res) => {
    try {
        const categoryId = req.params.id;
        const selectedCategory = await Category.findById(categoryId);

        if (!selectedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.json(selectedCategory);
    } catch (error) {
        res.status(500).send({message: "Internal Server Error"});
    }
})

router.put("/:id", async (req, res) => {
    try {
        const categoryId = req.params.id;
        const selectedCategory = await Category.findById(categoryId);
        const updatedCategory = req.body;
        Object.assign(selectedCategory, updatedCategory.category);
        const savedresult = await selectedCategory.save();
        res.status(200).json(savedresult);
    } catch (error) {
        res.status(500).send({message: "Internal Server Error"});
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const categoryId = req.params.id;
        await Category.findByIdAndDelete(categoryId);
        
        res.status(200).send({message: "Delete Successfully!"});
    } catch (error) {
        res.status(500).send({message: "Internal Server Error"});
    }
})


module.exports = router;
