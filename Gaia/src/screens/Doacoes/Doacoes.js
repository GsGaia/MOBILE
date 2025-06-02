// Doacoes.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

export default function Doacoes() {
  const [dados, setDados] = useState({
    alimentos: [],
    roupas: [],
    remedios: [],
  });

  const carregarDados = async () => {
    const categorias = ['alimentos', 'roupas', 'remedios'];
    const novasDoacoes = {};

    for (const cat of categorias) {
      const json = await AsyncStorage.getItem(cat);
      novasDoacoes[cat] = json ? JSON.parse(json) : [];
    }

    setDados(novasDoacoes);
  };

  useFocusEffect(
    React.useCallback(() => {
      carregarDados();
    }, [])
  );

  const renderCategoria = (titulo, lista) => (
    <View key={titulo}>
      <Text style={styles.subtitulo}>{titulo}</Text>
      {lista.length === 0 ? (
        <Text style={styles.semDados}>Nenhuma doação cadastrada.</Text>
      ) : (
        lista.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.quantidade}>Quantidade: {item.quantidade}</Text>
          </View>
        ))
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.titulo}>Doações Recebidas</Text>

      <ScrollView contentContainerStyle={styles.lista}>
        {renderCategoria('Alimentos', dados.alimentos)}
        {renderCategoria('Roupas', dados.roupas)}
        {renderCategoria('Remédios', dados.remedios)}
      </ScrollView>

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
    fontWeight: 'bold',
    color: '#CBE3BF',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F1F1F',
    marginTop: 15,
    marginLeft: 16,
    marginBottom: 8,
  },
  lista: {
    paddingBottom: 100,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#CBE3BF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
  },
  nome: {
    fontSize: 16,
    color: '#1F1F1F',
    fontWeight: 'bold',
  },
  quantidade: {
    fontSize: 14,
    color: '#1F1F1F',
  },
  semDados: {
    textAlign: 'center',
    color: '#1F1F1F',
    fontSize: 14,
    marginBottom: 10,
  },
});
