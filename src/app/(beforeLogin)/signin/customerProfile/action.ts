import { createCustomer } from "@apis";
import { CustomerBasicProps } from "@types";

export async function formAction(data: CustomerBasicProps) {
  // 서버에 presigned url 요청 api
  if (data.customerProfileImage?.length === 0) {
    data.customerProfileImage = undefined;
  }
  const result = await createCustomer(data);

  if (result.success) {
    return { success: true };
  } else {
    return { success: false, error: result.message || "서버 오류 발생" };
  }
}
