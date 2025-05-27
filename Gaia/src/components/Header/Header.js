import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false);

  function toggleMenu() {
    setMenuAberto(!menuAberto);
  }

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.titulo}>Gaia</Text>

        <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
          <MaterialIcons name="menu" size={32} color="#CBE3BF" />
        </TouchableOpacity>
      </View>

      {menuAberto && (
        <View style={styles.menuDropdown}>
          <Text style={styles.menuItem}>Perfil</Text>
          <Text style={styles.menuItem}>Configurações</Text>
          <Text style={styles.menuItem}>Sair</Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 130,
    backgroundColor: '#1F1E1E',

    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  titulo: {
    color: '#CBE3BF',
    fontWeight: 'bold',
    fontSize: 24,
  },
  menuButton: {
    padding: 10,
  },
  menuDropdown: {
    position: 'absolute',
    top: 120,
    right: 0,
    backgroundColor: '#1F1E1E',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    zIndex: 999,
  },
  menuItem: {
    color: '#CBE3BF',
    fontSize: 18,
    paddingVertical: 6,
  },
});
