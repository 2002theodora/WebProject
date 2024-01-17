import express from 'express';
import db from '../dbConfig';
import employeeRouter from './employeeRouter';
import managerRouter from './managerRouter';

const masterRouter = express.Router();

masterRouter.route('/create').get(async (req, res) => {
    try{
        await db.sync({force : true})    
        res.status(201).json({message : 'created'})
    }
    catch(err){
        console.warn(err)
        res.status(500).json({message : 'server error'})
    }
});

masterRouter.use('/employee', employeeRouter);

masterRouter.use('/manager', managerRouter);

export default masterRouter;