import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Seja Bem-Vindo à</Text>
      <Text style={styles.subtitulo}>Gaia</Text>
      <TouchableOpacity style={styles.botao}>
        <Text style={styles.textoBotao}>Cadastrar-se</Text>
      </TouchableOpacity>
      <Text style={styles.text}>Já possui cadastro? Entre</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:30,
    backgroundColor: '#56A829',
    justifyContent: 'center',
  },
  titulo: {
    fontSize:39,
    color:'#1F1F1F',
    fontWeight:'bold'

  },
  subtitulo: {
    fontSize:50,
    color:'#CBE3BF',
    fontWeight:'bold'
  },
  botao: {
    backgroundColor: '#1F1F1F',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
    elevation: 3,
    top:100
  },
  textoBotao: {
    color: '#CBE3BF',
    fontSize: 16,
    fontWeight: '600',
    textAlign:'center'
  },
  text:{
    color: '#CBE3BF',
    fontWeight: '600',
    fontSize: 15,
    top:110,
    textAlign:'center'
  }
});
