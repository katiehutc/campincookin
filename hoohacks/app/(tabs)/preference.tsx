import React, { useState } from 'react';
import { View, StyleSheet, Platform, TouchableOpacity, Image} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {Audio} from 'expo-av';

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

    //plays sound on click
    const playSound = async () => {
        try {
            console.log("Loading sound...");
            const {sound} = await Audio.Sound.createAsync(
                require('../../sounds/click.wav'),
                {shouldPlay: true}
            );

            console.log("Playing sound...");
            await sound.playAsync();

            sound.setOnPlaybackStatusUpdate(status => {
                if ('didJustFinish' in status && status.didJustFinish) {
                    console.log("Sound finished playing");
                    sound.unloadAsync();
                }
            });
        } catch (error) {
            console.error("Error playing sound:", error);
        }
    };

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

            <Image
                source={require('../../images/home/Preferences3.jpg')}
                style={styles.titleImage}
                resizeMode="contain"
            />

            <Image
                source={require('../../images/home/chooseRecipe.jpeg')}
                style={styles.chooseImage}
                resizeMode="contain"
            />

            <View style={{ height: 30 }} />

            <TouchableOpacity style={[styles.button, recipeType.type1 && styles.typeButtonActive]} onPress={() => {
                playSound();
                toggleRecipeType('type1');
                handleGenerate();
            }}>
                <Image source={require('../../images/home/quick.jpg')} style={styles.buttonImage}/>
            </TouchableOpacity>

            <View style={{ height: 10 }} />

            <TouchableOpacity style={[styles.button, recipeType.type2 && styles.typeButtonActive]} onPress={() => {
                playSound();
                toggleRecipeType('type2');
                handleGenerate();
            }}>
                <Image source={require('../../images/home/healthy.jpg')} style={styles.buttonImage}/>
            </TouchableOpacity>

            <View style={{ height: 10 }} />

            <TouchableOpacity style={[styles.button, recipeType.type3 && styles.typeButtonActive]} onPress={() => {
                playSound();
                toggleRecipeType('type3');
                handleGenerate();
            }}>
                <Image source={require('../../images/home/unique.jpg')} style={styles.buttonImage}/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.continueButton} onPress={() => {
                playSound();
                //handleContinue();
            }}>
                <Image source={require('../../images/home/continue.png')} style={styles.continueButtonImage}/>
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
        }),
        backgroundColor: '#FFB5B5FF',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        fontFamily: Platform.OS === 'ios' ? 'Comic Sans MS' : 'ComicSansMS',
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
        fontFamily: Platform.OS === 'ios' ? 'Comic Sans MS' : 'ComicSansMS',
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
        fontFamily: Platform.OS === 'ios' ? 'Comic Sans MS' : 'ComicSansMS',
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
        backgroundColor: 'transparent',
        borderColor: '#F57C00',
    },
    typeButtonText: {
        fontSize: 16,
        color: '#333',
        fontFamily: Platform.OS === 'ios' ? 'Comic Sans MS' : 'ComicSansMS',
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
    },
    titleImage:{
        width: 381,
        height: 223,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    chooseImage:{
        width: 194,
        height: 104,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    button: {
        backgroundColor: 'transparent',
        padding: 0,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
        alignSelf: 'center',
        bottom: 30,
    },
    buttonImage: {
        width: 126,
        height: 63,
        aspectRatio: 3,
        resizeMode: 'contain',
    },
    continueButton: {
        backgroundColor: 'transparent',
        padding: 0,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
        alignSelf: 'center',
        position: 'absolute',
        bottom: 30,
    },
    continueButtonImage: {
        width: '100%',
        height: undefined,
        aspectRatio: 3,
        resizeMode: 'contain',
    },
});