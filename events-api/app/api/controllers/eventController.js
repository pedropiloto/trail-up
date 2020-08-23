const { eventModel } = require('../models/event')

module.exports = {
  getById: function (req, res, next) {
    console.log('getting stock with id', req.params.id)
    eventModel.findById(req.params.id, function (err, stockInfo) {
      if (err) {
        next(err)
      } else {
        if (!!stockInfo) {
          res.json({ stock: stockInfo },
          )
        } else {
          console.log('Event with id', req.params.id, 'not found')
          res.status(404).json({ message: 'Not found' })
        }
      }
    })
  },

  getAll: function (req, res, next) {
    console.log('getting all events')
    let eventsList = []

    eventModel.find({}, function (err, stocks) {
      if (err) {
        next(err)
      } else {
        for (let event of stocks) {
          eventsList.push({
            id: event._id,
            name: event.name,
          })
        }
        res.json(eventsList)
      }
    })
  },

  updateById: function (req, res, next) {
    console.log('update event with id', req.body.id)
    eventModel.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
      },
      function (err, eventInfo) {
        if (err) next(err)
        else {
          if (!!eventInfo) {
            res.json(eventInfo)
          } else {
            console.log('Event with id', req.params.id, 'not found')
            res.status(404).json({ message: 'Not found' })
          }
        }
      },
    )
  },

  create: function (req, res, next) {
    console.log(
      'creating event with the params: ',
      req.body.name,
      req.body
    )

    eventModel.create(
      {
        name: req.body.name,
      },
      function (err, result) {
        if (err) next(err)
        else
          res.json(result,
          )
      },
    )
  },
}
