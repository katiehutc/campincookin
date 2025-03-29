import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

const SCREEN_WIDTH = 393;
const SCREEN_HEIGHT = 852;

export default function PreferenceScreen() {
    const router = useRouter();

    const params = useLocalSearchParams();

    //Selected ingredients
    const ingredientsData = params.ingredients
        ? JSON.parse(params.ingredients as string)
        : {};

    // State for recipe type buttons
    const [recipeType, setRecipeType] = useState({
        type1: false,
        type2: false,
        type3: false
    });

    // Preference
    const toggleRecipeType = (type) => {
        const newState = {
            type1: false,
            type2: false,
            type3: false
        };

        // radio button --> only pick 1
        newState[type] = true;
        setRecipeType(newState);
    };

    useEffect(() => {
        // log
        console.log("Received ingredients in preference screen:", ingredientsData);
    }, []);

    // selected ingredients (with value 1)
    const selectedIngredients = Object.keys(ingredientsData)
        .filter(key => ingredientsData[key] === 1);

    const handleGenerate = () => {
        //extract recipe type
        const selectedType = Object.keys(recipeType).find(key => recipeType[key]) || null;

        // convert recipe type selection to number (1, 2, or 3) or 0 if none selected
        let recipeTypeValue = 0;
        if (selectedType === 'type1') recipeTypeValue = 1;
        if (selectedType === 'type2') recipeTypeValue = 2;
        if (selectedType === 'type3') recipeTypeValue = 3;

        // data to be passed to generate page
        const data = {
            ingredients: ingredientsData,
            recipeType: recipeTypeValue
        };

        // Navigate to generate page with the data
        router.push({
            pathname: "/generatepage",
            params: { data: JSON.stringify(data) }
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Preferences</Text>

            <View style={styles.card}>
                <Text style={styles.subtitle}>Selected Ingredients:</Text>

                <ScrollView style={styles.scrollView}>
                    {selectedIngredients.length > 0 ? (
                        selectedIngredients.map((ingredient, index) => (
                            <View key={index} style={styles.ingredientItem}>
                                <Text style={styles.ingredientText}>
                                    • {ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}
                                </Text>
                            </View>
                        ))
                    ) : (
                        <Text style={styles.noIngredients}>No ingredients selected</Text>
                    )}
                </ScrollView>
            </View>

            <View style={styles.card}>
                <Text style={styles.subtitle}>What kind of recipe would you like?</Text>

                <TouchableOpacity
                    style={[styles.typeButton, recipeType.type1 && styles.typeButtonActive]}
                    onPress={() => toggleRecipeType('type1')}
                >
                    <Text style={[styles.typeButtonText, recipeType.type1 && styles.typeButtonTextActive]}>
                        Quick and Easy
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.typeButton, recipeType.type2 && styles.typeButtonActive]}
                    onPress={() => toggleRecipeType('type2')}
                >
                    <Text style={[styles.typeButtonText, recipeType.type2 && styles.typeButtonTextActive]}>
                        Healthy
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.typeButton, recipeType.type3 && styles.typeButtonActive]}
                    onPress={() => toggleRecipeType('type3')}
                >
                    <Text style={[styles.typeButtonText, recipeType.type3 && styles.typeButtonTextActive]}>
                        Unique
                    </Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={styles.generateButton}
                onPress={handleGenerate}
            >
                <Text style={styles.generateButtonText}>Generate Recipe!</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        padding: 20,
        ...Platform.select({
            web: {
                maxWidth: SCREEN_WIDTH,
                maxHeight: SCREEN_HEIGHT,
                alignSelf: 'center',
            }
        })
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
    ingredientItem: {
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
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
    typeButton: {
        backgroundColor: '#f0f0f0',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    typeButtonActive: {
        backgroundColor: '#FF9800',
        borderColor: '#F57C00',
    },
    typeButtonText: {
        fontSize: 16,
        color: '#333',
    },
    typeButtonTextActive: {
        color: 'white',
        fontWeight: 'bold',
    },
    generateButton: {
        backgroundColor: '#4CAF50',
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    generateButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    }
});