import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

export default function Perfil({ navigation }) {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    async function carregarUsuario() {
      const dados = await AsyncStorage.getItem('usuario');
      if (dados) setUsuario(JSON.parse(dados));
    }
    carregarUsuario();
  }, []);

  const sairDaConta = async () => {
    await AsyncStorage.removeItem('usuarioLogado');
    Alert.alert('Você saiu da conta');
    navigation.navigate('Entrar');
  };


  const excluirConta = () => {
    Alert.alert(
      'Confirmação',
      'Tem certeza que deseja excluir sua conta? Essa ação não pode ser desfeita.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', style: 'destructive', onPress: async () => {
          await AsyncStorage.removeItem('usuario');
          await AsyncStorage.removeItem('usuarioLogado');
          Alert.alert('Conta excluída com sucesso');
          navigation.navigate('Home');
        }},
      ]
    );
  };

  if (!usuario) {
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          <Text style={styles.text}>Carregando dados do usuário...</Text>
        </View>
        <Footer />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.title}>Dados do Usuário</Text>

          <Text style={styles.label}>Nome:</Text>
          <Text style={styles.value}>{usuario.nome}</Text>

          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{usuario.email}</Text>

          <Text style={styles.label}>CPF:</Text>
          <Text style={styles.value}>{usuario.cpf}</Text>

          <TouchableOpacity style={styles.buttonSair} onPress={sairDaConta}>
            <Text style={styles.buttonText}>Sair da Conta</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonExcluir} onPress={excluirConta}>
            <Text style={styles.buttonText}>Excluir Conta</Text>
          </TouchableOpacity>
        </View>
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
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#1F1F1F',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 360,
  },
  title: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#CBE3BF',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
  buttonSair: {
    backgroundColor: '#E53935',
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonExcluir: {
    backgroundColor: '#B71C1C',
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#1F1F1F',
    fontWeight: 'bold',
    fontSize: 16,
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
});
