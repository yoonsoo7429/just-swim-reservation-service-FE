import { getCourseDetail, getMyProfile } from "@apis";

import { Main, Header, ButtonWrapper } from "./_components";

import styled from "./styles.module.scss";

export default async function Complete({ params }: { params: { id: string } }) {
  const courseDetail = await getCourseDetail(parseInt(params.id));
  const profileInfo = await getMyProfile();

  return (
    <>
      {courseDetail && (
        <div className={styled.container}>
          <Header />
          <div className={styled.complete_message}>
            <p>수업 등록이 완료되었습니다.</p>
          </div>
          <Main
            courseData={courseDetail}
            instructorData={profileInfo.data.data!}
          />
          <ButtonWrapper id={params.id} />
        </div>
      )}
    </>
  );
}
