const Registry = require('../model/registry')

// @desc     Get finishers of all members
// @route    GET /registry/
// @access   Public
const getAllFinishers = async (req, res) => {
  try {
    const allFinishers = await Registry.find()
    res.json(allFinishers)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc     Get finishers of a certain member
// @route    GET /registry/:id
// @access   Public
const getFinishers = async (req, res) => {
  try {
    const finishers = await Registry.findById(req.params.id)
    res.status(200).json(finishers)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc     Increment finishers of a certain member
// @route    GET /registry/increment/:id
// @access   Private
const incrementFinishers = async (req, res) => {
  try {
    const finishers = await Registry.findById(req.params.id)
    res.status(200).json({ success: true })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc     Decrement finishers of a certain member
// @route    GET /registry/decrement/:id
// @access   Private
const decrementFinishers = async (req, res) => {
  try {
    res.status(200).json({ message: 'Decrement finishers' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const controller = {
  getAllFinishers,
  getFinishers,
  incrementFinishers,
  decrementFinishers,
}

module.exports = controller
