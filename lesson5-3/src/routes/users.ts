import express,{Request,Response} from 'express';
import User  from '../models/User';

const router = express.Router()

router.get('/',async (req:Request,res:Response):Promise<void>=>{
    try {
        const users = await User.find().select('-password')
        // users is typed as IUser[] — full autocomplete!
        res.json({ users })
      } catch(err) {
        res.status(500).json({ error: "Server error" })
      }

})

app.post('/users', async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await User.create(req.body)
      // user is typed as IUser — TypeScript knows every field
      console.log(user.name)  // ✅ autocomplete works
      console.log(user.role)  // ✅ TypeScript knows it's 'user' | 'admin'
      res.status(201).json({ user })
    } catch(err) {
      res.status(500).json({ error: "Server error" })
    }
  })