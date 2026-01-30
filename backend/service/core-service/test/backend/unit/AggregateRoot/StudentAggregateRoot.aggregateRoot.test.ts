import { StudentAggregateRoot } from "../../../../src/Domain/BoundedContexts/IdentityAndAccess/Aggregates/StudentAggregateRoot.entity";
import { StudentDataType } from "../../../../src/Domain/BoundedContexts/IdentityAndAccess/types/StudentDataType.type";
import { StudentCard } from "../../../../src/Domain/BoundedContexts/IdentityAndAccess/Value-Object/StudentCard.vo";
import { studentGraduateYear } from "../../../../src/Domain/BoundedContexts/IdentityAndAccess/Value-Object/StudentGraduateYear.vo";
import { StudentMajor } from "../../../../src/Domain/BoundedContexts/IdentityAndAccess/Value-Object/StudentMajor.vo";
import { StudentUniversity } from "../../../../src/Domain/BoundedContexts/IdentityAndAccess/Value-Object/StudentUniversity.vo";
import { GovernmentID } from "../../../../src/Domain/BoundedContexts/IdentityAndAccess/Value-Object/UserGovId.vo";
import { VerificationDocument } from "../../../../src/Domain/BoundedContexts/IdentityAndAccess/Value-Object/VerficationDocument.vo";

// Mock Data setup
const mockUserId = "student-123";
const mockCardValue = "CARD-001";
const mockGovIdValue = "GOV-999";
const mockUniValue = "Jordan University";
const mockMajorValue = "Computer Science";
const mockGradYearValue = 2026;
const mockDocValue = "doc.pdf";

// Helper to create Mock VOs
const createMockVO = (val: any) => ({
  getValue: jest.fn().mockReturnValue(val)
});

describe('StudentAggregateRoot', () => {
  let student: StudentAggregateRoot;
  let baseData: StudentDataType;

  // Mocks
  let mockStudentCard: StudentCard;
  let mockUserGovId: GovernmentID;
  let mockUniversity: StudentUniversity;
  let mockMajor: StudentMajor;
  let mockGraduateYear: studentGraduateYear;
  let mockVerificationDoc: VerificationDocument;

  beforeEach(() => {
    // Reset mocks before each test
    mockStudentCard = createMockVO(mockCardValue) as unknown as StudentCard;
    mockUserGovId = createMockVO(mockGovIdValue) as unknown as GovernmentID;
    mockUniversity = createMockVO(mockUniValue) as unknown as StudentUniversity;
    mockMajor = createMockVO(mockMajorValue) as unknown as StudentMajor;
    mockGraduateYear = createMockVO(mockGradYearValue) as unknown as studentGraduateYear;
    mockVerificationDoc = createMockVO(mockDocValue) as unknown as VerificationDocument;

    baseData = {
      userId: mockUserId,
      studentCardId: mockStudentCard,
      userGovId: mockUserGovId,
      universityName: mockUniversity,
      major: mockMajor,
      graduateYear: mockGraduateYear,
      validateStudentDocument: mockVerificationDoc,
      roommateProfileStatus: false,
      enableWhatsapp: true
    };

    student = new StudentAggregateRoot(baseData);
  });

  describe('Initialization', () => {
    it('should initialize with correct data from constructor', () => {
      expect(student.getUserId()).toBe(mockUserId);
      expect(student.getStudentCardID()).toBe(mockCardValue);
      expect(student.getGovernmentId()).toBe(mockGovIdValue);
      expect(student.getUniversityName()).toBe(mockUniValue);
      expect(student.getMajor()).toBe(mockMajorValue);
      expect(student.getGraduateYear()).toBe(mockGradYearValue);
      expect(student.getVerificationDocument()).toBe(mockDocValue);
      expect(student.getRoommateProfileStatus()).toBe(false);
      expect(student.getWhatsappStatus()).toBe(true);
    });
  });

  describe('Behavior: Roommate Profile Status', () => {
    it('should mark roommate profile as created', () => {
      student.markAsRoommateProfileCreated();
      expect(student.getRoommateProfileStatus()).toBe(true);
    });

    it('should mark roommate profile as NOT created', () => {
      // First set it to true
      student.markAsRoommateProfileCreated();
      expect(student.getRoommateProfileStatus()).toBe(true);

      // Now set to false
      student.markAsRoommateProfileNotCreated();
      expect(student.getRoommateProfileStatus()).toBe(false);
    });
  });

  describe('Behavior: Whatsapp Visibility', () => {
    it('should mark as visible for whatsapp', () => {
      // Manually set to false first via constructor or method if needed (default in baseData is true)
      student.markAsNotVisibleForWhatsapp(); 
      expect(student.getWhatsappStatus()).toBe(false);

      student.markAsVisibleForWhatsapp();
      expect(student.getWhatsappStatus()).toBe(true);
    });

    it('should mark as NOT visible for whatsapp', () => {
      student.markAsNotVisibleForWhatsapp();
      expect(student.getWhatsappStatus()).toBe(false);
    });
  });

  describe('Behavior: Updating Student Details', () => {
    it('should change university name', () => {
      const newUniValue = "Petra University";
      const newUniVO = createMockVO(newUniValue) as unknown as StudentUniversity;

      student.changeUniversityName(newUniVO);
      expect(student.getUniversityName()).toBe(newUniValue);
    });

    it('should change major', () => {
      const newMajorValue = "Software Engineering";
      const newMajorVO = createMockVO(newMajorValue) as unknown as StudentMajor;

      student.changeMajor(newMajorVO);
      expect(student.getMajor()).toBe(newMajorValue);
    });

    it('should change graduate year', () => {
      const newYearValue = 2028;
      const newYearVO = createMockVO(newYearValue) as unknown as studentGraduateYear;

      student.changeGraduateYear(newYearVO);
      expect(student.getGraduateYear()).toBe(newYearValue);
    });

    it('should update verification document', () => {
      const newDocValue = "new-id.png";
      const newDocVO = createMockVO(newDocValue) as unknown as VerificationDocument;

      student.updateVerificationDocument(newDocVO);
      expect(student.getVerificationDocument()).toBe(newDocValue);
    });

    it('should change student card ID', () => {
      /* Note: The original code has logic: `if (!this.changeUniversityName)`. 
       Since changeUniversityName is a function, it is truthy, so !truthy is false. 
       The Error is never thrown. The update proceeds.
       We test here that the update actually happens.
      */
      const newCardValue = "CARD-999";
      const newCardVO = createMockVO(newCardValue) as unknown as StudentCard;

      student.changeStudentCardID(newCardVO);
      expect(student.getStudentCardID()).toBe(newCardValue);
    });
  });

  describe('Getters Handling Undefined Values', () => {
    it('should return undefined if Value Object returns null/undefined', () => {
      // Re-create student with VOs that return null
      const nullVO = { getValue: jest.fn().mockReturnValue(null) };
      
      const nullData = {
        ...baseData,
        major: nullVO as unknown as StudentMajor,
        userGovId: nullVO as unknown as GovernmentID
      };
      
      const studentWithNulls = new StudentAggregateRoot(nullData);

      expect(studentWithNulls.getMajor()).toBeUndefined();
      expect(studentWithNulls.getGovernmentId()).toBeUndefined();
    });
  });
});