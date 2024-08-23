const express = require('express')
const Task = require('../models/task')
const { findByIdAndDelete } = require('../models/user')
const auth = require('../middleware/auth')
const router = express.Router()

router.post('/tasks', auth, async (req, res) => {
    try {
        const task = new Task(req.body)
        await task.save()
        res.status(200).send(task)
    } catch (e) {
        res.status(400).send(e.message)
    }
})

router.get('/tasks', auth, async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).send(tasks)
    } catch (e) {
        res.status(500).send(e.message)
    }
})

router.patch('/tasks/:id', auth, async(req, res) => {
    try {
        const _id = req.params.id;
        const task = await Task.findOne({ _id: _id, owner: req.user._id });

        if (!task) {
            return res.status(404).send('not ur profile');
        }

        res.status(200).send(task);
    } catch(e) {
        res.status(500).send(e.message);
    }
});

///
router.patch('/task/:id', auth, async (req, res) => {
    try {
        const _id = req.params.id
        const task = await Task.findByIdAndUpdate(_id, req.body, {
            new: true,
            runValidators: true
        })

        if (!task) {
            return res.status(404).send('No task')
        }
        res.status(200).send(task)
    } catch (e) {
        res.status(500).send(e.message)
    }
})

///////////
router.delete('/task/:id', auth, async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if (!task) {
            return res.status(404).send('No task is found')
        }
        res.status(200).send(task)
    } catch (e) {
        res.status(500).send(e.message)
    }
})

module.exports = router
