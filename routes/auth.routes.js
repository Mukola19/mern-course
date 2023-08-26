const { Router } = require("express")
const User = require("../moduls/User.js")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const config = require('config')


const { check, validationResult } = require("express-validator")

const router = Router()

router.post(
    "/reqister", [
        check("email", "Некоректний email").isEmail(),
        check("password", "Ведіть не менше 6 символів").isLength({ min: 6 }),
    ],
    async(req, res) => {
        try {
         
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Неправельні дані",
                })
            }

            const { email, password } = req.body

            const candidate = await User.findOne({ email })

            if (candidate) {
                return res.status(500).json({ message: "Такий користувач вже існує!" })
            }

            const hashPassword = await bcrypt.hash(password, 12)
            const user = new User({ email, password: hashPassword })
            await user.save()
            res.status(201).json({messages: 'Користувач створений'})

        } catch (e) {
            res.status(500).json("Щось пішло не так, спробуйте знову")
        }
    }
)



router.post(
    "/login", [
        check("email", "Некоректний email"),
        check("password", "Ведіть не менше 6 символів").isLength({ min: 6 }),
    ],
    async(req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Неправельні дані при вході в систему",
                })
            }

            const { email, password } = req.body


            const user = await User.findOne({ email })

            if (!user) {
                return res.status(400).json({ message: 'Користувач не знайдений' })
            }

            const isMacth = bcrypt.compare(password, user.password)


            if (!isMacth) {
                return res.status(400).json({ message: 'Неправельний пароль' })
            }


            const token = jwt.sign({ userId: user.id },
                process.env.JWT_SECRET, { expiresIn: '1h' }
            )

            res.json({ token, userId: user.id })







        } catch (e) {
            res.status(500).json("Щось пішло не так, спробуйте знову")
        }
    }
)













module.exports = router