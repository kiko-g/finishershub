// @desc     Ping registry
// @route    GET /registry
// @access   Public
const ping = (req, res) => {
  res.status(200).json({ message: 'Hello from the Finishers Hub: Registry backend!' })
}

// @desc     Get finishers of member
// @route    GET /registry/:id
// @access   Public
const getFinishers = (req, res) => {
  res.status(200).json({ message: `Get finishers of member #${req.params.id}` })
}

// @desc     Increment finishers of member
// @route    GET /registry/increment/:id
// @access   Private
const incrementFinishers = (req, res) => {
  res.status(200).json({ message: `Add 1 finisher to member #${req.params.id}` })
}

// @desc     Decrement finishers of member
// @route    GET /registry/decrement/:id
// @access   Private
const decrementFinishers = (req, res) => {
  res.status(200).json({ message: `Remove 1 finisher from member #${req.params.id}` })
}

const controller = {
  ping,
  getFinishers,
  incrementFinishers,
  decrementFinishers,
}

module.exports = controller
