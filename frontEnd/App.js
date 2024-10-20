import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, ScrollView, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { PanGestureHandler } from 'react-native-gesture-handler';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

// Main Menu Screen
function MainMenuScreen({ navigation }) {
  return (
    <View style={styles.mainMenuContainer}>
      <Text style={styles.title}>Alphabet Learning App</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Start (A)"
          onPress={() => navigation.navigate('Alphabet', { letter: 'A' })}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Selection"
          onPress={() => navigation.navigate('Home')}
        />
      </View>
    </View>
  );
}

// Home Screen to display alphabet letters
function HomeScreen({ navigation }) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {alphabet.map((letter) => (
          <View key={letter} style={styles.letterContainer}>
            <Text
              style={styles.letter}
              onPress={() => navigation.navigate('Alphabet', { letter })}
            >
              {letter}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

// Alphabet Detail screen with swipe feature
function AlphabetDetailScreen({ route }) {
  const { letter: initialLetter } = route.params;
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const [currentLetterIndex, setCurrentLetterIndex] = useState(alphabet.indexOf(initialLetter));

  const wordImageMap = {
    A: { word: 'Apple', image: require('./assets/apple.png') },
    B: { word: 'Banana', image: require('./assets/banana.png') },
    C: { word: 'Cat', image: require('./assets/cat.png') },
    D: { word: 'Dog', image: require('./assets/dog.png') },
    E: { word: 'Elephant', image: require('./assets/elephant.png') },
    F: { word: 'Fish', image: require('./assets/fish.png') },
    G: { word: 'Giraffe', image: require('./assets/giraffe.png') },
    H: { word: 'Horse', image: require('./assets/horse.png') },
    I: { word: 'Ice Cream', image: require('./assets/ice_cream.png') },
    J: { word: 'Juice', image: require('./assets/juice.png') },
    K: { word: 'Kite', image: require('./assets/kite.png') },
    L: { word: 'Lion', image: require('./assets/lion.png') },
    M: { word: 'Monkey', image: require('./assets/monkey.png') },
    N: { word: 'Nest', image: require('./assets/nest.png') },
    O: { word: 'Orange', image: require('./assets/orange.png') },
    P: { word: 'Penguin', image: require('./assets/penguin.png') },
    Q: { word: 'Queen', image: require('./assets/queen.png') },
    R: { word: 'Rabbit', image: require('./assets/rabbit.png') },
    S: { word: 'Sun', image: require('./assets/sun.png') },
    T: { word: 'Tiger', image: require('./assets/tiger.png') },
    U: { word: 'Umbrella', image: require('./assets/umbrella.png') },
    V: { word: 'Violin', image: require('./assets/violin.png') },
    W: { word: 'Whale', image: require('./assets/whale.png') },
    X: { word: 'Xylophone', image: require('./assets/xylophone.png') },
    Y: { word: 'Yacht', image: require('./assets/yacht.png') },
    Z: { word: 'Zebra', image: require('./assets/zebra.png') },
  };

  const onSwipe = (event) => {
    const { translationX } = event.nativeEvent;
    if (translationX < -50 && currentLetterIndex < alphabet.length - 1) {
      setCurrentLetterIndex(currentLetterIndex + 1);
    } else if (translationX > 50 && currentLetterIndex > 0) {
      setCurrentLetterIndex(currentLetterIndex - 1);
    }
  };

  const currentLetter = alphabet[currentLetterIndex];
  const { word, image } = wordImageMap[currentLetter];

  return (
    <PanGestureHandler onGestureEvent={onSwipe}>
      <ScrollView contentContainerStyle={styles.detailContainer}>
        <View style={styles.topCenterLetter}>
          <Text style={styles.letterTopCenter}>{currentLetter}</Text>
        </View>
        <View style={styles.wordContainer}>
          <Image source={image} style={styles.image} />
          <Text style={styles.wordText}>{word}</Text>
        </View>
      </ScrollView>
    </PanGestureHandler>
  );
}

// Stack Navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainMenu">
        <Stack.Screen name="Main Menu" component={MainMenuScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Alphabet" component={AlphabetDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  letterContainer: {
    width: screenWidth / 4.5,
    height: screenWidth / 4.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000',
    margin: 10,
  },
  letter: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  detailContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  topCenterLetter: {
    position: 'absolute',
    top: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  letterTopCenter: {
    fontSize: 60,
    fontWeight: 'bold',
  },
  wordContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  wordText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  mainMenuContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  buttonContainer: {
    marginVertical: 15,
    width: '70%',
  },
});
