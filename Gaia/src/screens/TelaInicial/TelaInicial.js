import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';


export default function Home({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header/>
      <Text style={styles.titulo}>Bem-vindo à Gaia!</Text>
      <Text style={styles.subtitulo}>
        Aqui você acompanha locais com risco de fortes chuvas e pode ajudar com doações.
      </Text>

      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Locais')}>
        <MaterialIcons name="warning" size={24} color="#CBE3BF" />
        <Text style={styles.botaoTexto}>Ver Locais em Risco</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('CadastroAlimentos')}>
        <MaterialIcons name="add-shopping-cart" size={24} color="#CBE3BF" />
        <Text style={styles.botaoTexto}>Cadastrar Alimentos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Doacoes')}>
        <MaterialIcons name="list-alt" size={24} color="#CBE3BF" />
        <Text style={styles.botaoTexto}>Ver Doações</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Ajuda')}>
        <MaterialIcons name="help-outline" size={24} color="#CBE3BF" />
        <Text style={styles.botaoTexto}>Como Ajudar</Text>
      </TouchableOpacity>
      <Footer/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    backgroundColor: '#56A829',
    flexGrow: 1,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#CBE3BF',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 16,
    color: '#1F1E1E',
    marginBottom: 30,
    textAlign: 'center',
  },
  botao: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F1E1E',
    padding: 15,
    borderRadius: 10,
    margin: 10,
  },
  botaoTexto: {
    color: '#CBE3BF',
    fontSize: 16,
    marginLeft: 10,
    fontWeight:'light'
  },
});
