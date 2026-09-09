# ChefMenuApp

## Project Description

ChefMenuApp is a mobile menu management application developed using React Native and Expo. The application is designed to help a chef manage restaurant menu items in a simple, organised and user-friendly way.

The app allows the user to enter menu information, select a course, add menu items and view all added dishes. Input validation and confirmation messages are included to improve the overall user experience.

## Purpose of the Application

The purpose of ChefMenuApp is to provide a digital alternative to managing restaurant menu information. Instead of relying on paper-based menu records, the chef can use the application to capture and view menu items in one place.

## Main Features

* Add a new menu item
* Enter a dish name
* Enter a dish description
* Select a course:

  * Starter
  * Main Course
  * Dessert
* Enter the dish price
* Validate required fields
* Display appropriate error messages
* Display a confirmation message after successfully adding a dish
* Display a message when no menu items have been added
* Display multiple menu items
* Automatically update the menu when a new dish is added
* Edit existing menu items
* Delete menu items
* Search menu items
* Display menu statistics

## Technologies Used

* React Native
* Expo
* JavaScript
* React Native Picker
* Android Studio Emulator
* Visual Studio Code
* Git and GitHub

## React Native Components Used

The application uses appropriate React Native components to create the user interface, including:

* `View` – for organising the layout
* `Text` – for headings, labels and menu information
* `TextInput` – for entering dish information
* `Pressable` – for buttons and user interactions
* `ScrollView` – for displaying menu content
* `Picker` – for selecting the menu course
* `StyleSheet` – for styling and maintaining a consistent layout

## Validation and User Experience

ChefMenuApp includes validation to ensure that required information is entered before a menu item can be added.

If required information is missing, an error message is displayed to guide the user. After a menu item is successfully added, a confirmation message is displayed.

When there are no menu items available, the application provides a suitable message instead of displaying an empty screen.

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

5. Run the application on an Android emulator using Expo.

## Project Structure

```text
ChefMenuApp/
│
├── assets/
├── node_modules/
├── App.js
├── app.json
├── index.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## Demonstration Video

The application demonstration video is available on YouTube as an Unlisted video.

**YouTube Link:**
https://youtu.be/ctqx7Si4BKs

## Author

**Nelly Mgijima**
**ST10533474**

Student Project – MAST5112 Mobile App Sripting
