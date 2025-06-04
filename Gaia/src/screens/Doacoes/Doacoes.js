import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ConfettiCannon from 'react-native-confetti-cannon';

export default function Doacoes() {
  const [dados, setDados] = useState({
    alimentos: [],
    roupas: [],
    remedios: [],
  });
  const [showConfetti, setShowConfetti] = useState(false);

  const carregarDados = async () => {
    const categorias = ['alimentos', 'roupas', 'remedios'];
    const novasDoacoes = {};

    for (const cat of categorias) {
      const json = await AsyncStorage.getItem(cat);
      novasDoacoes[cat] = json ? JSON.parse(json) : [];
    }

    setDados(novasDoacoes);
  };

  const removerTodasDoacoes = async () => {
    const categorias = ['alimentos', 'roupas', 'remedios'];
    for (const cat of categorias) {
      await AsyncStorage.removeItem(cat);
    }
    carregarDados();
  };

  useFocusEffect(
    React.useCallback(() => {
      carregarDados();
    }, [])
  );

  const calcularTotalDoacoes = () => {
    const todas = [...dados.alimentos, ...dados.roupas, ...dados.remedios];
    return todas.reduce((total, item) => total + Number(item.quantidade || 0), 0);
  };

  const total = calcularTotalDoacoes();
  const meta = 1000;
  const progresso = Math.min((total / meta) * 100, 100);

  useEffect(() => {
    if (total >= meta) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [total]);

  const temDoacoes =
    dados.alimentos.length > 0 ||
    dados.roupas.length > 0 ||
    dados.remedios.length > 0;

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

      {temDoacoes && (
        <View style={styles.barraContainer}>
          <View style={styles.barraExterna}>
            <View style={[styles.barraInterna, { width: `${progresso}%` }]} />
          </View>
          <Text style={styles.metaTexto}>
            {total} / {meta} unidades doadas
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
        {renderCategoria('Alimentos', dados.alimentos)}
        {renderCategoria('Roupas', dados.roupas)}
        {renderCategoria('Remédios', dados.remedios)}

        {temDoacoes && (
          <TouchableOpacity style={styles.botaoRemover} onPress={removerTodasDoacoes}>
            <Text style={styles.textoBotao}>Remover Todas as Doações</Text>
          </TouchableOpacity>
        )}
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
  botaoRemover: {
    marginTop: 20,
    backgroundColor: '#1F1F1F',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#CBE3BF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
