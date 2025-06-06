import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Entrar({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const validarCampos = () => {
    if (!email.includes('@')) {
      Alert.alert('Erro', 'Digite um e-mail válido.');
      return false;
    }
    if (senha.length < 6) {
      Alert.alert('Erro', 'Senha muito curta.');
      return false;
    }
    return true;
  };

  const autenticar = async () => {
    if (!validarCampos()) return;

    try {
      const response = await fetch('http://191.234.186.183:8080/api/user');
      if (!response.ok) throw new Error('Erro ao buscar usuários.');

      const usuarios = await response.json();

      const usuarioEncontrado = usuarios.find(u => u.email === email && u.password === senha);

      if (!usuarioEncontrado) {
        return Alert.alert('Erro', 'E-mail ou senha incorretos.');
      }

      await AsyncStorage.setItem('usuario', JSON.stringify(usuarioEncontrado));
      await AsyncStorage.setItem('usuarioLogado', 'true');

      Alert.alert('Sucesso', 'Login realizado!');
      navigation.reset({
        index: 0,
        routes: [{ name: 'TelaInicial', params: { nome: usuarioEncontrado.name } }],
      });
    } catch (error) {
      Alert.alert('Erro', error.message || 'Erro ao autenticar usuário.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Insira seus dados</Text>
        <TextInput
          placeholder="E-mail"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Senha"
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={autenticar}>
          <Text style={styles.buttonText}>ENTRAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#56A829',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#1F1F1F',
    padding: 30,
    borderRadius: 12,
    width: '100%',
    maxWidth: 340,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#D9D9D9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#56A829',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});