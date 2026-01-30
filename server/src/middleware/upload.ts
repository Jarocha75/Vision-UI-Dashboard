import multer from "multer";
import type { FileFilterCallback } from "multer";
import path from "path";
import fs from "fs";
import type { Request } from "express";

// Rozšírenie Request typu pre userId
interface AuthenticatedRequest extends Request {
  userId?: number;
}

// Vytvor uploads priečinok ak neexistuje
const uploadDir = path.join(process.cwd(), "uploads", "avatars");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Konfigurácia storage
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const authReq = req as AuthenticatedRequest;
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `avatar-${authReq.userId}-${uniqueSuffix}${ext}`);
  },
});

// Filter pre povolené typy súborov
const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Povolené sú iba obrázky (JPEG, PNG, GIF, WEBP)"));
  }
};

export const uploadAvatar = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});
