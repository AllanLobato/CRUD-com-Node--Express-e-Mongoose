const router = require('express').Router()

const Person = require('../models/Person')

router.post('/', async (req, res) => {

    // req.body

    const {name, salary, approved} = req.body

    if(!name) {
        res.status(422).json({error: 'O nome é obrigatório!'})
        return
    }

    const person = {
        name,
        salary,
        approved,
    }

    try {
        //criando dados
        await Person.create(person)

        res.status(201).json({
            message: 'Pessoa criada com sucesso!'
        })
        
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }

})

//Read - Leitura de dados
router.get('/', async (req, res) => {

    try {
        const people = await Person.find()

        res.status(200).json(people)
        
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }

})

router.get('/:id', async (req, res) => {

    //extrair o dado da requisição, pela url = req.params

    const id = req.params.id
    
        try {
            const person = await Person.findOne({_id:id})

            if (!person) {
                res.status(422).json({
                    message: 'Pessoa não encontrada!'
                })
                return
            }
            res.status(200).json(person)    
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    
    })

//Update - Atualização de dados (PUT, PATCH)
router.patch('/:id', async (req, res) => {
    const id = req.params.id

    const {name, salary, approved} = req.body

    const person = {
        name,
        salary,
        approved,
    }

    try {
        const updatePerson = await Person.updateOne({_id:id}, person)

        if(updatePerson.matchedCount === 0) {
            res.status(422).json({
                message: 'Pessoa não encontrada!'
            })
            return
        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})  

//Delete - Remoção de dados

router.delete('/:id', async (req, res) => {
    
    const id = req.params.id

    const person = await Person.findOne({_id:id})

            if (!person) {
                res.status(422).json({
                    message: 'Pessoa não encontrada!'
                })
                return
            }

    try {
        await Person.deleteOne({_id:id})

        res.status(200).json({
            message: 'Pessoa removida com sucesso!'
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
        })

module.exports = router