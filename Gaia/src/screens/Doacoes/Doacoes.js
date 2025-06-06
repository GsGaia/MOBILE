import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ConfettiCannon from 'react-native-confetti-cannon';

export default function Doacoes() {
  const [doacoes, setDoacoes] = useState([]);
  const [userId, setUserId] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const carregarDoacoes = async () => {
    try {
      const usuarioJson = await AsyncStorage.getItem('usuario');
      if (!usuarioJson) return;

      const usuario = JSON.parse(usuarioJson);
      setUserId(usuario.idUser);

      const response = await fetch('http://191.234.186.183:8080/api/requestion');
      if (!response.ok) throw new Error('Erro ao buscar doações.');

      const todas = await response.json();

      const minhasDoacoes = todas.filter((item) => item.userId === usuario.idUser);
      setDoacoes(minhasDoacoes);
    } catch (error) {
      Alert.alert('Erro', error.message || 'Erro ao carregar doações.');
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      carregarDoacoes();
    }, [])
  );

  const total = doacoes.length;
  const meta = 1000;
  const progresso = Math.min((total / meta) * 100, 100);

  useEffect(() => {
    if (total >= meta) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [total]);

  const renderDoacoes = () =>
    doacoes.length === 0 ? (
      <Text style={styles.semDados}>Nenhuma doação cadastrada.</Text>
    ) : (
      doacoes.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.nome}>{item.title}</Text>
          <Text style={styles.quantidade}>Quantidade: {item.unit}</Text>
          <Text style={styles.quantidade}>Data: {item.requestDate}</Text>
        </View>
      ))
    );

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.titulo}>Minhas Doações</Text>

      {doacoes.length > 0 && (
        <View style={styles.barraContainer}>
          <View style={styles.barraExterna}>
            <View style={[styles.barraInterna, { width: `${progresso}%` }]} />
          </View>
          <Text style={styles.metaTexto}>
            {total} / {meta} doações registradas
          </Text>

          {total >= meta && (
            <View style={styles.mensagemMetaContainer}>
              <Text style={styles.mensagemMetaTitulo}>Meta Atingida</Text>
              <Text style={styles.mensagemMetaTexto}>
                Obrigado por nos ajudar. A meta foi alcançada com sucesso.🎉
              </Text>
            </View>
          )}
        </View>
      )}

      {showConfetti && (
        <ConfettiCannon
          count={150}
          origin={{ x: -10, y: 0 }}
          fadeOut={true}
          fallSpeed={3000}
          colors={['#CBE3BF', '#56A829', '#1F1F1F']}
        />
      )}

      <ScrollView contentContainerStyle={styles.lista}>
        {renderDoacoes()}
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
    marginTop: 10,
  },
  barraContainer: {
    marginHorizontal: 20,
    marginBottom: 10,
  },
  barraExterna: {
    width: '100%',
    height: 40,
    backgroundColor: '#CBE3BF',
    borderRadius: 10,
    overflow: 'hidden',
  },
  barraInterna: {
    height: '100%',
    backgroundColor: '#1F1F1F',
  },
  metaTexto: {
    textAlign: 'center',
    marginTop: 5,
    color: '#1F1F1F',
    fontWeight: 'bold',
  },
  mensagemMetaContainer: {
    backgroundColor: '#B19CD9',
    padding: 15,
    borderRadius: 8,
    marginTop: 12,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  mensagemMetaTitulo: {
    color: '#CBE3BF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  mensagemMetaTexto: {
    color: '#CBE3BF',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
});
