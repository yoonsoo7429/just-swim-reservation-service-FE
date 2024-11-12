export interface LectureProps {
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
  };
  course: {
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
  };
}

export interface EditLectureProps {
  courseId: number;
  lectureDate: string;
  lectureStartTime: string;
  lectureEndTime: string;
}
