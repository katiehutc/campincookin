import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform, Image } from "react-native";
import { useRouter } from "expo-router";

const SCREEN_WIDTH = 393;
const SCREEN_HEIGHT = 852;

export default function IngredientsScreen() {
    const router = useRouter();

    // State for toggle buttons
    const [ingredients, setIngredients] = useState({
        hotdog: false,
        corn: false,
        potato: false,
    });

    // Toggle function
    const toggleIngredient = (ingredient) => {
        setIngredients(prevState => ({
            ...prevState,
            [ingredient]: !prevState[ingredient]
        }));
    };

    // Continue handler
    const handleContinue = () => {
        // Convert boolean values to 0/1
        const ingredientsData = Object.keys(ingredients).reduce((acc, key) => {
            acc[key] = ingredients[key] ? 1 : 0;
            return acc;
        }, {});

        console.log("Selected ingredients:", ingredientsData);

        // Navigate to preference screen and pass the data
        router.push({
            pathname: "/preference",
            params: { ingredients: JSON.stringify(ingredientsData) }
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select ingredients:</Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, ingredients.hotdog && styles.buttonActive]}
                    onPress={() => toggleIngredient('hotdog')}
                >
                    <Text style={[styles.buttonText, ingredients.hotdog && styles.buttonTextActive]}>
                        Hot dog
                    </Text>
                    <Image
                        source={require('../../images/ingreds/Sausage.png')}
                        style={styles.image}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, ingredients.corn && styles.buttonActive]}
                    onPress={() => toggleIngredient('corn')}
                >
                    <Image
                        source={require('../../images/ingreds/corn.png')}
                        style={styles.image}
                    />
                    <Text style={[styles.buttonText, ingredients.corn && styles.buttonTextActive]}>
                        Corn
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, ingredients.potato && styles.buttonActive]}
                    onPress={() => toggleIngredient('potato')}
                >
                    <Image
                        source={require('../../images/ingreds/Potato.png')}
                        style={styles.image}
                    />
                    <Text style={[styles.buttonText, ingredients.potato && styles.buttonTextActive]}>
                        Potato
                    </Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={styles.continueButton}
                onPress={handleContinue}
            >
                <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        ...Platform.select({
            web: {
                maxWidth: SCREEN_WIDTH,
                maxHeight: SCREEN_HEIGHT,
                alignSelf: 'center',
            }
        })
    },
    title: {
        fontSize: 24,
        marginBottom: 40,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 40,
    },
    button: {
        backgroundColor: '#f0f0f0',
        padding: 15,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
        marginBottom: 15,
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
        marginTop: 5,  // Added spacing for text under the image
    },
    buttonTextActive: {
        color: 'white',
        fontWeight: 'bold',
    },
    image: {
        width: 50,  // Adjust size as needed
        height: 50,
        marginBottom: 5,
    },
    continueButton: {
        backgroundColor: '#2196F3',
        padding: 15,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
        marginTop: 20,
    },
    continueButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    }
});
