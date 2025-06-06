import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

export default function Doar() {
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [categoria, setCategoria] = useState('');
  const [userId, setUserId] = useState(null);
  const [locations, setLocations] = useState([]);
  const [locationSelecionado, setLocationSelecionado] = useState(null);

  useEffect(() => {
    const buscarUsuario = async () => {
      const dados = await AsyncStorage.getItem('usuario');
      if (dados) {
        const usuario = JSON.parse(dados);
        setUserId(usuario.idUser);
      }
    };

    const buscarLocations = async () => {
      try {
        const response = await fetch('http://191.234.186.183:8080/api/location');
        if (!response.ok) throw new Error('Erro ao buscar locais');
        const data = await response.json();
        setLocations(data);
      } catch (error) {
        Alert.alert('Erro', error.message);
      }
    };

    buscarUsuario();
    buscarLocations();
  }, []);

  const salvarDoacao = async () => {
    if (!nome || !quantidade || !categoria || !locationSelecionado) {
      Alert.alert('Atenção', 'Preencha todos os campos e selecione um local.');
      return;
    }

    if (!userId) {
      Alert.alert('Erro', 'Usuário não encontrado. Faça login novamente.');
      return;
    }

    const body = {
      title: nome,
      description: `Doação de ${nome}`,
      unit: quantidade,
      requestDate: new Date().toISOString().split('T')[0],
      userId: userId,
      locationId: locationSelecionado.idLocation,
    };

    try {
      const response = await fetch('http://191.234.186.183:8080/api/requestion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const erro = await response.text();
        throw new Error(erro || 'Erro ao salvar doação.');
      }

      Alert.alert('Sucesso', 'Doação cadastrada com sucesso!');
      setNome('');
      setQuantidade('');
      setCategoria('');
      setLocationSelecionado(null);
    } catch (error) {
      Alert.alert('Erro', error.message || 'Erro ao salvar dados.');
    }
  };

  const categorias = ['alimentos', 'roupas', 'remedios'];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Header />
      <Text style={styles.titulo}>Cadastrar Doação</Text>

      <Text style={styles.label}>Categoria</Text>
      <View style={styles.categoriaContainer}>
        {categorias.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoriaItem,
              categoria === cat && styles.categoriaSelecionada,
            ]}
            onPress={() => setCategoria(cat)}
          >
            <Text style={styles.categoriaTexto}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Selecione um Local</Text>
      <FlatList
        data={locations}
        keyExtractor={(item) => item.idLocation.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.localBox,
              locationSelecionado?.idLocation === item.idLocation && styles.localSelecionado,
            ]}
            onPress={() => setLocationSelecionado(item)}
          >
            <Text style={styles.localNome}>{item.city}, {item.state}</Text>
            <Text style={styles.localInfo}>Status: {item.statusLocation}</Text>
          </TouchableOpacity>
        )}
        scrollEnabled={false}
      />

      <TextInput
        placeholder="Nome do item"
        placeholderTextColor="#1F1F1F"
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        placeholder="Quantidade (kg, caixas)"
        placeholderTextColor="#1F1F1F"
        style={styles.input}
        value={quantidade}
        onChangeText={setQuantidade}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.botao} onPress={salvarDoacao}>
        <Text style={styles.botaoTexto}>Salvar</Text>
      </TouchableOpacity>

      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#56A829',
  },
  scrollContent: {
    paddingTop: 160,
    paddingBottom: 120,
  },
  titulo: {
    fontSize: 22,
    color: '#1F1F1F',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#CBE3BF',
    padding: 15,
    borderRadius: 8,
    margin: 15,
    color: '#1F1F1F',
  },
  label: {
    fontWeight: 'bold',
    marginLeft: 15,
    marginBottom: 5,
    color: '#1F1F1F',
  },
  categoriaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 15,
    marginBottom: 15,
  },
  categoriaItem: {
    backgroundColor: '#CBE3BF',
    padding: 10,
    borderRadius: 8,
  },
  categoriaSelecionada: {
    backgroundColor: '#A3CE9E',
  },
  categoriaTexto: {
    color: '#1F1F1F',
  },
  localBox: {
    backgroundColor: '#CBE3BF',
    padding: 12,
    marginHorizontal: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  localSelecionado: {
    borderWidth: 2,
    borderColor: '#1F1F1F',
  },
  localNome: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#1F1F1F',
  },
  localInfo: {
    fontSize: 14,
    color: '#333',
  },
  botao: {
    backgroundColor: '#1F1F1F',
    padding: 14,
    margin: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#CBE3BF',
    fontWeight: 'bold',
  },
});
