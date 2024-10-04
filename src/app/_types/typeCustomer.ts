export interface CustomerBasicProps {
  customerName: string;
  customerProfileImage?: string;
  customerBirth: string;
  customerPhoneNumber: string;
  customerGender: string;
  customerAddress: string;
}

export interface CustomerProps {
  customerId: string;
  customerName: string;
  customerProfileImage: string;
  customerBirth: string;
  customerPhoneNumber: string;
  customerGender: string;
  customerAddress: string;
  user: {
    userId: string;
  };
  customerCreatedAt: Date;
  customerUpdatedAt: Date;
}
