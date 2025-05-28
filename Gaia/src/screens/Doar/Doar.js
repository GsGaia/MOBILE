import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

export default function Doar() {
  const [alimento, setAlimento] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [local, setLocal] = useState('');

  const handleCadastro = () => {
    if (!alimento || !quantidade || !local) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    Alert.alert('Sucesso', `Alimento "${alimento}" cadastrado com sucesso!`);
    setAlimento('');
    setQuantidade('');
    setLocal('');
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>

        <Text style={styles.titulo}>Cadastro de Alimentos</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome do alimento"
          placeholderTextColor="#ccc"
          value={alimento}
          onChangeText={setAlimento}
        />

        <TextInput
          style={styles.input}
          placeholder="Quantidade"
          placeholderTextColor="#ccc"
          value={quantidade}
          onChangeText={setQuantidade}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          placeholder="Local de entrega"
          placeholderTextColor="#ccc"
          value={local}
          onChangeText={setLocal}
        />

        <TouchableOpacity style={styles.botao} onPress={handleCadastro}>
          <Text style={styles.textoBotao}>Cadastrar</Text>
        </TouchableOpacity>

      </ScrollView>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#56A829',
  },
  content: {
    paddingTop: 180,
    paddingBottom: 100,
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#CBE3BF',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#1F1F1F',
    color: '#fff',
    padding: 12,
    marginBottom: 15,
    borderRadius: 10,
  },
  botao: {
    backgroundColor: '#1F1F1F',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBotao: {
    color: '#CBE3BF',
    fontWeight: 'bold',
  },
});
