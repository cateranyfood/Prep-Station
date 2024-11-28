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

interface MenuItemInfo {
  restaurant_id: string;
  item_name: string;
  item_price: number;
  item_description?: string;
  image_url?: File | string | null;
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
export async function addUserToDatabaseAdmin(userInfo: userInfo) {
  const { user_id, email, first_name, last_name } = userInfo;
  const { data, error } = await supabaseAdmin.from("users").insert([
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
export async function addRestaurantToDatabase(restaurantInfo: RestaurantInfo) {
  console.log(restaurantInfo);
  const { data, error } = await supabaseAdmin
    .from("restaurants")
    .insert([restaurantInfo])
    .select();

  if (error) {
    console.error("Error adding restaurant to database:", error);
    throw new Error(error.message); // Throw the error to handle it in the calling function
  }

  if (data && data.length > 0) {
    return data[0]; // Return the inserted restaurant's record
  }

  throw new Error("Unexpected error: No data returned from database.");
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
    .from("restaurants") // The name of your table
    .select("*") // Specify the columns you want to retrieve, or use '*' for all columns
    .eq("restaurant_owner", ownerId); // Filter by restaurant_owner

  if (error) {
    console.error("Error fetching restaurants:", error);
    return null;
  }

  console.log("Fetched restaurants:", data);
  return data; // This will return an array of matching restaurants
}

/**
 * This TypeScript function retrieves a restaurant from a Supabase table based on the provided
 * restaurant ID.
 * @param {string} restaurantId - The `restaurantId` parameter is a string that represents the unique
 * identifier of a restaurant. This function `getRestaurantByID` is designed to fetch restaurant data
 * from a table named 'restaurants' based on the provided `restaurantId`. It uses Supabase to query the
 * database and retrieve the restaurant information
 * @returns An array of matching restaurants is being returned.
 */
export async function getRestaurantByID(restaurantId: string) {
  const { data, error } = await supabaseAdmin
    .from("restaurants") // The name of your table
    .select("*") // Specify the columns you want to retrieve, or use '*' for all columns
    .eq("id", restaurantId); // Filter by restaurant_owner

  if (error) {
    console.error("Error fetching restaurants:", error);
    return null;
  }

  console.log("Fetched restaurants:", data);
  return data; // This will return an array of matching restaurants
}

/**
 * The function `addMenuItemToDatabaseAdmin` inserts a menu item into a database table for admin users
 * using Supabase.
 * @param {MenuItemInfo} itemInfo - The `itemInfo` parameter in the `addMenuItemToDatabaseAdmin`
 * function represents information about a menu item that needs to be added to the database. This
 * information typically includes details such as the name of the menu item, its price, description,
 * category, and any other relevant information needed to display
 * @returns The function `addMenuItemToDatabaseAdmin` is returning either the `error` object if there
 * was an error adding the menu item to the database, or the `data` object containing the information
 * of the user that was inserted into the database.
 */
export async function addMenuItemToDatabaseAdmin(itemInfo: MenuItemInfo) {
  if (!itemInfo) {
    return null;
  }

  // Handle file upload
  if (itemInfo.image_url && typeof itemInfo.image_url !== 'string') {
    const uploadedUrl = await uploadFileToSupabase(itemInfo.image_url, 'menu_item_image');
    if (uploadedUrl) {
      itemInfo.image_url = uploadedUrl; // Update item_photo to the URL
    } else {
      console.error('Error uploading item photo');
      return null;
    }
  }

  // Insert into the database
  const { data, error } = await supabaseAdmin.from('menu').insert([itemInfo]);

  if (error) {
    console.error('Error adding menu item to database:', error);
    return error;
  }

  console.log('Menu item inserted into database:', data);
  return data;
}

/**
 * This TypeScript function fetches menu items based on a given restaurant ID using Supabase.
 * @param {string} restaurantId - The `restaurantId` parameter is a string that represents the unique
 * identifier of a restaurant. This function `getMenuItemsByRestaurantId` is an asynchronous function
 * that fetches menu items from a database table named 'menu' based on the provided `restaurantId`. It
 * uses Supabase client to
 * @returns The function `getMenuItemsByRestaurantId` returns the menu items for a specific restaurant
 * based on the provided `restaurantId`. If there is an error fetching the menu items, it logs the
 * error and returns `null`. Otherwise, it returns the data containing the menu items.
 */
export async function getMenuItemsByRestaurantId(restaurantId: string) {
  const { data, error } = await supabaseAdmin
    .from("menu")
    .select("*")
    .eq("restaurant_id", restaurantId);

  if (error) {
    console.error("Error fetching menu items:", error);
    return null;
  }

  return data;
}


/**
 * The function `uploadFileToSupabase` uploads a file to a specified bucket in Supabase storage and
 * returns the public URL of the uploaded file.
 * @param {File} file - The `file` parameter in the `uploadFileToSupabase` function is of type `File`,
 * which represents a file from the user's system that you want to upload to a Supabase storage bucket.
 * @param {string} bucketName - The `bucketName` parameter in the `uploadFileToSupabase` function
 * refers to the name of the storage bucket in Supabase where you want to upload the file. This bucket
 * acts as a container for storing files and organizing data within the Supabase storage system. When
 * calling the
 * @returns The function `uploadFileToSupabase` returns a `Promise` that resolves to a `string`
 * representing the public URL of the uploaded file if the upload is successful. If there is an error
 * during the upload process, it returns `null`.
 */
export async function uploadFileToSupabase(file: File, bucketName: string): Promise<string | null> {
  try {
    // Generate a unique file path
    const filePath = `${Date.now()}-${file.name}`;

    // Upload the file to the specified bucket
    const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
      .from(bucketName)
      .upload(filePath, file);

    if (uploadError) {
      console.error('Error uploading file:', uploadError);
      return null;
    }

    // Get the public URL of the uploaded file
    const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);

    // Access and return the public URL
    return data.publicUrl;
  } catch (error) {
    console.error('Unexpected error:', error);
    return null;
  }
}