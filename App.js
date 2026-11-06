import { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

function StatCard({ icon, number, label }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statIcon}>{icon}</Text>
      <Text style={styles.statNumber}>{number}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function DishCard({ dish, onEdit, onDelete }) {
  return (
    <View style={styles.dishCard}>
      <View style={styles.dishTopRow}>
        <Text style={styles.dishName}>{dish.name}</Text>
        <Text style={styles.price}>
          R{Number(dish.price).toFixed(2)}
        </Text>
      </View>

      <View style={styles.courseBadge}>
        <Text style={styles.course}>{dish.course}</Text>
      </View>

      <Text style={styles.description}>{dish.description}</Text>

      <View style={styles.actionRow}>
        <Pressable style={styles.editButton} onPress={onEdit}>
          <Text style={styles.editButtonText}>✏️ Edit</Text>
        </Pressable>

        <Pressable style={styles.deleteButton} onPress={onDelete}>
          <Text style={styles.deleteButtonText}>🗑️ Delete</Text>
        </Pressable>
      </View>
    </View>
  );
}

function DishForm({
  title,
  subtitle,
  icon,
  dishName,
  setDishName,
  description,
  setDescription,
  course,
  setCourse,
  price,
  setPrice,
  error,
  buttonText,
  onSubmit,
  onCancel,
}) {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.formHeader}>
        <Text style={styles.emoji}>{icon}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.formSubtitle}>{subtitle}</Text>
      </View>

      <View style={styles.formCard}>
        <Text style={styles.label}>Dish Name</Text>

        <TextInput
          style={styles.input}
          placeholder="e.g. Cape Malay Curry"
          placeholderTextColor="#999"
          value={dishName}
          onChangeText={setDishName}
        />

        <Text style={styles.label}>Description</Text>

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Describe the dish..."
          placeholderTextColor="#999"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <Text style={styles.label}>Course</Text>

        <View style={styles.pickerContainer}>
          <Picker selectedValue={course} onValueChange={setCourse}>
            <Picker.Item label="Select a course" value="" />
            <Picker.Item label="Starter" value="Starter" />
            <Picker.Item label="Main Course" value="Main Course" />
            <Picker.Item label="Dessert" value="Dessert" />
          </Picker>
        </View>

        <Text style={styles.label}>Price</Text>

        <TextInput
          style={styles.input}
          placeholder="e.g. 120.00"
          placeholderTextColor="#999"
          value={price}
          onChangeText={setPrice}
          keyboardType="decimal-pad"
        />

        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : null}

        <Pressable style={styles.button} onPress={onSubmit}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </Pressable>

        <Pressable style={styles.secondaryButton} onPress={onCancel}>
          <Text style={styles.secondaryButtonText}>Cancel</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

export default function App() {
  const [screen, setScreen] = useState("home");

  const [dishName, setDishName] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState("");
  const [price, setPrice] = useState("");

  const [dishes, setDishes] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [searchText, setSearchText] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("All");

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const loadDishes = async () => {
      try {
        const savedDishes = await AsyncStorage.getItem("dishes");

        if (savedDishes !== null) {
          setDishes(JSON.parse(savedDishes));
        }
      } catch (error) {
        Alert.alert("Error", "Unable to load saved dishes.");
      } finally {
        setIsLoaded(true);
      }
    };

    loadDishes();
  }, []);

  useEffect(() => {
    const saveDishes = async () => {
      if (!isLoaded) {
        return;
      }

      try {
        await AsyncStorage.setItem("dishes", JSON.stringify(dishes));
      } catch (error) {
        Alert.alert("Error", "Unable to save your menu.");
      }
    };

    saveDishes();
  }, [dishes, isLoaded]);

  const totalDishes = dishes.length;

  const starterCount = dishes.filter(
    (dish) => dish.course === "Starter"
  ).length;

  const mainCourseCount = dishes.filter(
    (dish) => dish.course === "Main Course"
  ).length;

  const dessertCount = dishes.filter(
    (dish) => dish.course === "Dessert"
  ).length;

  const averagePrice =
    totalDishes === 0
      ? 0
      : dishes.reduce(
          (total, dish) => total + Number(dish.price),
          0
        ) / totalDishes;

  const filteredDishes = dishes.filter((dish) => {
    const matchesSearch = dish.name
      .toLowerCase()
      .includes(searchText.trim().toLowerCase());

    const matchesCourse =
      selectedCourse === "All" ||
      dish.course === selectedCourse;

    return matchesSearch && matchesCourse;
  });

  const resetForm = () => {
    setDishName("");
    setDescription("");
    setCourse("");
    setPrice("");
    setError("");
    setEditingId(null);
  };

  const validateForm = () => {
    if (
      !dishName.trim() ||
      !description.trim() ||
      !course ||
      !price.trim()
    ) {
      setError("Please complete all fields before continuing.");
      return false;
    }

    const numericPrice = Number(price);

    if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
      setError("Please enter a valid price greater than zero.");
      return false;
    }

    return true;
  };

  const addDish = () => {
    setError("");
    setSuccess("");

    if (!validateForm()) {
      return;
    }

    const newDish = {
      id: Date.now().toString(),
      name: dishName.trim(),
      description: description.trim(),
      course,
      price: Number(price).toFixed(2),
    };

    setDishes((previousDishes) => [
      ...previousDishes,
      newDish,
    ]);

    resetForm();
    setSuccess("Dish added successfully!");
    setScreen("menu");
  };

  const startEditing = (dish) => {
    setDishName(dish.name);
    setDescription(dish.description);
    setCourse(dish.course);
    setPrice(String(dish.price));

    setEditingId(dish.id);
    setError("");
    setSuccess("");
    setScreen("edit");
  };

  const updateDish = () => {
    setError("");
    setSuccess("");

    if (!validateForm()) {
      return;
    }

    const updatedDish = {
      id: editingId,
      name: dishName.trim(),
      description: description.trim(),
      course,
      price: Number(price).toFixed(2),
    };

    setDishes((previousDishes) =>
      previousDishes.map((dish) =>
        dish.id === editingId ? updatedDish : dish
      )
    );

    resetForm();
    setSuccess("Dish updated successfully!");
    setScreen("menu");
  };

  const deleteDish = (id) => {
    Alert.alert(
      "Delete Dish",
      "Are you sure you want to delete this dish?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setDishes((previousDishes) =>
              previousDishes.filter((dish) => dish.id !== id)
            );

            setSuccess("Dish deleted successfully!");
          },
        },
      ]
    );
  };

  const clearFilters = () => {
    setSearchText("");
    setSelectedCourse("All");
  };

  if (!isLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading your menu...</Text>
      </View>
    );
  }

  if (screen === "add") {
    return (
      <DishForm
        title="Add New Dish"
        subtitle="Add a delicious new item to your menu."
        icon="🍽️"
        dishName={dishName}
        setDishName={setDishName}
        description={description}
        setDescription={setDescription}
        course={course}
        setCourse={setCourse}
        price={price}
        setPrice={setPrice}
        error={error}
        buttonText="Add Dish"
        onSubmit={addDish}
        onCancel={() => {
          resetForm();
          setScreen("home");
        }}
      />
    );
  }

  if (screen === "edit") {
    return (
      <DishForm
        title="Edit Dish"
        subtitle="Update the details of your menu item."
        icon="✏️"
        dishName={dishName}
        setDishName={setDishName}
        description={description}
        setDescription={setDescription}
        course={course}
        setCourse={setCourse}
        price={price}
        setPrice={setPrice}
        error={error}
        buttonText="Save Changes"
        onSubmit={updateDish}
        onCancel={() => {
          resetForm();
          setScreen("menu");
        }}
      />
    );
  }

  if (screen === "menu") {
    return (
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.menuHeader}>
          <Text style={styles.emoji}>🍽️</Text>
          <Text style={styles.title}>My Menu</Text>

          <Text style={styles.menuSubtitle}>
            Manage all your restaurant dishes in one place.
          </Text>
        </View>

        {success ? (
          <Text style={styles.successText}>{success}</Text>
        ) : null}

        <Text style={styles.statsTitle}>Menu Statistics</Text>

        <View style={styles.statsContainer}>
          <StatCard
            icon="📋"
            number={totalDishes}
            label="Total Dishes"
          />

          <StatCard
            icon="🥗"
            number={starterCount}
            label="Starters"
          />

          <StatCard
            icon="🍛"
            number={mainCourseCount}
            label="Main Courses"
          />

          <StatCard
            icon="🍰"
            number={dessertCount}
            label="Desserts"
          />

          <StatCard
            icon="💰"
            number={`R${averagePrice.toFixed(2)}`}
            label="Average Price"
          />
        </View>

        <Text style={styles.sectionTitle}>Your Dishes</Text>

        <Text style={styles.searchLabel}>Search Menu</Text>

        <TextInput
          style={styles.searchInput}
          placeholder="🔍  Search for a dish..."
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={setSearchText}
        />

        <Text style={styles.searchLabel}>Filter by Course</Text>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedCourse}
            onValueChange={setSelectedCourse}
          >
            <Picker.Item label="All Courses" value="All" />
            <Picker.Item label="Starter" value="Starter" />
            <Picker.Item label="Main Course" value="Main Course" />
            <Picker.Item label="Dessert" value="Dessert" />
          </Picker>
        </View>

        <Pressable
          style={styles.secondaryButton}
          onPress={clearFilters}
        >
          <Text style={styles.secondaryButtonText}>
            Clear Search and Filters
          </Text>
        </Pressable>

        {dishes.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyIcon}>🍽️</Text>
            <Text style={styles.emptyTitle}>No Dishes Yet</Text>

            <Text style={styles.emptyText}>
              Add your first dish to start building your menu.
            </Text>
          </View>
        ) : filteredDishes.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyTitle}>No Results</Text>

            <Text style={styles.emptyText}>
              No dishes found matching your search or selected course.
            </Text>
          </View>
        ) : (
          filteredDishes.map((dish) => (
            <DishCard
              key={dish.id}
              dish={dish}
              onEdit={() => startEditing(dish)}
              onDelete={() => deleteDish(dish.id)}
            />
          ))
        )}

        <Pressable
          style={styles.button}
          onPress={() => {
            resetForm();
            setSuccess("");
            setScreen("add");
          }}
        >
          <Text style={styles.buttonText}>
            + Add Another Dish
          </Text>
        </Pressable>

        <Pressable
          style={styles.secondaryButton}
          onPress={() => {
            clearFilters();
            setSuccess("");
            setScreen("home");
          }}
        >
          <Text style={styles.secondaryButtonText}>
            ← Back to Home
          </Text>
        </Pressable>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.homeContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.homeCard}>
        <Image
          source={require("./assets/chef_menu_logo.jpg")}
          style={styles.homeLogo}
          resizeMode="contain"
        />

        <Text style={styles.homeTitle}>
          Chef's Menu Manager
        </Text>

        <Text style={styles.homeSubtitle}>
          Manage your restaurant menu with ease.
        </Text>

        <View style={styles.divider} />

        <Text style={styles.welcomeText}>
          Welcome, Chef!
        </Text>

        <Text style={styles.descriptionText}>
          Add, edit, search and manage your dishes from one
          simple menu management system.
        </Text>

        <Pressable
          style={styles.button}
          onPress={() => {
            resetForm();
            setSuccess("");
            setScreen("add");
          }}
        >
          <Text style={styles.buttonText}>
            + Add New Dish
          </Text>
        </Pressable>

        <Pressable
          style={styles.secondaryButton}
          onPress={() => {
            setSuccess("");
            setScreen("menu");
          }}
        >
          <Text style={styles.secondaryButtonText}>
            View My Menu
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff8f0",
  },

  loadingText: {
    fontSize: 18,
    color: "#5D4037",
    fontWeight: "bold",
  },

  container: {
    flexGrow: 1,
    padding: 22,
    backgroundColor: "#fff8f0",
  },

  homeContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 22,
    backgroundColor: "#fff8f0",
  },

  homeCard: {
    backgroundColor: "white",
    padding: 28,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#eadfd5",
  },

  homeLogo: {
    width: 180,
    height: 180,
    alignSelf: "center",
    marginBottom: 15,
  },

  homeTitle: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#5D4037",
    marginBottom: 10,
  },

  homeSubtitle: {
    fontSize: 17,
    textAlign: "center",
    color: "#666",
    lineHeight: 24,
  },

  divider: {
    height: 1,
    backgroundColor: "#eadfd5",
    marginVertical: 25,
  },

  welcomeText: {
    fontSize: 21,
    fontWeight: "bold",
    textAlign: "center",
    color: "#8B4513",
    marginBottom: 10,
  },

  descriptionText: {
    fontSize: 15,
    textAlign: "center",
    color: "#666",
    lineHeight: 23,
    marginBottom: 30,
  },

  formHeader: {
    marginBottom: 20,
  },

  menuHeader: {
    marginBottom: 15,
  },

  emoji: {
    fontSize: 42,
    textAlign: "center",
    marginBottom: 8,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#5D4037",
    marginBottom: 8,
  },

  formSubtitle: {
    fontSize: 15,
    textAlign: "center",
    color: "#666",
  },

  menuSubtitle: {
    fontSize: 15,
    textAlign: "center",
    color: "#666",
    lineHeight: 22,
  },

  formCard: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#eadfd5",
  },

  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#5D4037",
    marginBottom: 8,
  },

  input: {
    backgroundColor: "#fafafa",
    borderWidth: 1,
    borderColor: "#d8cec5",
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    marginBottom: 20,
    color: "#333",
  },

  pickerContainer: {
    backgroundColor: "#fafafa",
    borderWidth: 1,
    borderColor: "#d8cec5",
    borderRadius: 10,
    marginBottom: 20,
    overflow: "hidden",
  },

  textArea: {
    height: 105,
    textAlignVertical: "top",
  },

  errorText: {
    color: "#b00020",
    backgroundColor: "#fdecec",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    lineHeight: 20,
  },

  successText: {
    color: "#2e7d32",
    backgroundColor: "#eaf7ea",
    padding: 13,
    borderRadius: 10,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },

  button: {
    backgroundColor: "#8B4513",
    padding: 16,
    borderRadius: 10,
    marginBottom: 14,
  },

  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
  },

  secondaryButton: {
    backgroundColor: "#eee7e1",
    padding: 16,
    borderRadius: 10,
    marginBottom: 14,
  },

  secondaryButtonText: {
    color: "#5D4037",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },

  statsTitle: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#5D4037",
    marginBottom: 12,
  },

  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 25,
  },

  statCard: {
    backgroundColor: "white",
    width: "48%",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eadfd5",
  },

  statIcon: {
    fontSize: 25,
    marginBottom: 5,
  },

  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#8B4513",
    marginBottom: 3,
  },

  statLabel: {
    fontSize: 13,
    color: "#666",
    textAlign: "center",
  },

  sectionTitle: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#5D4037",
    marginBottom: 12,
  },

  searchLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#5D4037",
    marginBottom: 8,
  },

  searchInput: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#d8cec5",
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    marginBottom: 20,
    color: "#333",
  },

  dishCard: {
    backgroundColor: "white",
    padding: 18,
    borderRadius: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#eadfd5",
  },

  dishTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },

  dishName: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
    marginRight: 10,
  },

  courseBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#f3e6d8",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 10,
  },

  course: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#8B4513",
  },

  description: {
    fontSize: 15,
    color: "#555",
    lineHeight: 22,
    marginBottom: 15,
  },

  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#8B4513",
  },

  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  editButton: {
    backgroundColor: "#5D4037",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 6,
  },

  editButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
  },

  deleteButton: {
    backgroundColor: "#c62828",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginLeft: 6,
  },

  deleteButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
  },

  emptyCard: {
    backgroundColor: "white",
    padding: 25,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#eadfd5",
  },

  emptyIcon: {
    fontSize: 40,
    marginBottom: 10,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#5D4037",
    marginBottom: 8,
  },

  emptyText: {
    textAlign: "center",
    fontSize: 15,
    color: "#666",
    lineHeight: 22,
  },
});