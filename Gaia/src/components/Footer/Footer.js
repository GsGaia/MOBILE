import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function Footer() {
  const navigation = useNavigation();
  const route = useRoute();

  const isActive = (routeName) => route.name === routeName;

  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={() => navigation.navigate('TelaInicial')}>
        <View style={[styles.iconeContainer, isActive('TelaInicial') && styles.iconeAtivo]}>
          <MaterialIcons name="home" size={24} color="#CBE3BF" />
          <Text style={styles.iconeTexto}>Home</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Locais')}>
        <View style={[styles.iconeContainer, isActive('Locais') && styles.iconeAtivo]}>
          <MaterialIcons name="warning" size={24} color="#CBE3BF" />
          <Text style={styles.iconeTexto}>Locais</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Doar')}>
        <View style={[styles.iconeContainer, isActive('Doar') && styles.iconeAtivo]}>
          <MaterialIcons name="add-shopping-cart" size={24} color="#CBE3BF" />
          <Text style={styles.iconeTexto}>Doar</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Doacoes')}>
        <View style={[styles.iconeContainer, isActive('Doacoes') && styles.iconeAtivo]}>
          <FontAwesome5 name="hands-helping" size={20} color="#CBE3BF" />
          <Text style={styles.iconeTexto}>Doações</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Ajuda')}>
        <View style={[styles.iconeContainer, isActive('Ajuda') && styles.iconeAtivo]}>
          <MaterialIcons name="help-outline" size={24} color="#CBE3BF" />
          <Text style={styles.iconeTexto}>Ajuda</Text>
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
    bottom: Platform.OS === 'android' ? 40 : 0,
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
