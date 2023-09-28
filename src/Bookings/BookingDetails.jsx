import React from 'react'
import { useParams } from 'react-router'



export const BookingDetails = () => {

    const {id} = useParams();


  return (
    <div>BookingDetails</div>
  )
}

export default BookingDetails