const express = require('express')
const asyncHandler = require('express-async-handler')
const Router = express.Router()

//importing bookings model
const Booking = require('../models/Bookings')

Router.post('/new-booking',
    asyncHandler(async(req,res) => {
        //extract data from req.body.data
        const { userId, listingId, checkInDate, checkOutDate, numGuests, totalCost } = req.body
        
        //create new instance of booking
        const newBooking = new Booking({
            userId,
            listingId, 
            checkInDate, 
            checkOutDate, 
            numGuests,
            totalCost
        })

        //save booking to database
        await newBooking.save()
        .catch(err => console.log(err))

        res.send('success')
    })
)

/* route to get all bookings belonging to a particular userId */
Router.get('/booking-info/:userId',
    asyncHandler(async(req,res) => {
        //find booking by userId
        const { userId } = req.params

        const selectedBooking = await Booking.find({ userId }).populate('listingId')

        res.send(selectedBooking)
    })
)

/* route to get info about one particular booking using a bookingId */
Router.get('/:bookingId',
    asyncHandler(async(req,res) => {
        //find booking by bookingId
        const { bookingId } = req.params

        const selectedBooking = await Booking.find({ _id: bookingId }).populate('listingId')

        res.send(selectedBooking)
    })
)

/* route to delete one particular booking using a bookingId */
Router.delete('/:bookingId',
    asyncHandler(async(req,res) => {
        //find booking by bookingId
        const { bookingId } = req.params
        //delete the selected booking
        const selectedBooking = await Booking.deleteOne({ _id: bookingId })

        res.send('booking deleted')
    })
)

module.exports = Router