import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { GoogleGenAI } from '@google/genai';
import Constants from 'expo-constants';

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
                    contents: `Generate 3 recipes that can be made while camping (minimal ingredients). 
                               Include the title, calories, cooking time, ingredient list, and instructions. 
                               The ingredients I have are ${selectedIngredientsString}, and I would like it to be ${recipeTypeText[recipeType]}. 
                               Put it in JSON format.`
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
            <Text style={styles.title}>Generating Recipes</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <Button
                    title="View Recipes"
                    onPress={() => router.push({ pathname: "/recipelist", params: { recipes: JSON.stringify(recipes) } })}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
});
