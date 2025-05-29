import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoadingScreen({ navigation }) {
  useEffect(() => {
    async function verificarLogin() {
      const logado = await AsyncStorage.getItem('usuarioLogado');
      if (logado === 'true') {
        navigation.replace('TelaInicial');
      } else {
        navigation.replace('Home');
      }
    }

    verificarLogin();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#56A829" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CBE3BF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
