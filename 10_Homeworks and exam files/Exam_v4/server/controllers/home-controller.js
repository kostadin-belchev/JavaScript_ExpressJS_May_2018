const Article = require('../data/Article')
const Edit = require('../data/Edit')
const url = require('url')
const qs = require('querystring')
const NUMBER_OF_WORDS_TO_GET = 50
const getFirstNWordsInAString = require('../utilities/getFirstNWords')

module.exports = {
  index: (req, res) => {
    // TO DO
    Article.find({}).then((allArticles) => {
      if (allArticles.length === 0) {
        res.render('home/index', { articles: allArticles })
        return
      }
      let latestArticle = allArticles[allArticles.length - 1]
      let upToMostrecentThreeArticles = allArticles.slice(-3).reverse()
      let mostRecentEditIdOfLatestArticle = latestArticle.edits.pop()
      Edit.findById(mostRecentEditIdOfLatestArticle).then((edit) => {
        let latestArticleContent = edit.content
        let latestArticleContentNwords = getFirstNWordsInAString(latestArticleContent, NUMBER_OF_WORDS_TO_GET)
        res.render('home/index', {
          latestArticle,
          latestArticleContentNwords: latestArticleContentNwords + ' ...',
          articles: upToMostrecentThreeArticles
        })
      })
    })
  },
  lastArticle: (req, res) => {
    Article.find({}).then((allArticles) => {
      if (allArticles.length === 0) {
        res.render('home/latest-article', { articles: allArticles })
        return
      }
      let latestArticle = allArticles.pop()
      let mostRecentEditIdOfLatestArticle = latestArticle.edits.pop()
      Edit.findById(mostRecentEditIdOfLatestArticle).then((edit) => {
        res.render('home/latest-article', {
          latestArticle,
          edit
        })
      })
    })
  }
}
