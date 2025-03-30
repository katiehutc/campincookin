import React from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function RecipePageScreen() {
    const params = useLocalSearchParams();
    const router = useRouter();
    const recipe = params.recipe ? JSON.parse(params.recipe as string) : null;

    if (!recipe) return <Text>No recipe found.</Text>;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>{recipe.title}</Text>
            <Text style={styles.detail}>Calories: {recipe.calories || 'Not available'}</Text>
            <Text style={styles.detail}>Cooking Time: {recipe.cookingTime}</Text>

            <Text style={styles.sectionTitle}>Ingredients:</Text>
            {recipe.ingredients.map((ingredient, index) => (
                <Text key={index} style={styles.text}>
                    • {ingredient}
                </Text>
            ))}

            <Text style={styles.sectionTitle}>Instructions:</Text>
            {recipe.instructions.map((instruction, index) => (
                <Text key={index} style={styles.text}>
                    {index + 1}. {instruction}
                </Text>
            ))}

            <Button
                title="Back to Recipes"
                onPress={() => router.replace({
                    pathname: '/recipelist',
                    params: { recipes: params.recipes } // Send back the full list
                })}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20, alignItems: 'center' , backgroundColor: '#FFB5B5FF',},
    title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 , fontFamily: 'Comic Sans MS',  color: '#6BADCE'},
    detail: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 , fontFamily: 'Comic Sans MS',  color: '#6BADCE'},
    sectionTitle: { fontSize: 22, fontWeight: 'bold', marginTop: 10 , fontFamily: 'Comic Sans MS',  color: '#6BADCE'},
    text: { fontSize: 16, marginVertical: 2, fontFamily: 'Comic Sans MS', color: '#6BADCE'},

});