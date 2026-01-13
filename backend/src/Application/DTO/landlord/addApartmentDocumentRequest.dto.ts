export interface AddApartmentDocumentRequest {
  apartmentId: string;
  apartmentDocumentUrl: Express.Multer.File;
}
