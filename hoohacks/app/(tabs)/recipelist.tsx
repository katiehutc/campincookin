import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function RecipeListScreen() {
    const params = useLocalSearchParams();
    const router = useRouter();
    const recipes = params.recipes ? JSON.parse(params.recipes as string) : [];


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Recipe List</Text>
            {recipes.map((recipe: any, index: number) => (
                <View key={index} style={styles.buttonContainer}>
                    <Button
                        title={recipe.title}
                        onPress={() => router.push({
                            pathname: "/recipepage",
                            params: {
                                recipe: JSON.stringify(recipe),
                                recipes: JSON.stringify(recipes) // Pass the entire list
                            }
                        })}
                    />

                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20, alignItems: 'center' },
    title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
    buttonContainer: { marginVertical: 10, width: '100%' },
});
