export interface CourseBasicProps {
  courseTitle: string;
  courseDays: string;
  courseStartTime: string;
  courseEndTime: string;
  courseCapacity: number;
}

export interface CourseProps {
  courseTitle: string;
  courseId: string;
  courseDays: string;
  courseStartTime: string;
  courseEndTime: string;
  courseCapacity: number;
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
      userType: string;
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
      };
    };
  }[];
}

export interface ScheduleSummary {
  date: string;
  day: string;
  courses: CourseProps[];
}
