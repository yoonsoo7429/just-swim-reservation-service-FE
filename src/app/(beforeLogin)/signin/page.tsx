"use client";

import { Provider } from "@types";
import styles from "./page.module.scss";
import JustSwimSVG from "@assets/logo.svg";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getTokenInCookies } from "@utils";
import { JUST_SWIM, SNS, ROUTES, TEXT } from "@data";
import { SNSSignInButton } from "./_component/button/snsSigninButton";

export interface SNSLoginButtonProps {
  sns: Provider;
}

export default function SignIn() {
  const router = useRouter();

  useEffect(() => {
    const checkCookies = async () => {
      const isLogin = await getTokenInCookies();
      if (!isLogin) {
        return;
      } else {
        router.push(ROUTES.SCHEDULE.root);
      }
    };
    checkCookies();
  }, [router]);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.header_logo}>
          <JustSwimSVG className={styles.logo} aria-label={JUST_SWIM} />
          <h3>{TEXT.SIGNUP_PAGE.welcome}</h3>
        </div>
        <div className={styles.header_info}>
          <p>
            {TEXT.SIGNUP_PAGE.notification.first} <br />
            {TEXT.SIGNUP_PAGE.notification.second}
          </p>
        </div>
      </div>

      <div className={styles.section}>
        {Object.values(SNS).map((sns) => {
          return <SNSSignInButton key={sns} sns={sns as Provider} />;
        })}
      </div>

      <div className={styles.footer}>
        <p className={styles.footer_info}>
          {TEXT.SIGNUP_PAGE.helper.first} <br />{" "}
          {TEXT.SIGNUP_PAGE.helper.second}
        </p>
      </div>
    </>
  );
}
