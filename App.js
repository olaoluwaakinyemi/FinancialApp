import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const transactionData = [
  {
    id: "1",
    name: "Grocery",
    amount: 50,
    date: "2024-07-01",
    details: "Bought groceries from supermarket.",
  },
  {
    id: "2",
    name: "Rent",
    amount: 500,
    date: "2024-07-01",
    details: "Monthly rent payment.",
  },
  {
    id: "3",
    name: "Utilities",
    amount: 100,
    date: "2024-07-02",
    details: "Paid electricity bill.",
  },
  {
    id: "4",
    name: "Internet",
    amount: 60,
    date: "2024-07-03",
    details: "Monthly internet bill.",
  },
  {
    id: "5",
    name: "Dining",
    amount: 80,
    date: "2024-07-04",
    details: "Dinner at a restaurant.",
  },
];

const TransactionsListScreen = ({ navigation }) => {
  return (
    <FlatList
      data={transactionData}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.transactionItem}
          onPress={() =>
            navigation.navigate("TransactionDetail", { transaction: item })
          }
        >
          <View style={styles.transactionRow}>
            <Text style={styles.transactionName}>{item.name}</Text>
            <Text style={styles.transactionAmount}>${item.amount}</Text>
          </View>
          <Text style={styles.transactionDate}>{item.date}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

const TransactionDetailScreen = ({ route }) => {
  const { transaction } = route.params;
  return (
    <View style={styles.detailContainer}>
      <Text style={styles.detailText}>Name: {transaction.name}</Text>
      <Text style={styles.detailText}>Amount: ${transaction.amount}</Text>
      <Text style={styles.detailText}>Date: {transaction.date}</Text>
      <Text style={styles.detailText}>Details: {transaction.details}</Text>
    </View>
  );
};

const SummaryScreen = () => {
  const totalExpenses = transactionData.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );
  const highSpending = Math.max(
    ...transactionData.map((transaction) => transaction.amount)
  );
  const lowSpending = Math.min(
    ...transactionData.map((transaction) => transaction.amount)
  );

  const highSpendingTransaction = transactionData.find(
    (transaction) => transaction.amount === highSpending
  );
  const lowSpendingTransaction = transactionData.find(
    (transaction) => transaction.amount === lowSpending
  );

  return (
    <View style={styles.summaryContainer}>
      <Text style={styles.summaryText}>Total Expenses: ${totalExpenses}</Text>
      <View style={styles.summaryRow}>
        <Ionicons name="list-outline" size={24} color="black" />
        <Text style={styles.summaryText}>
          {" "}
          Number of Transactions: {transactionData.length}
        </Text>
      </View>
      <View style={styles.summaryRow}>
        <Ionicons name="trending-up-outline" size={24} color="green" />
        <Text style={styles.summaryText}>
          {" "}
          Highest Spending: {highSpendingTransaction.name} ($
          {highSpendingTransaction.amount})
        </Text>
      </View>
      <View style={styles.summaryRow}>
        <Ionicons name="trending-down-outline" size={24} color="red" />
        <Text style={styles.summaryText}>
          {" "}
          Lowest Spending: {lowSpendingTransaction.name} ($
          {lowSpendingTransaction.amount})
        </Text>
      </View>
    </View>
  );
};

const Stack = createNativeStackNavigator();

const TransactionsStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="TransactionsList"
      component={TransactionsListScreen}
      options={{ title: "Transactions List" }}
    />
    <Stack.Screen
      name="TransactionDetail"
      component={TransactionDetailScreen}
      options={{ title: "Transaction Detail" }}
    />
  </Stack.Navigator>
);

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Transactions") {
              iconName = "list";
            } else if (route.name === "Summary") {
              iconName = "pie-chart";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="Transactions"
          component={TransactionsStackNavigator}
          options={{ title: "Transactions" }}
        />
        <Tab.Screen
          name="Summary"
          component={SummaryScreen}
          options={{ title: "Summary" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  transactionItem: {
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  transactionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  transactionName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  transactionDate: {
    fontSize: 12,
    color: "#777",
    marginTop: 5,
  },
  detailContainer: {
    padding: 20,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  detailText: {
    fontSize: 16,
    marginVertical: 5,
  },
  summaryContainer: {
    flex: 1,
    padding: 20,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  summaryText: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5,
  },
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
});
