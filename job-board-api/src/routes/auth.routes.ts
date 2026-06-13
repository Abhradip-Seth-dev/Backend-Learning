import { Router } from "express";
import { login,register } from "../controllers/auth.controller";
import { validate } from "../middleware/validate.middleware";
import { loginSchema, registerSchema } from "../validators/auth.validator";
import { protect } from "../middleware/auth.middleware";
import { restrictTo } from "../middleware/role.middleware";
import { createJob } from "../controllers/job.controller";

const router = Router();

router.post('/register',validate(registerSchema),register)
router.post('/login',validate(loginSchema),login);
router.post('/', protect, restrictTo('company'), createJob)

export default router;