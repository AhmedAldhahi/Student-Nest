export interface IFileStorageService {
  upload(file: Express.Multer.File): Promise<string>;
  deleteImageFromCloudinary(publicId: string) : Promise<any>;
}
