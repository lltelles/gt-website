const express = require("express");
const Article = require("./../models/article");
const router = express.Router();

router.get("/new", (req, res) => {
  res.render("articles/new", { article: new Article() });
});

router.get("/:slug", async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug });
    if (!article) return res.redirect('/articles');
    res.render('articles/show', { article: article });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


router.post("/", async (req, res, next) => {
 req.article = new Article()
 next()
},saveArticleAndRedirect('new'));

method='DELETE'
router.delete('/:id', async (req, res) => {
  await Article.findByIdAndDelete(req.params.id)
  res.redirect('/articles')
})

router.get("/edit/:id", async (req, res) => {
  const article = await Article.findById(req.params.id)
  res.render("articles/edit", { article: article });
});

router.put("/:id", async (req, res, next) => {
  req.article = await Article.findById(req.params.id)
  next()
 },saveArticleAndRedirect('edit'));

function saveArticleAndRedirect(path) {
  return async (req, res) => {
    let article = req.article;
    article.title = req.body.title;
    article.description = req.body.description;
    article.markdown = req.body.markdown;
    try {
      article = await article.save();
      res.redirect(`/articles/${article.slug}`);
    } catch (error) {
      console.error(error);
      res.status(500).render(`articles/${path}`, { article: article });
    }
  };
}
module.exports = router;
