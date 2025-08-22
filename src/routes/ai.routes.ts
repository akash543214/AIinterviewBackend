import { Router } from "express";
import multer from "multer";
import { healthCheck, transcribeUpload} from "../controllers/ai.controller";

const router = Router();
const upload = multer({ dest: "uploads/" });

router.route("/health").get(healthCheck);

router.route("/transcribe").post(
  upload.single("file"),
  (req, res, next) => {
	Promise.resolve(transcribeUpload(req, res)).catch(next);
  }
);

export default router;
