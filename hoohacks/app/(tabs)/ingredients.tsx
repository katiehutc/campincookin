import React, { useState } from 'react';
import {
    View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform, Image, ScrollView
} from "react-native";
import { useRouter } from "expo-router";

const SCREEN_WIDTH = 393;
const SCREEN_HEIGHT = 852;

const ingredientsList = [
    { name: 'hotdog', label: 'Hot Dog', image: require('../../images/ingreds/Sausage.png') },
    { name: 'corn', label: 'Corn', image: require('../../images/ingreds/corn.png') },
    { name: 'potato', label: 'Potato', image: require('../../images/ingreds/Potato.png') },
    // Add more ingredients here...
];

export default function IngredientsScreen() {
    const router = useRouter();

    // State for toggling ingredients
    const [ingredients, setIngredients] = useState(
        ingredientsList.reduce((acc, item) => ({ ...acc, [item.name]: false }), {})
    );

    const toggleIngredient = (ingredient) => {
        setIngredients(prevState => ({
            ...prevState,
            [ingredient]: !prevState[ingredient]
        }));
    };

    const handleContinue = () => {
        const ingredientsData = Object.keys(ingredients).reduce((acc, key) => {
            acc[key] = ingredients[key] ? 1 : 0;
            return acc;
        }, {});

        console.log("Selected ingredients:", ingredientsData);
        router.push({
            pathname: "/preference",
            params: { ingredients: JSON.stringify(ingredientsData) }
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select ingredients:</Text>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {ingredientsList.map((item) => (
                    <TouchableOpacity
                        key={item.name}
                        style={[styles.button, ingredients[item.name] && styles.buttonActive]}
                        onPress={() => toggleIngredient(item.name)}
                    >
                        <Image source={item.image} style={styles.image} />
                        <Text style={[styles.buttonText, ingredients[item.name] && styles.buttonTextActive]}>
                            {item.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
                <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    scrollContainer: {
        alignItems: 'center',
        paddingBottom: 100, // Ensures scrolling space
    },
    button: {
        backgroundColor: '#f0f0f0',
        padding: 0,
        borderRadius: 10,
        width: '25%',
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    buttonActive: {
        backgroundColor: '#4CAF50',
        borderColor: '#388E3C',
    },
    buttonText: {
        fontSize: 18,
        color: '#333',
        marginTop: 5,
    },
    buttonTextActive: {
        color: 'white',
        fontWeight: 'bold',
    },
    image: {
        width: 50,
        height: 50,
        marginBottom: 5,
    },
    continueButton: {
        backgroundColor: '#2196F3',
        padding: 15,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
        alignSelf: 'center',
        position: 'absolute',
        bottom: 30, // Fixes the button at the bottom
    },
    continueButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    }
});
