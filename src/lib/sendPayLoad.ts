import { supabase } from "./supa";

export async function sendPayload(content: any): Promise<void> {
  console.log("reached to submit to supabase");
  await supabase.from("message_history").insert([{ payload: content }]).select("id");
}
