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

/**
 * The function `addUserToDatabaseAdmin` inserts user information into a database table using Supabase
 * Admin.
 * @param {userInfo} userInfo - The `userInfo` parameter is an object containing information about a
 * user. It includes the following properties:
 * @returns The function `addUserToDatabaseAdmin` is returning either the `data` object if the user was
 * successfully inserted into the database, or the `error` object if there was an error adding the user
 * to the database.
 */
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

/**
 * This TypeScript function adds restaurant information to a database using Supabase and returns the
 * inserted record.
 * @param {RestaurantInfo} restaurantInfo - The `restaurantInfo` parameter is an object that contains
 * information about a restaurant. It includes the following properties:
 * @returns The function `addRestaurantToDatabase` is returning the inserted restaurant's record if the
 * insertion was successful. If there is an error during the insertion process, it will throw an error
 * with the error message to handle it in the calling function. If there is no data returned from the
 * database unexpectedly, it will throw an error indicating that.
 */
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

/**
 * This TypeScript function retrieves restaurants owned by a specific owner using Supabase and returns
 * the data.
 * @param {string} ownerId - The `ownerId` parameter in the `getRestaurantsByOwner` function is a
 * string that represents the unique identifier of the owner whose restaurants you want to retrieve.
 * This function fetches restaurants from a database table based on the provided `ownerId`.
 * @returns An array of restaurants that belong to the owner with the specified ownerId.
 */
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