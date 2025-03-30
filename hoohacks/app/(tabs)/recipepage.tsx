import React from 'react';
import { Text, StyleSheet, ScrollView, TouchableOpacity, Image, ImageBackground, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

const SCREEN_WIDTH = 393;
const SCREEN_HEIGHT = 852;

export default function RecipePageScreen() {
    const params = useLocalSearchParams();
    const router = useRouter();
    const recipe = params.recipe ? JSON.parse(params.recipe as string) : null;

    if (!recipe) return <Text style={styles.noRecipeText}>No recipe found.</Text>;

    const handleRestart = () => {
        router.replace({ pathname: "/", params: { reset: "true" } });
    };

    return (
        <ImageBackground
            source={require('../../images/backrecipepage.png')}
            style={styles.container}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                horizontal={false} // Prevents side scrolling
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.title}>{recipe.title}</Text>
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

                {/* Button Container */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => router.replace({ pathname: '/recipelist', params: { recipes: params.recipes } })}
                    >
                        <Image source={require('../../images/home/back.png')} style={styles.backButton} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleRestart}>
                        <Image source={require('../../images/restart.png')} style={styles.restartButton} />
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
    },
    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
        paddingVertical: 20,
        width: '100%', // Ensures no horizontal scrolling
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        fontFamily: 'Comic Sans MS',
        color: '#003366'
    },
    detail: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        fontFamily: 'Comic Sans MS',
        color: '#003366'
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 10,
        fontFamily: 'Comic Sans MS',
        color: '#003366'
    },
    text: {
        fontSize: 16,
        marginVertical: 2,
        fontFamily: 'Comic Sans MS',
        color: '#003366'
    },
    noRecipeText: {
        fontSize: 20,
        textAlign: 'center',
        color: '#003366',
        marginTop: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        marginVertical: 20,
    },
    backButton: {
        width: 100,
        height: 100,
    },
    restartButton: {
        width: 100,
        height: 100,
    },
});

