'use strict'
const status = require('http-status')

module.exports = (app, options) => {
  const {repo} = options

  app.get('/summit/findByCountry', (req, res, next) => {
    repo.findSummitsByCountry(req.params.country).then(summits => {
      res.status(status.OK).json(summits)
    }).catch(next)
  })

  app.get('/summit/findByHeight', (req, res, next) => {
    repo.findSummitsByHeight(req.params.height,req.params.rel).then(summits => {
      res.status(status.OK).json(summits)
    }).catch(next)
  })

  app.get('/summit/:id', (req, res, next) => {
    repo.getSummitById(req.params.id).then(summit => {
      res.status(status.OK).json(summit)
    }).catch(next)
  })
}
