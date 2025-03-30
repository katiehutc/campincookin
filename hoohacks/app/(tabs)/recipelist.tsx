import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView, ImageBackground, TouchableOpacity} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';


const SCREEN_WIDTH = 393;
const SCREEN_HEIGHT = 852;

export default function RecipeListScreen() {
    const params = useLocalSearchParams();
    const router = useRouter();
    const recipes = params.recipes ? JSON.parse(params.recipes as string) : [];



    return (
        <ImageBackground
            source={require('../../images/recipeback.png')}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {recipes.map((recipe: any, index: number) => (
                    <View key={index} style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => router.push({
                                pathname: "/recipepage",
                                params: {
                                    recipe: JSON.stringify(recipe),
                                    recipes: JSON.stringify(recipes)
                                }
                            })}
                        >
                            <Text style={styles.buttonText}>{recipe.title.toLowerCase()}</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 230
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#F2CA5CFF', // You can keep the title color as you like
    },
    scrollContainer: {
        padding: 20,
        alignItems: 'center',
    },
    buttonContainer: {
        marginVertical: 10,
        width: '100%',
        borderRadius: 60
    },
    button: {
        backgroundColor: '#003366', // Dark blue color
        borderRadius: 30, // Rounded corners
        paddingVertical: 15,
        paddingHorizontal: 30,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'lowercase', // Ensure text is lowercase
        textAlign: "center"
    },
});