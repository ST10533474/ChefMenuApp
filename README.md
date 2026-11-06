# ChefMenuApp

## Project Description

ChefMenuApp is a mobile menu management application developed using React Native and Expo. The application is designed to help a chef manage restaurant menu items in a simple, organised and user-friendly way.

The application allows the chef to add, view, edit, update, delete, search and filter menu items. It also provides menu statistics to give an overview of the restaurant's menu.

The application was developed as part of the MAST5112 Mobile App Scripting Portfolio of Evidence.

## Purpose of the Application

The purpose of ChefMenuApp is to provide a digital alternative to managing restaurant menu information. Instead of relying on paper-based menu records, the chef can use the application to capture, organise, update and monitor menu items in one place.

## Main Features

### Menu Management

* Add new menu items.
* Enter a dish name and description.
* Select a course:

  * Starter
  * Main Course
  * Dessert
* Enter the dish price.
* View all available menu items.
* Edit existing menu items.
* Update menu item information.
* Delete menu items with a confirmation message.

### Search and Filtering

* Search for menu items by dish name.
* Filter menu items by course.
* Combine search and course filtering.
* Clear searches and filters to display all menu items again.

### Menu Statistics

* Display the total number of menu items.
* Calculate and display the average menu item price.
* Display the number of dishes in each course category.

### Validation and Feedback

* Validate required input fields.
* Prevent invalid or non-positive prices.
* Display appropriate error messages.
* Display confirmation messages after successful actions.
* Display a message when no menu items are available.

### Data Persistence

* Store menu items locally using AsyncStorage.
* Automatically save menu changes.
* Load previously saved menu items when the application is reopened.
* Retain menu data after closing and restarting the application.

## Technologies Used

* React Native
* Expo
* JavaScript
* React Native Picker
* AsyncStorage
* Android Studio Emulator
* Visual Studio Code
* Git and GitHub

## React Native Components Used

The application uses reusable React Native components to create its user interface, including:

* `View` – Organises the application layout.
* `Text` – Displays headings, labels and menu information.
* `TextInput` – Allows users to enter dish information.
* `Pressable` – Creates interactive buttons and controls.
* `ScrollView` – Displays scrollable menu content.
* `Picker` – Allows users to select a menu course.
* `Image` – Displays the application logo.
* `StyleSheet` – Defines and maintains consistent styling.
* `Alert` – Displays confirmation and feedback messages.

### Reusable Components

The application also uses reusable components to improve code organisation and maintainability:

* `StatCard` – Displays menu statistics.
* `DishCard` – Displays individual menu items.
* `DishForm` – Provides a reusable form for adding and editing menu items.

## Code Organisation and Refactoring

The application was improved during Part 3 through code refactoring and the introduction of reusable components.

The improvements include:

* Using meaningful variable and function names.
* Reducing repeated code through reusable components.
* Organising the application's screens and functionality.
* Improving input validation.
* Separating menu item display, forms and statistics into reusable components.
* Improving the maintainability and readability of the application.

## How to Run the Application

### Prerequisites

The following software should be installed:

* Node.js
* Visual Studio Code
* Android Studio
* Android Emulator
* Expo

### Installation

1. Clone the repository:

```bash
git clone https://github.com/ST10533474/ChefMenuApp.git
```

2. Open the project folder:

```bash
cd ChefMenuApp
```

3. Install the project dependencies:

```bash
npm install
```

4. Start the Expo development server:

```bash
npx expo start
```

5. To build and run the Android application on an available Android emulator, use:

```bash
npx expo run:android
```

## Project Structure

```text
ChefMenuApp/
│
├── assets/
│   ├── chef_menu_logo.jpg
│   ├── icon.png
│   ├── adaptive-icon.png
│   └── splash-icon.png
│
├── App.js
├── app.json
├── index.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## Part 3 Development Changelog

Part 3 focused on enhancing and completing the ChefMenuApp application developed in Part 2.

### 1. Menu Management Enhancements

* Implemented functionality to edit existing menu items.
* Added functionality to update dish names, descriptions, courses and prices.
* Implemented menu item deletion with confirmation.
* Ensured that changes are immediately reflected throughout the application.

### 2. Search and Filtering Enhancements

* Implemented search functionality using dish names.
* Added filtering by Starter, Main Course and Dessert.
* Enabled search and filtering to work together.
* Added functionality to clear search terms and filters.

### 3. Menu Statistics Enhancements

* Added a total menu item counter.
* Implemented an average menu price calculation.
* Added individual course counts.
* Improved the presentation of statistics using reusable statistic cards.

### 4. Data Persistence

* Integrated AsyncStorage to store menu items locally.
* Implemented automatic saving of menu changes.
* Added functionality to load previously saved menu items when the application opens.
* Tested data persistence after restarting the application.

### 5. Code Refactoring

* Introduced reusable `StatCard`, `DishCard` and `DishForm` components.
* Improved code organisation and readability.
* Used meaningful variable and function names.
* Reduced repeated code through reusable components.
* Improved validation and error handling.

### 6. User Interface Improvements

* Improved the application's overall appearance.
* Maintained consistent colours and styling.
* Added the ChefMenuApp logo to the welcome screen.
* Configured a custom application icon.
* Improved navigation and user feedback.
* Added confirmation messages for important actions.

### 7. Testing

The completed application was tested to verify that the required functionality operates correctly.

Testing included:

* Adding, editing, updating and deleting menu items.
* Searching for menu items.
* Filtering menu items by course.
* Combining search and filtering.
* Clearing search and filter selections.
* Checking total menu item statistics.
* Verifying average price calculations.
* Checking course statistics.
* Testing input validation.
* Confirming that menu data remains available after restarting the application.

All the above functionality was tested successfully.

## Demonstration Video

The completed application demonstration is available on YouTube as an Unlisted video.

**YouTube Link:**

https://www.youtube.com/watch?v=XtQvsyBMG0Q

## Author

**Nelly Mgijima**

**Student Number:** ST10533474

**Module:** MAST5112 – Mobile App Scripting

**Project:** ChefMenuApp – Chef's Menu Manager
