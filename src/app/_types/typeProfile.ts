export interface ProfileProps {
  provider: string;
  userType: string;
  email: string;
}

export interface ProfileWithTypeProps {
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
  }[];
  instructor: {
    instructorId: string;
    instructorName: string;
    instructorProfileImage: string | null;
    customerCreatedAt: string;
    customerUpdatedAt: string;
  }[];
}
