import { View, Text, StyleSheet } from 'react-native';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';


export default function TelaInicial() {
  return (
    <View style={styles.container}>
        <Header />
        <Text style={styles.title}>Bem-vindo à Tela Inicial!</Text>
        <Text style={styles.subtitle}>Você está logado com sucesso.</Text>
        <Footer/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#56A829',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
  },
});
