import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface ResultScreenProps {
  route: {
    params: {
      loser: string | null;
    };
  };
  resetGame: () => void; // Add resetGame prop
}

const ResultScreen: React.FC<ResultScreenProps> = ({ route, resetGame }) => {
  const { loser } = route.params;
  const navigation: any = useNavigation();
  return (
    <View style={styles.container}>
      {/* Display the GIF image */}
      <Image
        source={require('../assets/gifs/evil_laugh.gif')}
        style={styles.gifImage}
      />

      <Text style={styles.resultText}>
        {loser ? `${loser} will pay the bills!` : 'No loser!'}
      </Text>

      <TouchableOpacity style={styles.buttonContainer} onPress={()=>navigation.navigate('Game')}>
        <MaterialIcons name="replay" size={24} color="white" />
        <Text style={styles.buttonText}>Play Again</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
  },
  gifImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  resultText: {
    fontSize: 24,
    color: '#5B1647',
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#5B1647',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
  },
});

export default ResultScreen;
