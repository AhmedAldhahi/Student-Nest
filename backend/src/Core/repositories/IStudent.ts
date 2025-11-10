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
}
