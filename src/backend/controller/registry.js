const Registry = require('../model/registry')

// @desc     Get finishers of all members
// @route    GET /registry/
// @access   Public
const getAllFinishers = async (req, res) => {
  try {
    const allStats = await Registry.find()
    res.json(allStats)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc     Get finishers of a certain member
// @route    GET /registry/:id
// @access   Public
const getFinishers = async (req, res) => {
  try {
    const id = req.params.id
    const stats = await Registry.findById()

    if (!stats) {
      res.status(400).json({ message: 'Member not found' })
      throw new Error('Member not found')
    }

    res.status(200).json(stats)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc     Increment finishers of a certain member
// @route    PUT /registry/increment/:id/:arena
// @access   Private
const incrementFinishers = async (req, res) => {
  try {
    const id = req.params.id
    const arena = req.params.arena
    const stats = await Registry.findById(id)

    if (!stats) {
      res.status(400).json({ message: 'Member not found' })
      throw new Error('Member not found')
    }

    const increment = { finishers: stats.finishers.map((count, index) => (index === arena ? count + 1 : count)) }
    const updatedStats = await Registry.findByIdAndUpdate(id, increment, { new: true })
    res.status(200).json(updatedStats)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc     Decrement finishers of a certain member
// @route    GET /registry/decrement/:id/:arena
// @access   Private
const decrementFinishers = async (req, res) => {
  try {
    const id = req.params.id
    const arena = req.params.arena
    const stats = await Registry.findById(id)

    if (!stats) {
      res.status(400).json({ message: 'Member not found' })
      throw new Error('Member not found')
    }

    const decrement = { finishers: stats.finishers.map((count, index) => (index === arena ? count - 1 : count)) }
    const updatedStats = await Registry.findByIdAndUpdate(id, decrement, { new: true })
    res.status(200).json(updatedStats)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc     Update password of a certain member
// @route    GET /registry/:id/password/:newPassword
// @access   Private
const updatePassword = async (req, res) => {
  try {
    const id = req.params.id
    const password = req.params.newPassword
    const stats = await Registry.findById(id)

    if (!stats) {
      res.status(400).json({ message: 'Member not found' })
      throw new Error('Member not found')
    }

    const updated = { code: password }
    const updatedStats = await Registry.findByIdAndUpdate(id, updated, { new: true })
    res.status(200).json(updatedStats)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const controller = {
  getAllFinishers,
  getFinishers,
  incrementFinishers,
  decrementFinishers,
  updatePassword,
}

module.exports = controller
