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
  apartmentId: string;
  landlordId: string;
  studentId: string;

  // price  ? do u want me to add to db
  //TODO: need to add end date
};

/**
 * check that student lease request send if accept he can not until the rent term end
 * and check that lease if active for if not do not care
 *
 * and it can send lease Request if the lease request statis is reject or date been expired
 *
 * and it can not send lease request for apartent that heve lease active and the it not end
 *
 *
 *
 *
 */
