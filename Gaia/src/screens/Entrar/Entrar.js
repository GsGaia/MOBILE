import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function Entrar({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function validarCampos() {
    if (!email.includes('@')) {
      Alert.alert('Erro', 'Digite um e-mail válido.');
      return false;
    }

    if (senha.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres.');
      return false;
    }

    return true;
  }

  function autenticar() {
  if (!validarCampos()) return;

  if (email === 'teste@gaia.com' && senha === '123456') {
    Alert.alert('Sucesso', 'Login realizado com sucesso!');
    navigation.navigate('TelaInicial'); 
  } else {
    Alert.alert('Erro', 'E-mail ou senha incorretos.');
  }
}

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Insira seus dados</Text>

        <TextInput
          placeholder="E-mail"
          placeholderTextColor="#000"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TextInput
          placeholder="Senha"
          placeholderTextColor="#000"
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
