import { supabaseAdmin } from "./supabase";

interface userInfo {
    user_id: string;
    email: string;
    first_name: string;
    last_name: string;
}
export async function addUserToDatabaseAdmin(userInfo:userInfo) {
    const { user_id, email, first_name, last_name } = userInfo;
    const {data, error} = await supabaseAdmin.from("users").insert([
        {
            user_id: user_id,
            email: email,
            first_name: first_name,
            last_name: last_name,
        },
    ]);

    if (error) {
        console.error("Error adding user to database:", error);
        return error;
    }

    console.log("User inserted into database:", data);
    return data;
}