import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, ActivityIndicator, Button, Image, Platform} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { GoogleGenAI } from '@google/genai';
import Constants from 'expo-constants';

const SCREEN_WIDTH = 393;
const SCREEN_HEIGHT = 852;

const GEMINI_API_KEY = Constants.expoConfig?.extra?.geminiApiKey || "MYAPIKEY";
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export default function GenerateScreen() {
    const params = useLocalSearchParams();
    const router = useRouter();
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    // Parse the passed data
    const data = params.data ? JSON.parse(params.data as string) : null;
    const ingredientsData = data?.ingredients || {};
    const recipeType = data?.recipeType || 0;

    const selectedIngredientsString = Object.keys(ingredientsData)
        .filter(key => ingredientsData[key] === 1)
        .join(', ');

    const recipeTypeText = {
        1: "Quick and Easy",
        2: "Healthy",
        3: "Unique",
        0: "No preference selected"
    };

    useEffect(() => {
        async function fetchAIResponse() {
            try {
                const response = await ai.models.generateContent({
                    model: "gemini-2.0-flash",
                    contents: `Generate 3 recipes that can be made while camping with minimal ingredients. 
               The ingredients I have are ${selectedIngredientsString}. 
               Please include the following in your response: 
               - Title of the recipe
               - Calories (if available)
               - Cooking time
               - A **detailed list** of ingredients
               - Step-by-step instructions
               The recipe should be ${recipeTypeText[recipeType]}. 
               Format the response in **JSON** with the following structure:
               {
                   "title": "Recipe Name",
                   "calories": "Calories",
                   "cookingTime": "Cooking time",
                   "ingredients": ["ingredient1", "ingredient2", ...],
                   "instructions": ["step1", "step2", ...]
               }`
                });

                const rawText = response.text || "[]";
                const jsonMatch = rawText.match(/```json\n([\s\S]*?)\n```/);
                const jsonData = jsonMatch ? jsonMatch[1] : rawText;
                const parsedRecipes = JSON.parse(jsonData);

                setRecipes(parsedRecipes);
            } catch (error) {
                console.error("Error generating AI response:", error);
                setRecipes([]);
            } finally {
                setLoading(false);
            }
        }

        fetchAIResponse();
    }, []);

    return (
        <View style={styles.container}>
            {loading ? (
                <View style={styles.view}>
                <Text style={styles.title}>generating recipes!</Text>
                <Image
                    source={require('../../images/fire.gif')}
                    style={styles.gif}
                />
                </View>
            ) : (
                <View>
                    <Text style={styles.title}>done!</Text>
                <Button
                    style = {styles.button}
                    title="View Recipes"
                    onPress={() => router.push({ pathname: "/recipelist", params: { recipes: JSON.stringify(recipes) } })}
                />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        backgroundColor: '#322947FF',
        padding: 20, justifyContent: 'center', alignItems: 'center' },
    view: {
        justifyContent: 'center',alignItems: 'center'
    },
    title: { fontSize: 28,  marginBottom: 20, textAlign: 'center',
        fontFamily: Platform.OS === 'ios' ? 'Comic Sans MS' : 'ComicSansMS',
    color: '#F2CA5CFF'},
    gif: {
        width: 100,
        height: 100,
    },
    button:{
        backgroundColor: '#F2CA5CFF',
        fontFamily: Platform.OS === 'ios' ? 'Comic Sans MS' : 'ComicSansMS',
    }
});
