import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {
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

  const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validarCPF = (cpf) => cpf.replace(/\D/g, '').length === 11;

  const handleSubmit = async () => {
    if (form.nome.trim().length < 3) return Alert.alert('Erro', 'Nome deve ter pelo menos 3 caracteres.');
    if (!validarCPF(form.cpf)) return Alert.alert('Erro', 'CPF inválido.');
    if (!validarEmail(form.email)) return Alert.alert('Erro', 'E-mail inválido.');
    if (form.senha.length < 6) return Alert.alert('Erro', 'Senha deve ter pelo menos 6 caracteres.');
    if (form.senha !== form.confirmarSenha) return Alert.alert('Erro', 'Senhas não coincidem.');

    try {
      await AsyncStorage.setItem('usuario', JSON.stringify(form));
      
      await AsyncStorage.setItem('usuarioLogado', 'true');

      Alert.alert('Sucesso', 'Cadastro realizado!');
      navigation.reset({
        index: 0,
        routes: [{ name: 'TelaInicial', params: { nome: form.nome } }],
      });
    } catch (error) {
      Alert.alert('Erro', 'Erro ao salvar dados');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Insira seus dados</Text>
        <TextInput placeholder="Nome completo" style={styles.input} value={form.nome} onChangeText={(text) => handleChange('nome', text)} />
        <TextInput placeholder="CPF" style={styles.input} keyboardType="numeric" value={form.cpf} onChangeText={(text) => handleChange('cpf', text)} maxLength={14} />
        <TextInput placeholder="E-mail" style={styles.input} keyboardType="email-address" autoCapitalize="none" value={form.email} onChangeText={(text) => handleChange('email', text)} />
        <TextInput placeholder="Senha" style={styles.input} secureTextEntry value={form.senha} onChangeText={(text) => handleChange('senha', text)} />
        <TextInput placeholder="Confirme sua senha" style={styles.input} secureTextEntry value={form.confirmarSenha} onChangeText={(text) => handleChange('confirmarSenha', text)} />
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
