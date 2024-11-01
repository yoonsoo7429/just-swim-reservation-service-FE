import { getCourseDetail } from "@apis";

import { FormBody } from "../../_components";

export default async function ScheduleEditPage({
  params,
}: {
  params: { id: string };
}) {
  const courseDetail = await getCourseDetail(parseInt(params.id));

  return (
    <>
      {courseDetail && (
        <FormBody type="modify" id={params.id} course={courseDetail} />
      )}
    </>
  );
}
