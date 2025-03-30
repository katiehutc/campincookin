import React, {useState} from 'react';
import {
    View, Text, TouchableOpacity, StyleSheet, Platform, Image, ScrollView
} from "react-native";
import {useRouter} from "expo-router";
import {Audio} from 'expo-av';

const SCREEN_WIDTH = 393;
const SCREEN_HEIGHT = 852;

const ingredientsList = [
    {name: 'corn', label: 'Corn', image: require('../../images/ingreds/corn.png')},
    {name: 'potato', label: 'Potato', image: require('../../images/ingreds/Potato.png')},
    {name: 'bok_choy', label: 'Bok Choy', image: require('../../images/ingreds/Bok_Choy.png')},
    {name: 'bread', label: 'Bread', image: require('../../images/ingreds/Bread.png')},
    {name: 'lettuce', label: 'Lettuce', image: require('../../images/ingreds/Lettuce.png')},
    {name: 'broccoli', label: 'Broccoli', image: require('../../images/ingreds/Broccoli.png')},
    {name: 'carrot', label: 'Carrot', image: require('../../images/ingreds/Carrot.png')},
    {name: 'cauliflower', label: 'Cauliflower', image: require('../../images/ingreds/Cauliflower.png')},
    {name: 'flour', label: 'Flour', image: require('../../images/ingreds/Flour.png')},
    {name: 'mayo', label: 'Mayonnaise', image: require('../../images/ingreds/Mayonnaise.png')},
    {name: 'cheese', label: 'Cheese', image: require('../../images/ingreds/Cheese.png')},
    {name: 'egg', label: 'Egg', image: require('../../images/ingreds/Egg.png')},
    {name: 'garlic', label: 'Garlic', image: require('../../images/ingreds/Garlic.png')},
    {name: 'eggplant', label: 'Eggplant', image: require('../../images/ingreds/Eggplant.png')},
    {name: 'milk', label: 'Milk', image: require('../../images/ingreds/Milk.png')},
    {name: 'hotdog', label: 'Hot Dog', image: require('../../images/ingreds/Sausage.png')},
    {name: 'chicken', label: 'Chicken', image: require('../../images/ingreds/Chicken.png')},
    {name: 'green bean', label: 'Green Bean', image: require('../../images/ingreds/Green_Bean.png')},
    {name: 'green pickes', label: 'Green Pickles', image: require('../../images/ingreds/Green_Pickles.png')},
    {name: 'hot pepper', label: 'Hot Pepper', image: require('../../images/ingreds/Hot_Pepper.png')},
    {name: 'mushroom', label: 'Mushroom', image: require('../../images/ingreds/Mushroom.png')},
    {name: 'onion', label: 'Onion', image: require('../../images/ingreds/Onion.png')},
    {name: 'butter', label: 'Butter', image: require('../../images/ingreds/Butter.png')},
    {name: 'radish', label: 'Radish', image: require('../../images/ingreds/Radish.png')},
    {name: 'red cabbage', label: 'Red Cabbage', image: require('../../images/ingreds/Red_Cabbage.png')},
    {name: 'rice', label: 'Rice', image: require('../../images/ingreds/Rice.png')},
    {name: 'squash', label: 'Squash', image: require('../../images/ingreds/Squash.png')},
    {name: 'tomato', label: 'Tomato', image: require('../../images/ingreds/Tomato.png')},
    {name: 'tortilla', label: 'Tortilla', image: require('../../images/ingreds/Tortilla.png')},
    {name: 'spinach', label: 'Spinach', image: require('../../images/ingreds/Spinach.png')},
];

export default function IngredientsScreen() {
    const router = useRouter();

    //handle buttons and scrolling
    const [showButtons, setShowButtons] = useState(false);

    const handleScroll = (event) => {
        const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;
        const isBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20; // Adjust if needed
        setShowButtons(isBottom);
    };

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

    // State for toggling ingredients
    const [ingredients, setIngredients] = useState(
        ingredientsList.reduce((acc, item) => ({...acc, [item.name]: false}), {})
    );

    const toggleIngredient = (ingredient: string) => {
        playSound();
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
            params: {ingredients: JSON.stringify(ingredientsData)}
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select ingredients:</Text>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {Array.from({length: Math.ceil(ingredientsList.length / 3)}, (_, rowIndex) => (
                    <View key={rowIndex} style={styles.row}>
                        {ingredientsList.slice(rowIndex * 3, rowIndex * 3 + 3).map((item) => (
                            <TouchableOpacity
                                key={item.name}
                                style={[styles.button, ingredients[item.name] && styles.buttonActive]}
                                onPress={() => toggleIngredient(item.name)}
                            >
                                <Image source={item.image} style={styles.image}/>
                                <Text style={[styles.buttonText, ingredients[item.name] && styles.buttonTextActive]}>
                                    {item.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}

                <View style={{ height: 40 }} />

                <TouchableOpacity style={styles.continueButton} onPress={() => {
                    playSound();
                    handleContinue();
                }}>
                    <Image source={require('../../images/home/continue.png')} style={styles.continueButtonImage}/>
                </TouchableOpacity>
            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        padding: 20,
        backgroundColor: '#FFFACD',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: Platform.OS === 'ios' ? 'Comic Sans MS' : 'ComicSansMS',
    },
    scrollContainer: {
        alignItems: 'center',
        paddingBottom: 100, // Ensures scrolling space
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#ADD8E6',
        padding: 0,
        borderRadius: 10,
        width: '25%',
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    buttonActive: {
        backgroundColor: '#6BADCE',
        borderColor: '#388E3C',
    },
    buttonText: {
        fontSize: 16,
        color: '#333',
        alignItems: 'center',
        textAlign: 'center',
        marginTop: 5,
        fontFamily: Platform.OS === 'ios' ? 'Comic Sans MS' : 'ComicSansMS',
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
        width: '150%',
        height: undefined,
        aspectRatio: 3,
        resizeMode: 'contain',
    },
});