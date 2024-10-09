export interface InstructorBasicProps {
  instructorName: string;
  instructorPhoneNumber: string;
  instructorProfileImage?: string;
}

export interface InstructorProps {
  instructorName: string;
  instructorPhoneNumber: string;
  instructorProfileImage: string | null;
  user: {
    userId: string;
  };
  instructorCreatedAt: string;
  instructorUpdatedAt: string;
}
