// @desc     Ping service
// @route    GET /
// @access   Public
const ping = async (req, res) => {
  try {
    res.json({ message: 'Hello from the Finishers Hub backend. Have a lovely day! :)' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const controller = {
  ping,
}

module.exports = controller
