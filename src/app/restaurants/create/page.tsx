import RestaurantForm from "../../../components/restaurants/create";

export default function CreateRestaurant() {
  return (
    <div className="w-full min-h-screen mx-0 px-6 text-white py-8">
      <header className="mb-8 px-6">
        <h1 className="text-3xl font-bold">Create a Restaurant</h1>
      </header>
      <RestaurantForm />
    </div>
  );
}