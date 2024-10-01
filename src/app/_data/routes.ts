const SIGNIN_ROUTE = {
  root: "/",
  signin: "/signin",
  type: "/signin/type",
  customer: "/signin/customerProfile",
  instructor: "/signin/instructorProfile",
} as const;

const SCHEDULE_ROUTE = {
  root: "/schedule",
} as const;

export const ROUTES = {
  ONBOARDING: { ...SIGNIN_ROUTE },
  SCHEDULE: { ...SCHEDULE_ROUTE },
};
