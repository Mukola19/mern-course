const { Router } = require('express')
const Link = require('../moduls/Link.js')
const router = Router()

router.get('/:code', async (req, res) => {
  try {
    const link = await Link.findOne({ code: req.params.code })

    if (!link) {
      return res.status(404).json({ message: 'Посилання не знайдене' })
    }
    link.clicks++
    await link.save()
    return res.redirect(link.from)
  } catch (e) {
    res.status(500).json('Щось пішло не так, спробуйте знову')
  }
})

module.exports = router
