
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  Pressable,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

export default function Doar() {
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [categoria, setCategoria] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const salvarDoacao = async () => {
    if (!nome || !quantidade || !categoria) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }

    try {
      const novaDoacao = { nome, quantidade };
      const dadosExistentes = await AsyncStorage.getItem(categoria);
      const doacoes = dadosExistentes ? JSON.parse(dadosExistentes) : [];

      
      const indexExistente = doacoes.findIndex(
        (item) => item.nome.toLowerCase() === nome.toLowerCase()
      );

      if (indexExistente !== -1) {
        
        doacoes[indexExistente].quantidade = String(
          Number(doacoes[indexExistente].quantidade) + Number(quantidade)
        );
      } else {
        
        doacoes.push(novaDoacao);
      }

      await AsyncStorage.setItem(categoria, JSON.stringify(doacoes));

      Alert.alert('Sucesso', 'Doação cadastrada com sucesso!');
      setNome('');
      setQuantidade('');
      setCategoria('');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar os dados.');
    }
  };

  const categorias = ['alimentos', 'roupas', 'remedios'];

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.titulo}>Cadastrar Doação</Text>

      
      <Text style={styles.label}>Categoria</Text>
      <TouchableOpacity
        style={styles.selectBox}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.selectText}>
          {categoria
            ? categoria.charAt(0).toUpperCase() + categoria.slice(1)
            : 'Selecione uma categoria'}
        </Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={categorias}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.option}
                  onPress={() => {
                    setCategoria(item);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.optionText}>
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </Text>
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>

      <TextInput
        placeholder="Nome do item"
        placeholderTextColor="#1F1F1F"
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        placeholder="Quantidade(kg, caixas)"
        placeholderTextColor="#1F1F1F"
        style={styles.input}
        value={quantidade}
        onChangeText={setQuantidade}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.botao} onPress={salvarDoacao}>
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
  label: {
    fontWeight: 'bold',
    marginLeft: 15,
    marginBottom: 5,
    color: '#1F1F1F',
  },
  selectBox: {
    backgroundColor: '#CBE3BF',
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 15,
    marginBottom: 15,
  },
  selectText: {
    color: '#1F1F1F',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#00000088',
  },
  modalContent: {
    marginHorizontal: 30,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
  },
  option: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    fontSize: 16,
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
