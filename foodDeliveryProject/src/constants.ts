export class Constants {
  static errorMsgs = {
    error: "Something went wrong",
    unauthorized: "Unauthorized",
    tokenMissing: "Please provide Authorization token",
    adminUnauthorized: "You are not authorized",
    sessionExpired: "Session expired / Customer logged out",

    loginFailed: "Login failed",
    adminNotFound: "User not found",
    deleteFailed: "Failed to delete admin profile",
    securityFailed: "Security question failed",
    somethingWentWrong: "Something went wrong",

    invalidPassword: "Invalid password",
    updateFailed: "Failed to update admin profile",

    customerNotFound: "Customer not found",
    customerExists: "Customer already exists. Please login.",
    updateProfileFailed: "Failed to update customer profile",
    deleteProfileFailed: "Failed to delete customer profile",
    resetPasswordFailed: "Failed to reset password",
    logoutFailed: "Something went wrong during logout",

    restaurantNotFound: "Restaurant not found",
    errorUpdatingRestaurant: "An error occurred while updating the restaurant",
    errorDeletingRestaurant: "An error occurred while deleting the restaurant",
    errorAddingRestaurant: "An error occurred while adding the restaurant",
    fetchRestaurantError: "An error occurred while fetching the restaurant",
    fetchRestaurantsError: "An error occurred while fetching the restaurants",
    restaurantsNotFound: "Restaurants not found",
    invalidRestaurantId: "Invalid restaurant ID",
    invalidRestaurantName: "Invalid restaurant name",
    invalidCityName: "Invalid city name",
    pleaseProvideData: "Please provide data",

    categoryNotFound: "Category not found",
    invalidCatoryId: "Invalid catory Id",
    invalidCatoryname: "Invalid catory name",
    categoriesNotFound: "Error fetching all categories",
    errorUpdatingCategory: "An error occurred while updating the category",
    errorDeletingCategory: "An error occurred while deleting the category",
    errorAddingCategory: "An error occurred while adding the category",

    menuItemCreationFailed: "An error occurred while creating the menu item",
    menuItemUpdateFailed: "An error occurred while updating the menu item",
    menuItemDeletionFailed: "An error occurred while deleting the menu item",
    fetchMenuItemsError: "An error occurred while fetching menu items",
    fetchMenuItemError: "An error occurred while fetching the menu item",
    fetchMenuItemsByRestaurantError:
      "An error occurred while fetching menu items by restaurant",
    fetchMenuItemsByCategoryError:
      "An error occurred while fetching menu items by category",
      
  menuItemNotFound: 'Menu item not found',
  fetchMenuItemByIDError: 'Error fetching menu item by ID',
  createMenuItemError: 'Error creating menu item',
  updateMenuItemError: 'Error updating menu item',
  deleteMenuItemError: 'Error deleting menu item',

    staffNotFound: "Delivery staff not found",
    errorUpdatingStaff: "An error occurred while updating the delivery staff",
    errorDeletingStaff: "An error occurred while deleting the delivery staff",
    errorAddingStaff: "An error occurred while adding the delivery staff",
  };

  static successMsgs = {
    success: "Success",
    profileUpdated: "Admin profile updated successfully",
    profileDeleted: "Admin profile deleted successfully",
    passwordUpdated: "Password updated successfully and now you are logged in!",

    logoutSuccess: "Logout successful",
    customerRegistered:
      "Customer registered successfully. Please verify your mail",
    loginSuccess: "Login successful",

    restaurantAdded: "Restaurant added successfully",
    restaurantUpdated: "Restaurant updated successfully",
    restaurantDeleted: "Restaurant deleted successfully",

    categoryAdded: "Category added successfully",
    categoryUpdated: "Category updated successfully",
    categoryDeleted: "Category deleted successfully",

    menuItemCreated: "Menu Item created successfully",
    menuItemUpdated: "Menu Item updated successfully",
    menuItemDeleted: "Menu Item deleted successfully",
    menuItemsFetched: "Menu items fetched successfully",
    menuItemFetched: "Menu item fetched successfully",
    menuItemsByRestaurantFetched:
      "Menu items fetched by restaurant successfully",
    menuItemsByCategoryFetched: "Menu items fetched by category successfully",

    staffNotFound: "Delivery staff not found",
    staffAdded: "Delivery staff added successfully",
    staffUpdated: "Delivery staff updated successfully",
    staffDeleted: "Delivery staff deleted successfully",
  };
}
