import { AggregateRoot } from "../../../Shared/AgregateRoot/AggregateRoot";
import { LifeCycleHabitEntity } from "../Entities/LifeCycleHabbitEntity.entity";
import { NoiseTolerance } from "../Enum/Noise tolerance.enum";
import { SleepSchedule } from "../Enum/SleepSchedule.enum";
import { UserLanguage } from "../Enum/UserLanguage.enum";
import { RoommateProfileData } from "../types/RommateProfileData.type";
import { Age } from "../Value-Object/AgeValueObject.vo";

export class RoommateProfileAggregate extends AggregateRoot<string> {
  private roommateProfileId: string;
  private language: UserLanguage;
  private noiseTolerance: NoiseTolerance;
  private minAge: Age; 
  private maxAge: Age;
  private sleepSchedule: SleepSchedule;
  private LifeCycleHabit: LifeCycleHabitEntity;
  private bio?: string;
  private createAt: Date;
  private studentId: string;

  constructor(data: RoommateProfileData) {
    super(data.roommateId);
    this.roommateProfileId = data.roommateId;
    this.language = data.Language;
    this.noiseTolerance = data.UserAcceptNoiseTolerance;
    this.minAge = data.minAge;
    this.maxAge = data.maxAge;
    this.sleepSchedule = data.UserSleepSchedule;
    this.LifeCycleHabit = data.lifeHabit;
    this.bio = data.bio;
    this.createAt = data.createAt;
    this.studentId = data.studentId;
  }

  //Factory method
  public static create(data: RoommateProfileData) {
    return new RoommateProfileAggregate(data);
  }

  /**
   * ==================================================================================
   *                              Behavior Methods sections
   * ==================================================================================
   */

  public changeLanguage(data: UserLanguage): void {
    this.language = data;
  }

  public changeMinAge(data: Age): void {
    this.minAge = data;
  }

  public changeMaxAge(data: Age): void {
    this.maxAge = data;
  }

  public updateAgePreference(min?: Age, max?: Age): void {
    const newMin = min ? min : this.minAge;
    const newMax = max ? max : this.maxAge;

    this.validateAgeRange(newMin, newMax);

    // Apply changes
    this.minAge = newMin;
    this.maxAge = newMax;
  }

  public changeNoiseTolerance(data: NoiseTolerance): void {
    this.noiseTolerance = data;
  }

  public changeBio(data: string): void {
    this.bio = data;
  }

  public changeSleepSchedule(data: SleepSchedule): void {
    this.sleepSchedule = data;
  }

  private validateAgeRange(min?: Age, max?: Age): void {
    if (min && max) {
      if (min.isGreaterThan(max)) {
        throw new Error(
          `Invalid Age Range: Min (${min.getValue()}) cannot be greater than Max (${max.getValue()})`,
        );
      }
    }
  }

  /**
   * ==================================================================================
   *                              Getter Methods sections
   * ==================================================================================
   */

  public getRoommateId(): string {
    return this.roommateProfileId;
  }

  public getNoiseTolerance(): NoiseTolerance {
    return this.noiseTolerance;
  }

  public getLanguage(): UserLanguage {
    return this.language;
  }

  public getSleepSchedule(): SleepSchedule {
    return this.sleepSchedule;
  }

  public getMinAge(): string | undefined {
    return this.minAge?.getValue();
  }

  public getMaxAge(): string | undefined {
    return this.maxAge?.getValue();
  }

  public getLifeCycleHabit(): LifeCycleHabitEntity {
    return this.LifeCycleHabit;
  }

  public getBio(): string | undefined {
    return this.bio ?? undefined;
  }

  public getCreateAt(): Date {
    return this.createAt;
  }

  public getStudentId(): string {
    return this.studentId;
  }
}
