const Article = require('../data/Article')
const Edit = require('../data/Edit')
const url = require('url')
const qs = require('querystring')

module.exports = {
  index: (req, res) => {
    Article.findOne({}).then((latestArticle) => {
      let orderedEditIdsByDate = latestArticle.edits.sort((a, b) => {
        return (b.toString()).localeCompare(a.toString())
      })
      let targetEditId = orderedEditIdsByDate[0]
      Edit.findById(targetEditId).then((mostRecentEdit) => {
        let articleTitle = latestArticle.title
        let isAdmin = false
        if (req.user) {
          if (req.user.username === 'Admin') {
            isAdmin = true
          }
        }
        res.render('home/index', {
          articleTitle,
          isAdmin,
          mostRecentEdit
        })
      })
    })
  },
  about: (req, res) => {
    res.render('home/about')
  }
}
