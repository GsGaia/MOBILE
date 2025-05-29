import React, { useState } from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

export default function Doar() {
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');

  const salvarAlimento = async () => {
    if (!nome || !quantidade) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }

    try {
      const alimento = { nome, quantidade };
      const dadosExistentes = await AsyncStorage.getItem('alimentos');
      const alimentos = dadosExistentes ? JSON.parse(dadosExistentes) : [];

      alimentos.push(alimento);
      await AsyncStorage.setItem('alimentos', JSON.stringify(alimentos));

      Alert.alert('Sucesso', 'Alimento cadastrado com sucesso!');
      setNome('');
      setQuantidade('');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar os dados.');
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.titulo}>Cadastrar Doação</Text>

      <TextInput
        placeholder="Nome do alimento"
        placeholderTextColor="#1F1F1F"
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        placeholder="Quantidade"
        placeholderTextColor="#1F1F1F"
        style={styles.input}
        value={quantidade}
        onChangeText={setQuantidade}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.botao} onPress={salvarAlimento}>
        <Text style={styles.botaoTexto}>Salvar</Text>
      </TouchableOpacity>

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#56A829',
    paddingTop: 160,
  },
  titulo: {
    fontSize: 22,
    color: '#1F1F1F',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#CBE3BF',
    padding: 15,
    borderRadius: 8,
    margin: 15,
    color: '#1F1F1F',
  },
  botao: {
    backgroundColor: '#1F1F1F',
    padding: 14,
    margin: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#CBE3BF',
    fontWeight: 'bold',
  },
});
