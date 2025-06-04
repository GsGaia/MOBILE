import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

const API_KEY = '88fb1e0ef453001b8e4dd2827549e849';

async function fetchGeocode(nomeLocal) {
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
    nomeLocal
  )}&limit=1&appid=${API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) return null;
  const data = await response.json();
  return data[0];
}

async function fetchPrevisao(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    console.log('Erro na resposta da API:', response.status);
    return null;
  }
  const data = await response.json();
  return data;
}

export default function Locais() {
  const [search, setSearch] = useState('');
  const [locaisRisco, setLocaisRisco] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  async function buscarLocal() {
    setErrorMsg('');
    setLoading(true);

    const geo = await fetchGeocode(search);
    if (!geo) {
      setErrorMsg('Local não encontrado.');
      setLoading(false);
      return;
    }

    const previsao = await fetchPrevisao(geo.lat, geo.lon);
    if (!previsao) {
      setErrorMsg('Erro ao buscar previsão.');
      setLoading(false);
      return;
    }

    let risco = 'Baixo';
    const proximasHoras = previsao.list.slice(0, 6);
    for (const hora of proximasHoras) {
      const chuva = hora.rain?.['3h'] || 0;
      if (chuva > 10) {
        risco = 'Alto';
        break;
      } else if (chuva > 2) {
        risco = risco === 'Alto' ? 'Alto' : 'Médio';
      }
    }

    setLocaisRisco((old) => [
      ...old,
      { id: old.length + 1, nome: geo.name, nivel: risco },
    ]);
    setLoading(false);
    setSearch('');
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <Header />
      <Text style={styles.titulo}>Locais em Risco</Text>

      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={[styles.scrollContent, { paddingBottom: 120 }]}
        >
          <View style={styles.pesquisaContainer}>
            <TextInput
              placeholder="Digite o nome do local"
              style={styles.input}
              value={search}
              onChangeText={setSearch}
              placeholderTextColor="#ddd"
              onSubmitEditing={buscarLocal}
              returnKeyType="search"
            />
            <TouchableOpacity onPress={buscarLocal} style={styles.botaoBuscar}>
              <Text style={styles.textoBotao}>Buscar</Text>
            </TouchableOpacity>
          </View>

          {loading && (
            <ActivityIndicator
              size="large"
              color="#CBE3BF"
              style={{ marginTop: 20 }}
            />
          )}

          {!loading && locaisRisco.length === 0 && (
            <Text style={styles.semDados}>
              Nenhum local com risco adicionado.
            </Text>
          )}

          {locaisRisco.map((local) => (
            <View key={local.id} style={styles.card}>
              <Text style={styles.nome}>{local.nome}</Text>
              <Text style={[styles.nivel, getNivelStyle(local.nivel)]}>
                Nível: {local.nivel}
              </Text>
            </View>
          ))}

          {!!errorMsg && <Text style={styles.error}>{errorMsg}</Text>}
        </ScrollView>
      </View>

      <Footer />
    </KeyboardAvoidingView>
  );
}

function getNivelStyle(nivel) {
  switch (nivel) {
    case 'Alto':
      return { color: '#ff4d4d' };
    case 'Médio':
      return { color: '#f9c74f' };
    case 'Baixo':
      return { color: '#90be6d' };
    default:
      return { color: '#fff' };
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#56A829',
    paddingTop: 160,
  },
  titulo: {
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#CBE3BF',
  },
  pesquisaContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#1F1F1F',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: '#CBE3BF',
    fontSize: 16,
  },
  botaoBuscar: {
    backgroundColor: '#CBE3BF',
    paddingHorizontal: 15,
    justifyContent: 'center',
    marginLeft: 10,
    borderRadius: 8,
  },
  textoBotao: {
    fontWeight: 'bold',
    color: '#1F1F1F',
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#1F1F1F',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#CBE3BF',
  },
  nivel: {
    marginTop: 5,
    fontSize: 14,
  },
  semDados: {
    color: '#CBE3BF',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 30,
  },
  error: {
    textAlign: 'center',
    color: '#ff4d4d',
    marginTop: 10,
  },
});
