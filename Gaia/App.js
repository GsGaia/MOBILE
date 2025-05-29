import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import Login from './src/screens/Login/Login';
import Entrar from './src/screens/Entrar/Entrar';
import TelaInicial from './src/screens/TelaInicial/TelaInicial';
import Doar from './src/screens/Doar/Doar';
import Locais from './src/screens/Locais/Locais';
import Doacoes from './src/screens/Doacoes/Doacoes';
import Ajuda from './src/screens/Ajuda/Ajuda';
import Perfil from './src/screens/Perfil/Perfil';
import LoadingScreen from './src/screens/LoadingScreen/LoadingScreen';

const Stack = createNativeStackNavigator();

function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Seja Bem-Vindo à</Text>
      <Text style={styles.subtitulo}>Gaia</Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.textoBotao}>Cadastrar-se</Text>
      </TouchableOpacity>

      <Text style={styles.text}>
        Já possui cadastro?{' '}
        <Text
          style={styles.link}
          onPress={() => navigation.navigate('Entrar')}
        >
          Entre
        </Text>
      </Text>

      <StatusBar style="light" />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoadingScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Entrar" component={Entrar} />
        <Stack.Screen name="TelaInicial" component={TelaInicial} />
        <Stack.Screen name="Doar" component={Doar} />
        <Stack.Screen name="Locais" component={Locais} />
        <Stack.Screen name="Doacoes" component={Doacoes} />
        <Stack.Screen name="Ajuda" component={Ajuda} />
        <Stack.Screen name="Perfil" component={Perfil} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#56A829',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 39,
    color: '#1F1F1F',
    fontWeight: 'bold',
  },
  subtitulo: {
    fontSize: 50,
    color: '#CBE3BF',
    fontWeight: 'bold',
  },
  botao: {
    backgroundColor: '#1F1F1F',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
    elevation: 3,
    top: 100,
  },
  textoBotao: {
    color: '#CBE3BF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  text: {
    color: '#CBE3BF',
    fontWeight: '600',
    fontSize: 15,
    top: 110,
    textAlign: 'center',
  },
  link: {
    color: '#1F1F1F',
  },
});
