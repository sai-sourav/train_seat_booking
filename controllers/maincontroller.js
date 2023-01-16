const Seats = require('../models/seats');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
exports.getavailability = async (req, res, next) => {
    const lastbookingid = +req.query.id;
    try{
        const seats = await req.user.getSeats({
            where: {
                seatid: { 
                    [Op.gt]: lastbookingid
                }
            }
        });
        res.status(200).json({
            seats : seats,
            status : "success"
        })
    }catch(err){
        if(err){
            res.status(500).json({
                error : err,
                status : "failed"
            })
        }
    }
    
}

exports.bookseats = async (req, res, next) => {
    const seatcount = +req.body.count;
    try{
        let bookedcount = await req.user.countSeats();
        if((bookedcount + seatcount) > 80){
            return res.status(404).json({status : "failed"});
        }
        const newseats = [];
        for(let i=0; i<seatcount ;i++){
            bookedcount = bookedcount + 1;
            const obj = {
                seatid : bookedcount,
                userId : req.user.id
            }
            newseats.push(obj);
        }
        const result = await Seats.bulkCreate(newseats);
        res.status(201).json({
            result : result,
            status : "success"
        })
    }catch(err){
        if(err){
            res.status(500).json({
                error : err,
                status : "failed"
            })
        }
    }
    
}