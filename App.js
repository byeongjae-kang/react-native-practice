import React, { useState } from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";
import GaolInput from "./component/GaolInput";
import GoalItem from "./component/GoalItem";

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const addGoalHandler = (enteredGoal) => {
    setCourseGoals((currentGoals) => [
      ...currentGoals,
      { id: Math.random().toString(), value: enteredGoal }
    ]);
    setIsAddMode(false);
  };

  const removeGoalHandler = (goalId) => {
    setCourseGoals((currentGoals) => {
      return currentGoals.filter((goal) => goal.id !== goalId);
    });
  };

  const cancelHandler = () => {
    setIsAddMode(false);
  };

  return (
    <View style={styles.screen}>
      <Button title="Add New Goal" onPress={() => setIsAddMode(true)} />
      <GaolInput
        visible={isAddMode}
        onAddGoal={addGoalHandler}
        onCancel={cancelHandler}
      />
      <FlatList
        keyExtractor={(item) => item.id}
        data={courseGoals}
        renderItem={(itemData) => (
          <GoalItem
            id={itemData.item.id}
            goal={itemData.item.value}
            onRemoveGoal={removeGoalHandler}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  }
});
