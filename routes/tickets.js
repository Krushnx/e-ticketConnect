const express = require('express');
const router = express.Router();

const Ticket = require('../Model/schema');




router.get('/' , async(req , res)=>
{
    try {
        const ticket = await Ticket.find();
        res.json(ticket)
        
    } catch (error) {
        res.status(500).json({message : error.message});
        
    }
});
    
router.get('/:id' , gettickets , (req , res)=>
{
    res.json(res.ticket)
});
router.post('/', async (req, res) => {
    // Ensure that req.body is an array
    if (!Array.isArray(req.body)) {
      return res.status(400).json({ message: 'Request body should be an array of ticket objects' });
    }
  
    // Create an array to hold the ticket objects
    const tickets = req.body.map((ticketData) => ({
      price: ticketData.price,
      source: ticketData.source,
      destination: ticketData.destination,
      ticketID: ticketData.ticketID,
    }));
  
    try {
      // Insert all the tickets into the database
      const newEntryTickets = await Ticket.insertMany(tickets);
      res.status(201).json(newEntryTickets);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
async function gettickets(req , res , next)
{
    let ticket;
    try
    {
        ticket = await Ticket.findById(req.params.id);
        if(ticket == null)
        {
            return res.status(404).json({message : "Cannot Find Ticket"});
        }
    }
    catch (error)
    {
        res.status(500).json({message : error.message});


    }
    res.ticket = ticket;
    next();
}
module.exports  =router;

