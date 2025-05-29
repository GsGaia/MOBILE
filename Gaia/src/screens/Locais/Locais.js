import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

export default function Locais() {
  const locaisRisco = [
    { id: 1, nome: 'Bairro das Flores', nivel: 'Alto' },
    { id: 2, nome: 'Vila Esperança', nivel: 'Médio' },
    { id: 3, nome: 'Rua São Pedro', nivel: 'Alto' },
    { id: 4, nome: 'Jardim Bela Vista', nivel: 'Baixo' },
    { id: 5, nome: 'Travessa do Norte', nivel: 'Médio' },
  ];

  return (
    <View style={styles.container}>
      <Header/>
        <Text style={styles.titulo}>Locais em Risco</Text>
      <ScrollView contentContainerStyle={styles.lista}>
        {locaisRisco.map((local) => (
          <View key={local.id} style={styles.card}>
            <Text style={styles.nome}>{local.nome}</Text>
            <Text style={[styles.nivel, getNivelStyle(local.nivel)]}>
              Nível: {local.nivel}
            </Text>
          </View>
        ))}
      </ScrollView>

      <Footer />
    </View>
  );
}

function getNivelStyle(nivel) {
  switch (nivel) {
    case 'Alto':
      return { color: '#ff4d4d' };
    case 'Médio':
      return { color: '#f9c74f' };
    case 'Baixo':
      return { color: '#90be6d' };
    default:
      return { color: '#fff' };
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#56A829',
    paddingTop: 160,
    
  },
  titulo:{
    fontSize:25,
    textAlign:'center',
    marginBottom:10,
    fontWeight:'bold',
    color: '#CBE3BF'
  },
  lista: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#1F1F1F',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#CBE3BF',
  },
  nivel: {
    marginTop: 5,
    fontSize: 14,
  },
});
