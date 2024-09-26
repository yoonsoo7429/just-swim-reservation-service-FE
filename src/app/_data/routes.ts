const SIGNIN_ROUTE = {
  root: "/",
  signin: "/signin",
  type: "/signin/type",
  profile: "/signup/profile",
} as const;

const SCHEDULE_ROUTE = {
  root: "/schedule",
} as const;

export const ROUTES = {
  ONBOARDING: { ...SIGNIN_ROUTE },
  SCHEDULE: { ...SCHEDULE_ROUTE },
};
