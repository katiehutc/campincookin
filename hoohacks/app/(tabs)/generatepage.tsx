import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const SCREEN_WIDTH = 393;
const SCREEN_HEIGHT = 852;

export default function GenerateScreen() {
    const params = useLocalSearchParams();

    // Parse the passed data
    const data = params.data ? JSON.parse(params.data as string) : null;
    const ingredientsData = data?.ingredients || {};
    const recipeType = data?.recipeType || 0;

    // Get selected ingredients
    const selectedIngredients = Object.keys(ingredientsData).filter(key => ingredientsData[key] === 1);

    const selectedIngredientsString = Object.keys(ingredientsData)
        .filter(key => ingredientsData[key] === 1)
        .join(', ');

    // Map recipe type value to text
    const recipeTypeText = {
        1: "Quick and Easy",
        2: "Healthy",
        3: "Unique",
        0: "No preference selected"
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Generated Recipe</Text>

            <View style={styles.card}>
                <Text style={styles.subtitle}> {selectedIngredientsString} </Text>
                <Text style={styles.subtitle}>Selected Ingredients:</Text>
                <ScrollView style={styles.scrollView}>
                    {selectedIngredients.length > 0 ? (
                        selectedIngredients.map((ingredient, index) => (
                            <Text key={index} style={styles.ingredientText}>
                                • {ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}
                            </Text>
                        ))
                    ) : (
                        <Text style={styles.noIngredients}>No ingredients selected</Text>
                    )}
                </ScrollView>
            </View>

            <View style={styles.card}>
                <Text style={styles.subtitle}>Recipe Type:</Text>
                <Text style={styles.recipeTypeText}>{recipeTypeText[recipeType]}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
    },
    scrollView: {
        maxHeight: 150,
    },
    ingredientText: {
        fontSize: 16,
        color: '#333',
    },
    noIngredients: {
        fontSize: 16,
        fontStyle: 'italic',
        color: '#888',
    },
    recipeTypeText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#555',
        textAlign: 'center',
    },
});

