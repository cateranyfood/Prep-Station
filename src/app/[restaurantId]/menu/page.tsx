import { getMenuItemsByRestaurantId } from "../../../../services/database";
import MenuClientComponent from "../../../components/restaurant/MenuClientComponent";

export default async function MenuPage(context: { params: { restaurantId: string } }) {
  // Await the params before accessing restaurantId
  const { restaurantId } = await context.params;

  // Fetch menu items from the database
  const menuItems = (await getMenuItemsByRestaurantId(restaurantId)) || [];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Menu</h1>

      {/* Render the menu items */}
      <MenuClientComponent restaurantId={restaurantId} initialMenuItems={menuItems} />
    </div>
  );
}