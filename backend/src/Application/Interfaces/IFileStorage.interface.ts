export interface IFileStorageService {
  upload(file: Express.Multer.File): Promise<string>;
  deleteImageFromCloudinary(publicId: string) : Promise<void>;
  update(file: Express.Multer.File, url:string): Promise<string>;
}
