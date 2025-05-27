import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function Login() {
  const [form, setForm] = useState({
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validarCPF = (cpf) => {
    const somenteNumeros = cpf.replace(/\D/g, '');
    return somenteNumeros.length === 11;
  };

  const handleSubmit = () => {
    if (form.nome.trim().length < 3) {
      Alert.alert('Erro', 'O nome deve ter pelo menos 3 caracteres.');
      return;
    }

    if (!validarCPF(form.cpf)) {
      Alert.alert('Erro', 'CPF deve conter 11 números.');
      return;
    }

    if (!validarEmail(form.email)) {
      Alert.alert('Erro', 'E-mail inválido.');
      return;
    }

    if (form.senha.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    if (form.senha !== form.confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    Alert.alert('Sucesso', 'Cadastro enviado com sucesso!');
    console.log('Dados válidos:', form);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Insira seus dados</Text>

        <TextInput
          placeholder="Nome completo"
          style={styles.input}
          value={form.nome}
          onChangeText={(text) => handleChange('nome', text)}
        />
        <TextInput
          placeholder="CPF"
          style={styles.input}
          keyboardType="numeric"
          value={form.cpf}
          onChangeText={(text) => handleChange('cpf', text)}
          maxLength={14}
        />
        <TextInput
          placeholder="E-mail"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          value={form.email}
          onChangeText={(text) => handleChange('email', text)}
        />
        <TextInput
          placeholder="Senha"
          style={styles.input}
          secureTextEntry
          value={form.senha}
          onChangeText={(text) => handleChange('senha', text)}
        />
        <TextInput
          placeholder="Confirme sua senha"
          style={styles.input}
          secureTextEntry
          value={form.confirmarSenha}
          onChangeText={(text) => handleChange('confirmarSenha', text)}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>ENVIAR</Text>
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
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 360,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#D9D9D9',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 14,
  },
  button: {
    backgroundColor: '#56A829',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 2,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
