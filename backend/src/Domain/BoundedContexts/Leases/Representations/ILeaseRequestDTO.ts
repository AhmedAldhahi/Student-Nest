export type ILeaseRequestDTO = {
  requestLeaseId: string;
  requestMessage: string;
  startDate: string;
  rentTerm: string;
  requestStatus: string;
  createAt: Date;
  studentName: string;
  landlordName: string;
  Major: string;
  apartmentPrice: string;
  apartmentTitle: string;

  // price  ? do u want me to add to db
  //TODO: need to add end date
};
