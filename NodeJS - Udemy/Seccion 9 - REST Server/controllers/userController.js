const {response,request} = require('express');

const getUser = (req = request, res = response) => {
    const {nombre = "no name", APIKey="w/o AK"} = req.query;
    res.status(200).json({
        msg: 'Get API - Controller',
        nombre,
        APIKey
    });
}
const postUser = (req, res = response) => {
   const body = req.body;//trae todo del body
   const {nombre, edad} = req.body;//trae solo lo que yo le pido
    res.status(200).json({
        body,nombre,edad
    });
}
const deleteUser = (req, res = response) => {
    const body = req.body;//trae todo del body
    const {nombre, edad} = req.body;//trae solo lo que yo le pido
     res.status(200).json({
         body,nombre,edad
     });
}
const putUser = (req, res = response) => {
    const {id} = req.params;
     res.status(201).json({
         id
     });
}

module.exports = {
    getUser,
    postUser,
    deleteUser,
    putUser
}