import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Animated,
} from 'react-native';
import {SkeletonLayout} from 'react-native-skeleton-loader-pulse';
import  EvilIcons  from 'react-native-vector-icons/EvilIcons'; 
import  MaterialIcons  from 'react-native-vector-icons/MaterialIcons'; 
import  FontAwesome  from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icon
import { useNavigation } from '@react-navigation/native';

const GameScreen: React.FC = () => {
  const [playerName, setPlayerName] = useState<string>('');
  const [playerNames, setPlayerNames] = useState<string[]>([]); // Ensure playerNames is an array of strings
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loser, setLoser] = useState<string | null>(null);
  const [indicatorVisible, setIndicatorVisible] = useState<boolean>(false);
  const [showResult, setShowResult] = useState<boolean>(false);
  const navigation: any = useNavigation();

  const pulseValue = new Animated.Value(1);

  useEffect(() => {
    if (indicatorVisible) {
      const timer = setTimeout(() => {
        if (playerNames.length > 1) {
          const randomIndex = Math.floor(Math.random() * playerNames.length);
          setLoser(playerNames[randomIndex]);
          navigation.navigate('Result', { loser: playerNames[randomIndex] }); // Pass the loser's name as a parameter
        }
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [indicatorVisible, playerNames]);
  


  const handleStartGame = () => {
    setLoser(null);
    setIndicatorVisible(true);
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseValue, {
          toValue: 1.1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseValue, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const handleAddPlayer = () => {
    if (playerName.trim() !== '') {
      setPlayerNames([...playerNames, playerName]);
      setPlayerName('');
      setErrorMessage(''); // Clear the error message
    } else {
      setErrorMessage("You need to type a player's name");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Text style={styles.title}>
        <MaterialIcons name="attach-money" size={24} color="#5B1647" /> Who pays the bill
      </Text>
      {!indicatorVisible && (
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter player's name"
            value={playerName}
            onChangeText={(text) => setPlayerName(text)}
            style={styles.input}
          />
          <TouchableOpacity onPress={handleAddPlayer} style={styles.addButton}>
            <Text style={styles.buttonText}>Add Player</Text>
          </TouchableOpacity>
        </View>
      )}
       {errorMessage !== '' && (
        <Text style={styles.errorText}>{errorMessage}</Text>
      )}
      {indicatorVisible ? (
        showResult ? null : (
          <SkeletonLayout
            align="center"
            items={[
              {
                borderRadius: 100,
                height: 80,
                marginBottom: 15,
                width: 80,
              },
              {
                height: 20,
                marginBottom: 10,
                width: 200,
              },
              {
                height: 8,
                width: 220,
              },
              {
                height: 8,
                width: 250,
              },
              {
                height: 8,
                width: 230,
              },
            ]}
          />
        )
      ) : (
        <TouchableOpacity
          onPress={handleStartGame}
          disabled={playerNames.length < 2}
          style={[
            styles.startButton,
            { backgroundColor: playerNames.length < 2 ? '#999' : '#5B1647' },
          ]}
        >
          <Text style={styles.buttonText}>
            <EvilIcons name="play" size={18} color="white" /> Start Game
          </Text>
        </TouchableOpacity>
      )}


      {playerNames.length > 0 && (
      <View style={styles.enteredNamesContainer}>
      <Text style={styles.enteredNamesTitle}>Entered Players:</Text>
      {playerNames.map((name, index) => (
        <View key={index} style={styles.playerContainer}>
          <FontAwesome name="user-circle" size={20} color="#333" style={styles.userIcon} /> 
          <Text style={styles.enteredName}>
            {name}
          </Text>
        </View>
      ))}
    </View>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#5B1647',
  },
  inputContainer: {
    marginBottom: 20,
    width: '80%',
  },
  input: {
    borderColor: '#5B1647',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 10,
    borderRadius: 5,
    color: '#333',
  },
  addButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#5B1647',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
  startButton: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  enteredNamesContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  enteredNamesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#5B1647',
  },
  enteredName: {
    fontSize: 14,
    color: '#333',
  },
  playerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  userIcon: {
    marginRight: 5,
  },
});

export default GameScreen;
