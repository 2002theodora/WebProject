import express from 'express';
import {createManager, getManagerById, getManager} from "../dataAccess/managerDA"
import managerFilterDto from '../dataAccess/models/managerFilterDto';

let managerRouter = express.Router();
  
managerRouter.route('/manager').post( async (req, res) => {
  return res.json(await createManager(req.body));
})

managerRouter.route('/manager').get( async (req, res) => {  
  var queryParams = new managerFilterDto(req.query) 
  return res.json(await getManager(queryParams));
})

export default managerRouter;