import Router from "express";
import { upload } from "../utils/storage.js";
import { uploadFile } from "../controllers/fileController.js"
const router =  new Router();


router.post('/', upload.single('file'), uploadFile)

export default router; 