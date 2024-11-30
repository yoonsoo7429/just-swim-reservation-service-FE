import { UserType } from "./users";

export interface CourseBasicProps {
  courseTitle: string;
  courseDays: string;
  courseStartTime: string;
  courseEndTime: string;
  courseCapacity: number;
  courseColor: string;
}

export interface CourseCreateProps {
  courseTitle: string;
  courseDays: string;
  courseStartTime: string;
  courseEndTime: string;
  courseCapacity: number;
  courseColor: string;
  user: {
    userId: string;
  };
  courseId: string;
  courseCreatedAt: string;
  courseUpdatedAt: string;
  courseDeletedAt: string | null;
}

export interface CourseProps {
  userType: UserType | null;
  courseTitle: string;
  courseId: string;
  courseDays: string;
  courseStartTime: string;
  courseEndTime: string;
  courseCapacity: number;
  courseColor: string;
  courseCreatedAt: string;
  courseUpdatedAt: string;
  courseDeletedAt: string | null;
  user: {
    userId: string;
    userType: string;
    provider: string;
    email: string;
    userCreatedAt: string;
    userUpdatedAt: string;
  };
  lecture: {
    lectureId: string;
    lectureDate: string;
    lectureStartTime: string;
    lectureEndTime: string;
    lectureCreatedAt: string;
    lectureUpdatedAt: string;
    lectureDeletedAt: string | null;
    user: {
      userId: string;
      userType: UserType;
      provider: string;
      email: string;
      userCreatedAt: string;
      userUpdatedAt: string;
      customer: {
        customerId: string;
        customerName: string;
        customerProfileImage: string | null;
        customerBirth: string;
        customerPhoneNumber: string;
        customerGender: string;
        customerAddress: string;
        customerCreatedAt: string;
        customerUpdatedAt: string;
      }[];
    };
  }[];
}

export interface ScheduleSummaryForInstructor {
  date: string;
  day: string;
  courses: CourseProps[];
}

export interface CourseForMemberInfoProps {
  courseId: string;
  instructorUserId: string;
  lectureId: string;
  userId: string;
  userType: string | null;
  customerProfileImage: string | null;
  customerName: string;
  customerPhoneNumber: string;
  customerAddress: string;
}

export interface CourseDetailProps {
  courseId: string;
  courseTitle: string;
  courseDays: string;
  courseStartTime: string;
  courseEndTime: string;
  courseCapacity: number;
  courseColor: string;
  courseCreatedAt: string;
  courseUpdatedAt: string;
  courseDeletedAt: string | null;
  user: {
    userId: string;
    userType: string;
    provider: string;
    email: string;
    userCreatedAt: string;
    userUpdatedAt: string;
  };
  member: {
    memberId: string;
    memberCreatedAt: string;
    memberUpdatedAt: string;
    user: {
      userId: string;
      userType: string;
      provider: string;
      email: string;
      userCreatedAt: string;
      userUpdatedAt: string;
    };
  }[];
  lecture: {
    lectureId: string;
    lectureDate: string;
    lectureStartTime: string;
    lectureEndTime: string;
    lectureCreatedAt: string;
    lectureUpdatedAt: string;
    lectureDeletedAt: string | null;
  }[];
}

export interface CourseDetailForEditProps {
  courseId: string;
  courseTitle: string;
  courseDays: string;
  courseTime: string;
  courseCapacity: string;
  courseColor: string;
  courseCreatedAt: string;
  courseUpdatedAt: string;
  courseDeletedAt: string | null;
  user: {
    userId: string;
    userType: string;
    provider: string;
    email: string;
    userCreatedAt: string;
    userUpdatedAt: string;
  };
  member: {
    memberId: string;
    memberCreatedAt: string;
    memberUpdatedAt: string;
    user: {
      userId: string;
      userType: string;
      provider: string;
      email: string;
      userCreatedAt: string;
      userUpdatedAt: string;
    };
  }[];
  lecture: {
    lectureId: string;
    lectureDate: string;
    lectureStartTime: string;
    lectureEndTime: string;
    lectureCreatedAt: string;
    lectureUpdatedAt: string;
    lectureDeletedAt: string | null;
  }[];
}
