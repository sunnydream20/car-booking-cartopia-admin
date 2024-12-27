const { Article } = require("../models/articles");
const { route } = require("./article");

const router = require("express").Router();

router.get("/", async (req, res) => {
	try {
		const articles = await Article.find({});
        res.status(200).json({articles: articles});
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.get("/:id", async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        res.status(200).send(article);
    } catch (error) {
        console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
    }
})

router.get("/page/totallength" , async (req, res) => {
    try {
        const totalLength = await Article.countDocuments();
        res.status(200).send({totalLength: totalLength})
    }
    catch (error) {
        console.log(error)
    }
})

router.get("/get/pagination", async (req, res) => {
    try {
        const {currentPage, pageSize} = req.query;
        const page = parseInt(currentPage);
        const limit = parseInt(pageSize);
        const skip = (page - 1) * limit;
        const articles = await Article.find()
            .skip(skip)
            .limit(limit);
        res.status(200).json({
            articles
        });

    } catch (error) {
        console.log(error)
    }
})

router.post("/", async(req, res) => {
    try {
        const {url , des, title} = req.body.currentArticle;
        let newArticle = new Article({
            url,
            title,
            des
        });
        await newArticle.save();
        res.status(200).send({message: "successfully saved"});
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Internal Server Error"});
    }
})

router.put("/:id", async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        const {url, title, des} = req.body.currentArticle;
        article.url = url;
        article.title = title;
        article.des = des;
        article.save();
        res.status(200).send(article);
    } catch (error) {
        console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
    }
})


router.delete("/:id", async (req, res) => {
    try {
        await Article.findByIdAndDelete(req.params.id);
        res.status(200).send({message: "succesfully deleted"});
    } catch (error) {
        console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
    }
})
module.exports = router;
