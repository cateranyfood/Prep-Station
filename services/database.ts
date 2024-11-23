import { supabaseAdmin, supabase } from "./supabase";

interface userInfo {
    user_id: string;
    email: string;
    first_name: string;
    last_name: string;
}

interface RestaurantInfo {
    restaurant_name: string;
    address: string;
    restaurant_phone_number: string;
    restaurant_photo?: string;
    restaurant_owner: string;
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

export async function addRestaurantToDatabase(restaurantInfo:RestaurantInfo) {
    const { restaurant_owner, restaurant_name, address, restaurant_phone_number, restaurant_photo } = restaurantInfo;
    console.log(restaurantInfo);
    const { data, error } = await supabaseAdmin.from('restaurants').insert([restaurantInfo]).select();

    if (error) {
        console.error('Error adding restaurant to database:', error);
        throw new Error(error.message); // Throw the error to handle it in the calling function
      }
    
      if (data && data.length > 0) {
        return data[0]; // Return the inserted restaurant's record
      }
    
      throw new Error('Unexpected error: No data returned from database.');
}

export async function getRestaurantsByOwner(ownerId: string) {
  const { data, error } = await supabaseAdmin
    .from('restaurants') // The name of your table
    .select('*') // Specify the columns you want to retrieve, or use '*' for all columns
    .eq('restaurant_owner', ownerId); // Filter by restaurant_owner

  if (error) {
    console.error('Error fetching restaurants:', error);
    return null;
  }

  console.log('Fetched restaurants:', data);
  return data; // This will return an array of matching restaurants
}