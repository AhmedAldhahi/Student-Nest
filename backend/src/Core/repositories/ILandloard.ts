export interface ILandloard {
  setCliQAccount(cliQ: string): void;
  getcliQAccount(): string;

  setLandloardGovId(landloardGovId: string): void;
  getLandloardGovId(): string;
}
