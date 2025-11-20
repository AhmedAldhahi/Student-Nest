export class GovernmentID {
    private readonly value: string;
  
    constructor(id: string) {
      this.validate(id);
      this.value = id;
    }
  
    private validate(id: string): void { 
        
      if (id.length !== 10) {
        throw new Error("user Government id number must contain 10 number ");
      }
  
      if (!/^\d+$/.test(id)) {
        throw new Error(" user Government id number must contain just number ");
      }
    }
  
    public getValue(): string {
      return this.value;
    }
  

  }
  