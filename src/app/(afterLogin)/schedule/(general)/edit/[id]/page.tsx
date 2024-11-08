import { getCourseDetailForEdit } from "@apis";

import { FormBody } from "../../_components";

export default async function ScheduleEditPage({
  params,
}: {
  params: { id: string };
}) {
  const courseDetail = await getCourseDetailForEdit(parseInt(params.id));

  return (
    <>
      {courseDetail && (
        <FormBody type="modify" id={params.id} course={courseDetail} />
      )}
    </>
  );
}
