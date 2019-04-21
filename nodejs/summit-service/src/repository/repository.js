'use strict'

const matterhorn = {
  id: 1,
  name: 'Matterhorn',
  height: 4478,
  country: 'Switzerland'
}

const montBlanc = {
  id: 2,
  name: 'Mont Blanc',
  height: 4810,
  country: 'France'
}

const repository = (db) => {
  // const collection = db.collection('summits')

  const getSummitById = (id) => {
    return new Promise((resolve, reject) => {
      // const projection = { _id: 0, id: 1, title: 1, format: 1 }
      // const sendMovie = (err, movie) => {
      //   if (err) {
      //     reject(new Error(`An error occured fetching a summit with id: ${id}, err: ${err}`))
      //   }
      //   resolve(movie)
      // }
      // collection.findOne({id: id}, projection, sendMovie)

      resolve(matterhorn)
    })
  }

  const findSummitsByCountry = (country) => {
    return new Promise((resolve, reject) => {
      // const movies = []
      // const cursor = collection.find({}, {title: 1, id: 1})
      // const addMovie = (movie) => {
      //   movies.push(movie)
      // }
      // const sendMovies = (err) => {
      //   if (err) {
      //     reject(new Error('An error occured fetching all movies, err:' + err))
      //   }
      //   resolve(movies.slice())
      // }
      // cursor.forEach(addMovie, sendMovies)
      resolve([matterhorn])
    })
  }

  const findSummitsByHeight = (height, rel) => {
    return new Promise((resolve, reject) => {
      // const movies = []
      // const cursor = collection.find({}, {title: 1, id: 1})
      // const addMovie = (movie) => {
      //   movies.push(movie)
      // }
      // const sendMovies = (err) => {
      //   if (err) {
      //     reject(new Error('An error occured fetching all movies, err:' + err))
      //   }
      //   resolve(movies.slice())
      // }
      // cursor.forEach(addMovie, sendMovies)
      resolve([matterhorn, montBlanc])
    })
  }

  const disconnect = () => {
    // db.close()
  }

  return Object.create({
    getSummitById,
    findSummitsByCountry,
    findSummitsByHeight,
    disconnect
  })
}

const connect = (connection) => {
  return new Promise((resolve, reject) => {
    if (!connection) {
      reject(new Error('connection db not supplied!'))
    }
    resolve(repository(connection))
  })
}

module.exports = Object.assign({}, {connect})
