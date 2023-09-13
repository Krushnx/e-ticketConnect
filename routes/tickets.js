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

router.post('/' , async(req , res)=>
{
    const ticket = new Ticket({
        price : req.body.price , 
        source : req.body.source,
        destination : req.body.destination , 
        date : req.body.date , 
        time : req.body.time , 
        ticketID : req.body.ticketID 
    });

    try {
        const newentryticket = await ticket.save()
        res.status(201).json(newentryticket);
    } catch (error) {
        res.status(400).json({message : error.message});
    }


})

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

