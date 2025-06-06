import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const API_BACKEND = 'http://191.234.186.183:8080/api/location';

const STATUS_OPTIONS = [
  'BOM',
  'NECESSITA_AJUDA',
  'EMERGENCIA',
  'SEM_INFORMACAO',
  'FINALIZADA',
];

export default function Locais() {
  const [nomeLocalManual, setNomeLocalManual] = useState('');
  const [estadoManual, setEstadoManual] = useState('');
  const [statusSelecionado, setStatusSelecionado] = useState('BOM');
  const [locaisCadastrados, setLocaisCadastrados] = useState([]);
  const [mensagem, setMensagem] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    buscarLocais();
  }, []);

  const buscarLocais = async () => {
    try {
      const response = await fetch(API_BACKEND);
      if (!response.ok) throw new Error('Erro ao buscar locais');
      const data = await response.json();
      setLocaisCadastrados(data);
    } catch (error) {
      console.error('Erro:', error);
      setMensagem('Erro ao buscar locais.');
    }
  };

  const limparFormulario = () => {
    setNomeLocalManual('');
    setEstadoManual('');
    setStatusSelecionado('BOM');
    setEditandoId(null);
  };

  const salvarLocal = async () => {
    setMensagem('');
    if (!nomeLocalManual || !estadoManual || estadoManual.length !== 2) {
      setMensagem('Preencha todos os campos corretamente.');
      return;
    }

    const localData = {
      city: nomeLocalManual,
      state: estadoManual.toUpperCase(),
      startAccident: new Date().toISOString().split('T')[0],
      endAccident: new Date().toISOString().split('T')[0],
      statusLocation: statusSelecionado,
      active: true,
    };

    try {
      setCarregando(true);
      const url = editandoId ? `${API_BACKEND}/${editandoId}` : API_BACKEND;
      const method = editandoId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(localData),
      });

      if (!response.ok) {
        throw new Error('Falha ao salvar local');
      }

      setMensagem(editandoId ? 'Local atualizado com sucesso!' : 'Local salvo com sucesso!');
      limparFormulario();
      buscarLocais();
    } catch (error) {
      console.error(error);
      setMensagem('Falha ao salvar local.');
    } finally {
      setCarregando(false);
    }
  };

  const carregarParaEdicao = (local) => {
    setNomeLocalManual(local.city);
    setEstadoManual(local.state);
    setStatusSelecionado(local.statusLocation);
    setEditandoId(local.idLocation);
  };

  const excluirLocal = async (id) => {
    Alert.alert('Confirmação', 'Deseja excluir este local?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            const response = await fetch(`${API_BACKEND}/${id}`, {
              method: 'DELETE',
            });
            if (!response.ok) throw new Error('Erro ao excluir local');
            buscarLocais();
          } catch (error) {
            console.error(error);
            setMensagem('Erro ao excluir local.');
          }
        },
      },
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Header />
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <Text style={styles.titulo}>{editandoId ? 'Editar Local' : 'Registrar Novo Local'}</Text>

        <View style={styles.form}>
          <TextInput
            placeholder="Cidade"
            value={nomeLocalManual}
            onChangeText={setNomeLocalManual}
            style={styles.input}
            placeholderTextColor="#ccc"
          />
          <TextInput
            placeholder="Estado (ex: SP)"
            value={estadoManual}
            onChangeText={setEstadoManual}
            style={styles.input}
            placeholderTextColor="#ccc"
            maxLength={2}
            autoCapitalize="characters"
          />
          <View style={styles.statusContainer}>
            {STATUS_OPTIONS.map((status) => (
              <TouchableOpacity
                key={status}
                style={[
                  styles.statusButton,
                  statusSelecionado === status && styles.statusButtonSelected,
                ]}
                onPress={() => setStatusSelecionado(status)}
              >
                <Text
                  style={[
                    styles.statusText,
                    statusSelecionado === status && styles.statusTextSelected,
                  ]}
                >
                  {status}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.botaoSalvar} onPress={salvarLocal}>
            <Text style={styles.textoBotao}>{editandoId ? 'Atualizar Local' : 'Salvar Local'}</Text>
          </TouchableOpacity>

          {editandoId && (
            <TouchableOpacity style={styles.botaoCancelar} onPress={limparFormulario}>
              <Text style={styles.textoCancelar}>Cancelar Edição</Text>
            </TouchableOpacity>
          )}

          {carregando && <ActivityIndicator size="large" color="#fff" />}
          {!!mensagem && <Text style={styles.mensagem}>{mensagem}</Text>}
        </View>

        <Text style={styles.subtitulo}>Locais Registrados</Text>

        {locaisCadastrados.map((local) => (
          <View key={local.idLocation} style={styles.card}>
            <Text style={styles.cardTitulo}>{local.city}, {local.state}</Text>
            <Text style={styles.cardInfo}>Status: {local.statusLocation}</Text>
            <Text style={styles.cardInfo}>De {local.startAccident} até {local.endAccident}</Text>

            <View style={styles.cardBotoes}>
              <TouchableOpacity
                style={styles.botaoEditar}
                onPress={() => carregarParaEdicao(local)}
              >
                <Text style={styles.textoBotaoMenor}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.botaoExcluir}
                onPress={() => excluirLocal(local.idLocation)}
              >
                <Text style={styles.textoBotaoMenor}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <Footer />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#56A829',
    paddingTop: 140,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    textAlign: 'center',
  },
  form: {
    paddingHorizontal: 20,
  },
  input: {
    backgroundColor: '#1F1F1F',
    color: '#fff',
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
    gap: 8,
  },
  statusButton: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 6,
  },
  statusButtonSelected: {
    backgroundColor: '#CBE3BF',
  },
  statusText: {
    color: '#fff',
  },
  statusTextSelected: {
    color: '#1F1F1F',
    fontWeight: 'bold',
  },
  botaoSalvar: {
    backgroundColor: '#CBE3BF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBotao: {
    color: '#1F1F1F',
    fontWeight: 'bold',
    fontSize: 16,
  },
  botaoCancelar: {
    backgroundColor: '#1F1F1F',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  textoCancelar: {
    color: '#fff',
    fontWeight: 'bold',
  },
  mensagem: {
    textAlign: 'center',
    color: '#fff',
    marginTop: 10,
  },
  card: {
    backgroundColor: '#1F1F1F',
    padding: 15,
    borderRadius: 10,
    margin: 10,
  },
  cardTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#CBE3BF',
  },
  cardInfo: {
    color: '#eee',
    marginTop: 4,
  },
  cardBotoes: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 12,
  },
  botaoEditar: {
    backgroundColor: '#CBE3BF',
    padding: 10,
    borderRadius: 6,
  },
  botaoExcluir: {
    backgroundColor: '#B71C1C',
    padding: 10,
    borderRadius: 6,
  },
  textoBotaoMenor: {
    color: '#1F1F1F',
    fontWeight: 'bold',
  },
});
