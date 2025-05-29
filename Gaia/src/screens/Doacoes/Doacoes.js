import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

export default function Doacoes() {
  const [alimentos, setAlimentos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [alimentoEditando, setAlimentoEditando] = useState(null);
  const [novoNome, setNovoNome] = useState('');
  const [novaQuantidade, setNovaQuantidade] = useState('');

  const carregarAlimentos = async () => {
    const dados = await AsyncStorage.getItem('alimentos');
    setAlimentos(dados ? JSON.parse(dados) : []);
  };

  useFocusEffect(
    React.useCallback(() => {
      carregarAlimentos();
    }, [])
  );

  const apagarTudo = async () => {
    Alert.alert('Confirmar', 'Deseja apagar todas as doações?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sim',
        onPress: async () => {
          await AsyncStorage.removeItem('alimentos');
          setAlimentos([]);
        },
      },
    ]);
  };

  const abrirModalEditar = (item, index) => {
    setAlimentoEditando(index);
    setNovoNome(item.nome);
    setNovaQuantidade(item.quantidade);
    setModalVisible(true);
  };

  const salvarEdicao = async () => {
    const atualizados = [...alimentos];
    atualizados[alimentoEditando] = { nome: novoNome, quantidade: novaQuantidade };
    await AsyncStorage.setItem('alimentos', JSON.stringify(atualizados));
    setAlimentos(atualizados);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
    <Header />

    <Text style={styles.titulo}>Doações Recebidas</Text>

    {alimentos.length > 0 && (
      <TouchableOpacity style={styles.botaoApagarTopo} onPress={apagarTudo}>
        <Text style={styles.botaoApagarTexto}>🗑️ Apagar todas as doações</Text>
      </TouchableOpacity>
    )}

    <ScrollView contentContainerStyle={styles.lista}>
      {alimentos.length === 0 ? (
        <Text style={styles.semDados}>Nenhuma doação cadastrada.</Text>
      ) : (
        alimentos.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onLongPress={() => abrirModalEditar(item, index)}
          >
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.quantidade}>Quantidade: {item.quantidade}</Text>
            <Text style={styles.editarTexto}>Pressione e segure para editar</Text>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>

    <Modal visible={modalVisible} transparent animationType="slide">
    </Modal>

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
    padding: 16,
    paddingBottom: 100,
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
  editarTexto: {
    fontSize: 10,
    marginTop: 4,
    color: '#555',
  },
  botaoApagar: {
    backgroundColor: '#1F1F1F',
    margin: 20,
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
  },
  botaoApagarTexto: {
    color: '#CBE3BF',
    fontWeight: 'bold',
  },
  semDados: {
    textAlign: 'center',
    color: '#1F1F1F',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000000aa',
    padding: 20,
  },
  modalBox: {
    backgroundColor: '#CBE3BF',
    borderRadius: 8,
    padding: 20,
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F1F1F',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    color: '#1F1F1F',
  },
  botaoSalvar: {
    backgroundColor: '#1F1F1F',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  botaoSalvarTexto: {
    color: '#CBE3BF',
    fontWeight: 'bold',
  },
  cancelar: {
    marginTop: 12,
    textAlign: 'center',
    color: '#1F1F1F',
  },
  botaoApagarTopo: {
  backgroundColor: '#1F1F1F',
  marginHorizontal: 20,
  marginBottom: 10,
  padding: 14,
  borderRadius: 8,
  alignItems: 'center',
},
});
