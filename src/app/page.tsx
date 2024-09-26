import { redirect } from "next/navigation";
import { ROUTES } from "./_data/routes";

export default function Page() {
  redirect(ROUTES.ONBOARDING.signin);
}
