import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

export default function Ajuda() {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        <Text style={styles.headerTitle}>Como Funciona?</Text>
        <View style={styles.card}>
          <Text style={styles.cardText}>
            Nosso app monitora locais com risco de fortes chuvas e alagamentos, e conecta quem precisa de ajuda com quem quer ajudar.
          </Text>
        </View>

        <Text style={styles.headerTitle}>Como Você Pode Ajudar?</Text>

        <View style={styles.card}>
          <View style={styles.listItem}>
            <MaterialIcons name="add-shopping-cart" size={24} color="#56A829" />
            <Text style={styles.listText}>
              Cadastre alimentos para doação: arroz, feijão, enlatados, água e outros itens.
            </Text>
          </View>
          <View style={styles.listItem}>
            <MaterialIcons name="share" size={24} color="#56A829" />
            <Text style={styles.listText}>
              Compartilhe o app para ampliar a rede de solidariedade.
            </Text>
          </View>
          <View style={styles.listItem}>
            <MaterialIcons name="warning" size={24} color="#56A829" />
            <Text style={styles.listText}>
              Acompanhe as notificações e evite locais em risco.
            </Text>
          </View>
        </View>

        <View style={styles.footerMessage}>
          <Text style={styles.footerText}>Juntos somos mais fortes. Obrigado por fazer a diferença!</Text>
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
    paddingTop: 160,
  },
  content: {
    paddingHorizontal: 25,
    paddingBottom: 120,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#CBE3BF',
    marginBottom: 15,
    marginTop: 25,
    textAlign: 'left',
  },
  card: {
    backgroundColor: '#1F1F1F',
    borderRadius: 16,
    padding: 20,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 6,
  },
  cardText: {
    fontSize: 16,
    color: '#CBE3BF',
    lineHeight: 24,
    textAlign: 'justify',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  listText: {
    color: '#CBE3BF',
    fontSize: 16,
    marginLeft: 14,
    flexShrink: 1,
  },
  footerMessage: {
    marginTop: 30,
    paddingHorizontal: 10,
  },
  footerText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#CBE3BF',
  },
});
