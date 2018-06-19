const Article = require('../data/Article')
const Edit = require('../data/Edit')
const url = require('url')
const qs = require('querystring')

module.exports = {
  createGet: (req, res) => {
      res.render('articles/create')
  },
  createPost: (req, res) => {
    let formData = req.body
    // console.log(formData)
    Article.create({
    title: formData.title,
    }).then((newArticle) => {
    // console.log('newArticle: ')
    // console.log(newArticle)
    Edit.create({
        articleId: newArticle._id,
        author: req.user.username,
        content: formData.content
    }).then((newEdit) => {
        // console.log('newEdit: ')
        // console.log(newEdit)
        newArticle.edits.push(newEdit._id)
        newArticle.save().then(() => {
        res.render('articles/create', {status: true})
        })
    })
    })
  },
  seeAll: (req, res) => {
    Article.find({}).then((allArticles) => {
      // order alphabetically
      // let allArticlesOrdered = allArticles.sort((a, b) => {
      //   return (a.title).localeCompare(b.title) 
      // })
      res.render('articles/all-articles', {allArticles})
    })
  },
  detailsGet: (req, res) => {
    let targetArticleId = qs.parse(url.parse(req.url).query).id
    Article.findById(targetArticleId).then((targetArticle) => {
      let orderedEditIdsByDate = targetArticle.edits.sort((a, b) => {
        return (b.toString()).localeCompare(a.toString())
      })
      // console.log('orderedEditIdsByDate 1: ')
      // console.log(orderedEditIdsByDate)
      let targetEditId = orderedEditIdsByDate[0]
      // console.log('most recent edit: ')
      // console.log(targetEditId)
      Edit.findById(targetEditId).then((mostRecentEdit) => {
        // mostRecentEdit is already an object so no need to pass it within {}
        let articleIsLocked = targetArticle.isLocked
        let articleTitle = targetArticle.title
        let isAuthenticated = false
        let isAdmin = false
        if (req.user) {
          isAuthenticated = true
          if (req.user.username === 'Admin') {
            isAdmin = true
          }
        }
        res.render('articles/details', {
          mostRecentEdit,
          articleTitle,
          isAuthenticated,
          articleIsLocked,
          isAdmin
        })
      })
    })
  },
  editGet: (req, res) => {
    let targetArticleId = qs.parse(url.parse(req.url).query).id
    // console.log('targetArticleId: ')
    // console.log(targetArticleId)
    Article.findById(targetArticleId).then((targetArticle) => {
      // console.log("targetArticle: ")
      // console.log(targetArticle)
      let orderedEditIdsByDate = targetArticle.edits.sort((a, b) => {
        return (b.toString()).localeCompare(a.toString())
      })
      // console.log('orderedEditIdsByDate 2: ')
      // console.log(orderedEditIdsByDate)
      let targetEditId = orderedEditIdsByDate[0]
      Edit.findById(targetEditId).then((mostRecentEdit) => {
        let articleTitle = targetArticle.title
        let isAdmin = false
        if (req.user.username === 'Admin') {
          isAdmin = true
        }
        res.render('articles/edit', {
          articleTitle,
          isAdmin,
          mostRecentEdit
        })
      })
    })
  },
  editPost: (req, res) => {
    let formData = req.body
    // console.log('formData:')
    // console.log(formData)
    let targetArticleId = qs.parse(url.parse(req.url).query).id
    // console.log('targetArticleId: ')
    // console.log(targetArticleId)
    Edit.create({
      articleId: targetArticleId,
      author: req.user.username,
      content: formData.content
    }).then((newEdit) => {
      Article.findById(targetArticleId).then((articleToEdit) => {
        articleToEdit.edits.push(newEdit._id)
        articleToEdit.save().then((savedArt) => {
            let articleTitle = articleToEdit.title
            let isAuthenticated = false
            if (req.user) {
              isAuthenticated = true
            }
            res.render('articles/details', {
              mostRecentEdit: newEdit,
              articleTitle,
              isAuthenticated
            })
        })
      })
    })
  },
  lock: (req, res) => {
    let targetArticleId = qs.parse(url.parse(req.url).query).id
    // console.log('targetArticleId: ')
    // console.log(targetArticleId)
    Article.findById(targetArticleId).then((articleToLock) => {
      if (req.user.username !== 'Admin') {
        return
      }
      articleToLock.isLocked = true
      articleToLock.save().then((article) => {
        res.redirect('/all-articles')
      })
    })
  },
  unlock: (req, res) => {
    let targetArticleId = qs.parse(url.parse(req.url).query).id
    // console.log('targetArticleId: ')
    // console.log(targetArticleId)
    Article.findById(targetArticleId).then((articleToUnlock) => {
      if (req.user.username !== 'Admin') {
        return
      }
      articleToUnlock.isLocked = false
      articleToUnlock.save().then((article) => {
        res.redirect('/all-articles')
      })
    })
  },
  historyGet: (req, res) => {
    let targetArticleId = qs.parse(url.parse(req.url).query).id
    // console.log('targetArticleId: ')
    // console.log(targetArticleId)
    Article.findById(targetArticleId).then((targetArticle) => {
      Edit.find({ articleId: targetArticleId}).then((allEdits) => {
        // console.log('allEdits: ')
        // console.log(allEdits)
        let orderedEditIdsByDate = allEdits.sort((a, b) => {
          return (b._id.toString()).localeCompare(a._id.toString())
        })
        // console.log('orderedEditIdsByDate: ')
        // console.log(orderedEditIdsByDate)
        let articleTitle = targetArticle.title
        let isAuthenticated = false
        if (req.user) {
          isAuthenticated = true
        }
        res.render('articles/history', {
          orderedEditIdsByDate,
          articleTitle,
          isAuthenticated
        })
      })
    })
  },
  historyGetDetails: (req, res) => {
    let targetEditId = qs.parse(url.parse(req.url).query).id
    Edit.findById(targetEditId).then((currEdit) => {
      Article.findById(currEdit.articleId).then((currArticle) => {
        let articleIsLocked = currArticle.isLocked
        let articleTitle = currArticle.title
        let isAuthenticated = false
        let isAdmin = false
        if (req.user) {
            isAuthenticated = true
            if (req.user.username === 'Admin') {
            isAdmin = true
            }
        }
        res.render('articles/edit-details', {
            currEdit,
            articleTitle,
            isAuthenticated,
            isAdmin,
            articleIsLocked
        })
      })
    })
  },
  search: (req, res) => {
    let formData = req.body
    let regex = new RegExp(`${formData.searchPattern}`, 'i')
    Article.find({}).where('title', regex).then((foundArticles) => {
      // console.log(foundArticles)
      if (formData.searchPattern === '') {
        foundArticles.length = 0
      }
      res.render('articles/search-results', {
        searchPattern: formData.searchPattern,
        foundArticles
      })
    })
  }
}