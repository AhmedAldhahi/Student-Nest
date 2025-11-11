export interface IStudent {
  getMajor(): string;
  setMajor(studentMajor: string): void;

  getGraduateYear(): number;
  setGraduateYear(studentGraduateYear: number): void;

  getUnverstiyName(): string;
  setUnversityName(unversityName: string): void;

  getStudentCardId(): string;
  setstudentCardId(studentCardId: string): void;

  setStudentGovId(studentGovId: string): void;
  getStudentGovId(): string;

  //TODO: need to apply next for document for verified the student 
  // setValidateStudentDocument(validateStudentDocument: string): void;
  // getValidateStudentDocument(): string;
}
