import { createCustomer } from "@apis";
import { CustomerBasicProps } from "@types";

export async function formAction(data: CustomerBasicProps) {
  const result = await createCustomer(data);
  console.log(result);

  if (result.success) {
    return { success: true };
  } else {
    return { success: false, error: result.message || "서버 오류 발생" };
  }
}
