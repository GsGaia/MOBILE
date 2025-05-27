import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Footer() {
  const [ativo, setAtivo] = useState('Home');

  function handlePress(tela) {
    setAtivo(tela);
  }

  const isActive = (routeName) => ativo === routeName;

  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={() => handlePress('Home')}>
        <View style={[styles.iconeContainer, isActive('Home') && styles.iconeAtivo]}>
          <MaterialIcons name="home" size={24} color="#CBE3BF" />
          <Text style={styles.iconeTexto}>Home</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handlePress('Cadastro')}>
        <View style={[styles.iconeContainer, isActive('Cadastro') && styles.iconeAtivo]}>
          <MaterialIcons name="add" size={24} color="#CBE3BF" />
          <Text style={styles.iconeTexto}>Cadastro</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handlePress('Patio')}>
        <View style={[styles.iconeContainer, isActive('Patio') && styles.iconeAtivo]}>
          <MaterialIcons name="map" size={24} color="#CBE3BF" />
          <Text style={styles.iconeTexto}>Pátio</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handlePress('Relatorios')}>
        <View style={[styles.iconeContainer, isActive('Relatorios') && styles.iconeAtivo]}>
          <MaterialIcons name="description" size={24} color="#CBE3BF" />
          <Text style={styles.iconeTexto}>Relatórios</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handlePress('Appatio')}>
        <View style={[styles.iconeContainer, isActive('Appatio') && styles.iconeAtivo]}>
          <MaterialIcons name="info" size={24} color="#CBE3BF" />
          <Text style={styles.iconeTexto}>Appatio</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: Platform.OS === 'android' ? 50 : 0, 
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#1F1E1E',
    zIndex: 10,
    elevation: 1,
  },
  iconeContainer: {
    alignItems: 'center',
    padding: 8,
    borderRadius: 10,
  },
  iconeAtivo: {
    backgroundColor: '#1F1E1A',
  },
  iconeTexto: {
    fontSize: 10,
    color: '#F1FAEE',
    marginTop: 2,
  },
});
