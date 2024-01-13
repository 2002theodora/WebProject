import express from 'express';
import {createManager, getManagerById, getManager, deleteManager, updateManager} from "../dataAccess/managerDA"
import managerFilterDto from '../dataAccess/models/managerFilterDto';

let managerRouter = express.Router();
  
managerRouter.route('/manager').post( async (req, res) => {
  return res.json(await createManager(req.body));
})

managerRouter.route('/manager').get( async (req, res) => {  
  var queryParams = new managerFilterDto(req.query) 
  return res.json(await getManager(queryParams));
})

managerRouter.route('/manager/:id').get( async (req, res) => {
  let id = parseInt(req.params.id) 
  return res.json(await getManagerById(id));
})

managerRouter.route('/manager/:id').delete( async (req, res) => {
  let id = parseInt(req.params.id) 
  return res.json(await deleteManager(id));
})

managerRouter.route('/manager/:id').put( async (req, res) => {
  let id = parseInt(req.params.id) 
  return res.json(await updateManager(req.body, id));
})

export default managerRouter;