import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

export default function TelaInicial({ navigation }) {
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [totalDoacoes, setTotalDoacoes] = useState(0);
  const meta = 1000;

  useEffect(() => {
    async function carregarUsuario() {
      const dados = await AsyncStorage.getItem('usuario');
      if (dados) {
        const usuario = JSON.parse(dados);
        setNomeUsuario(usuario.nome);
      }
    }

    async function carregarTotalDoacoes() {
      const categorias = ['alimentos', 'roupas', 'remedios'];
      let total = 0;
      for (const cat of categorias) {
        const json = await AsyncStorage.getItem(cat);
        if (json) {
          const lista = JSON.parse(json);
          total += lista.reduce((acc, item) => acc + Number(item.quantidade || 0), 0);
        }
      }
      setTotalDoacoes(total);
    }

    carregarUsuario();
    carregarTotalDoacoes();
  }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      (async () => {
        const categorias = ['alimentos', 'roupas', 'remedios'];
        let total = 0;
        for (const cat of categorias) {
          const json = await AsyncStorage.getItem(cat);
          if (json) {
            const lista = JSON.parse(json);
            total += lista.reduce((acc, item) => acc + Number(item.quantidade || 0), 0);
          }
        }
        setTotalDoacoes(total);
      })();
    });
    return unsubscribe;
  }, [navigation]);

  const progresso = Math.min((totalDoacoes / meta) * 100, 100);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header/>
      <Text style={styles.titulo}>
        {nomeUsuario ? `Bem-vindo à Gaia, ${nomeUsuario}!` : 'Bem-vindo à Gaia!'}
      </Text>
      <Text style={styles.subtitulo}>
        Aqui você acompanha locais com risco de fortes chuvas e pode ajudar com doações.
      </Text>

      {/* Barra de meta */}
      <View style={styles.barraContainer}>
        <Text style={styles.metaMensagem}>Nos ajude a bater a meta</Text>
        <View style={styles.barraExterna}>
          <View style={[styles.barraInterna, { width: `${progresso}%` }]} />
        </View>
        <Text style={styles.metaTexto}>
          {totalDoacoes} / {meta} unidades doadas
        </Text>
        {totalDoacoes >= meta && (
          <Text style={styles.metaAtingida}>Parabéns! Meta atingida 🎉</Text>
        )}
      </View>

      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Locais')}>
        <MaterialIcons name="warning" size={24} color="#CBE3BF" />
        <Text style={styles.botaoTexto}>Ver Locais em Risco</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Doar')}>
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
      <StatusBar barStyle="light-content" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
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
    marginBottom: 20,
    textAlign: 'center',
  },
  barraContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  metaMensagem: {
    fontSize: 16,
    textAlign: 'center',
    color: '#1F1E1E',
    marginBottom: 6,
    fontWeight: '600',
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
    backgroundColor: '#1F1E1E',
  },
  metaTexto: {
    textAlign: 'center',
    marginTop: 5,
    color: '#1F1E1E',
    fontWeight: 'bold',
  },
  metaAtingida: {
    marginTop: 8,
    textAlign: 'center',
    color: '#0A7D0A',
    fontWeight: 'bold',
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
    fontWeight: 'normal',
  },
});
