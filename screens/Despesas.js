import React, { Component } from "react";
import {
  Image,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Button, Block, Text, Input } from "../components";
import { theme, mocks } from "../constants";
import { AsyncStorage } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-community/picker";
import moment from "moment";
import apiTransacao from "../services/apiTransacao";
const { width } = Dimensions.get("window");

class Despesas extends Component {
  state = {
    despesas: [],
    despesa: {
      data_hora_transacao: new Date(),
      despesa: {
        descricao: "",
        nome: "",
        preco: 0,
      },
      tipo: "SAIDA",
    },
    meses: [
      { nome: "Janeiro", numero: 1 },
      { nome: "Fevereiro", numero: 2 },
      { nome: "Março", numero: 3 },
      { nome: "Abril", numero: 4 },
      { nome: "Maio", numero: 5 },
      { nome: "Junho", numero: 6 },
      { nome: "Julho", numero: 7 },
      { nome: "Agosto", numero: 8 },
      { nome: "Setembro", numero: 9 },
      { nome: "Outubro", numero: 10 },
      { nome: "Novembro", numero: 11 },
      { nome: "Dezembro", numero: 12 },
    ],
    usuario: {},
    mesSelected: new Date().getMonth() + 1,
    despesaSelected: {
      data_hora_transacao: new Date(),
      despesa: {
        descricao: "",
        nome: "",
        preco: 0,
      },
      tipo: "SAIDA",
    },
    diaSelected: moment(new Date()).format("DD/MM/YYYY"),
    dataInicio: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    dataFim: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
    showNewDespesa: false,
    showDatePicker: false,
    loading: false,
  };

  componentDidMount() {
    //  this.setState({ agends: this.props.agends });
    const { dataInicio, dataFim } = this.state;

    this.getDespesas("", dataInicio, dataFim);
  }

  setModal = (despesaSelecionada) => {
    const { despesaSelected } = this.state;
    if (JSON.stringify(despesaSelecionada) === "{}") {
      this.setState({ despesaNova: true });
      this.setState({
        despesaSelected: {
          data_hora_transacao: new Date(),
          despesa: {
            descricao: "",
            nome: "",
            preco: 0,
          },
          tipo: "SAIDA",
        },
      });
    } else {
      despesaSelecionada.data_hora_transacao = new Date(
        String(despesaSelecionada.data_hora_transacao).substring(0, 10)
      );
      this.setState({
        despesaNova: false,
        despesaSelected: despesaSelecionada,
      });
    }
    this.setState({ showNewDespesa: true });
  };

  convertData(date) {
    return moment(date).format("YYYY-MM-DD");
  }

  getDespesas = async (status, dataInicio, dataFim) => {
    try {
      this.setState({ loading: true });
      const response = await apiTransacao.get("transacao", {
        dataInicio: this.convertData(dataInicio),
        dataFim: this.convertData(dataFim),
        tipo: "SAIDA",
      });

      this.setState({ despesas: response.data, loading: false });
    } catch (err) {
      console.log(err);
      Alert.alert("Erro", JSON.stringify(err.data));
      this.setState({ loading: false });
    }
  };

  saveDespesas = async () => {
    const { despesaSelected, dataInicio, dataFim } = this.state;
    console.log(JSON.stringify(despesaSelected));
    despesaSelected.data_hora_transacao = moment(
      despesaSelected.data_hora_transacao
    ).format("YYYY-MM-DD HH:mm");

    try {
      this.setState({ loading: true });
      const response = await apiTransacao.post("transacao", despesaSelected);
      this.setState({
        loading: false,
        showNewDespesa: false,
        mesSelected: dataInicio.getMonth() + 1,
      });
      Alert.alert("Salvo!", "Dados salvos com sucesso.");
      this.getDespesas("", dataInicio, dataFim);
      this.setState({
        despesaSelected: {
          data_hora_transacao: new Date(),
          despesa: {
            descricao: "",
            nome: "",
            preco: 0,
          },
          tipo: "SAIDA",
        },
      });
    } catch (err) {
      this.setState({ loading: false });
      Alert.alert("Erro", JSON.stringify(err.data));
      console.log(err);
    }
  };

  onChangeMonth(month) {
    this.setState({ mesSelected: month });
    const dateParam = new Date();
    this.getDespesas(
      "",
      new Date(dateParam.getFullYear(), month - 1, 1),
      new Date(dateParam.getFullYear(), month, 0)
    );
  }

  onChange = (date) => {
    this.setState({ showDatePicker: false });
    if (date) {
      this.setState((prev) => ({
        despesaSelected: {
          ...prev.despesaSelected,
          data_hora_transacao: date,
        },
      }));
    }
  };

  renderSelectedDespesa() {
    const {
      despesaSelected,
      loading,
      despesaNova,
      showNewDespesa,
      showDatePicker,
    } = this.state;
    return (
      <Modal
        animationType="slide"
        visible={showNewDespesa}
        onRequestClose={() => this.setState({ showNewDespesa: false })}
      >
        <Block>
          <Block flex={false} row center space="between" style={styles.header}>
            {despesaNova && (
              <Text h1 bold>
                Nova Despesa
              </Text>
            )}
            {!despesaNova && (
              <Text h1 bold>
                Dados do Serviço
              </Text>
            )}
          </Block>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Block style={styles.inputs}>
              <Block row space="between" margin={[10, 0]}>
                <Block>
                  <TouchableOpacity
                    onPress={() => this.setState({ showDatePicker: true })}
                  >
                    <Text gray2>Data</Text>
                    <Text>
                      {moment(
                        new Date(despesaSelected.data_hora_transacao)
                      ).format("DD/MM/YYYY")}
                    </Text>
                  </TouchableOpacity>
                  {showDatePicker && (
                    <DateTimePicker
                      value={despesaSelected.data_hora_transacao}
                      mode="date"
                      display="default"
                      is24Hour={true}
                      onChange={(event, date) => this.onChange(date)}
                    />
                  )}
                </Block>
              </Block>
              <Input
                label="Nome da Despesa"
                style={[styles.input]}
                defaultValue={despesaSelected.despesa.nome}
                onChangeText={(text) =>
                  this.setState((prev) => ({
                    despesaSelected: {
                      ...prev.despesaSelected,
                      despesa: {
                        ...prev.despesaSelected.despesa,
                        nome: text,
                      },
                    },
                  }))
                }
              />
              <Input
                multiline={true}
                numberOfLines={10}
                label="Descrição"
                style={[styles.input]}
                defaultValue={despesaSelected.despesa.descricao}
                onChangeText={(text) =>
                  this.setState((prev) => ({
                    despesaSelected: {
                      ...prev.despesaSelected,
                      despesa: {
                        ...prev.despesaSelected.despesa,
                        descricao: text,
                      },
                    },
                  }))
                }
              />
              <Input
                number
                label="Valor (R$)"
                style={[styles.input]}
                defaultValue={String(despesaSelected.despesa.preco)}
                onChangeText={(text) =>
                  this.setState((prev) => ({
                    despesaSelected: {
                      ...prev.despesaSelected,
                      despesa: {
                        ...prev.despesaSelected.despesa,
                        preco: text,
                      },
                    },
                  }))
                }
              />
              <Block middle padding={[theme.sizes.base / 2, 0]}>
                <Button gradient onPress={() => this.saveDespesas()}>
                  {loading ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text bold white center>
                      Salvar
                    </Text>
                  )}
                </Button>
                {!despesaNova && (
                  <Button color="accent" onPress={() => this.deleteAlert()}>
                    {loading ? (
                      <ActivityIndicator size="small" color="white" />
                    ) : (
                      <Text bold white center>
                        Excluir
                      </Text>
                    )}
                  </Button>
                )}
                <Button
                  color="orange"
                  onPress={() => this.setState({ showNewDespesa: false })}
                >
                  <Text center white>
                    Voltar
                  </Text>
                </Button>
              </Block>
            </Block>
          </ScrollView>
        </Block>
      </Modal>
    );
  }

  renderDespesa(despesa) {
    return (
      <Block row card shadow color="#fffcfc" style={styles.agend}>
        <Block
          flex={0.25}
          card
          column
          color="secondary"
          style={styles.agendStatus}
        >
          <Block flex={0.25} middle center color={theme.colors.primary}>
            <Text h2 white style={{ textTransform: "uppercase" }}>
              Dia
            </Text>
          </Block>
          <Block flex={0.7} center middle>
            <Text h2 white>
              {new Date(
                String(despesa.data_hora_transacao).substring(0, 10)
              ).getDate()}
            </Text>
          </Block>
        </Block>
        <Block flex={0.75} column middle>
          <Text h3 style={{ paddingVertical: 8 }}>
            Nome: {despesa.despesa.nome}
          </Text>
          <Text h4 style={{ paddingVertical: 8 }}>
            Descrição: {despesa.despesa.descricao}
          </Text>
          <Text h4 style={{ paddingVertical: 8 }}>
            Valor: R$ {Number(despesa.despesa.preco).toFixed(2)}
          </Text>
        </Block>
      </Block>
    );
  }

  renderDespesas() {
    const { navigation } = this.props;
    const { despesas } = this.state;
    return (
      <Block flex={0.8} column style={styles.agends}>
        <SafeAreaView style={styles.safe}>
          {despesas.map((despesa) => (
            <TouchableOpacity
              onPress={() => this.setModal(despesa)}
              activeOpacity={0.8}
              key={`despesa-${despesa.data_hora_transacao}`}
            >
              {this.renderDespesa(despesa)}
            </TouchableOpacity>
          ))}
          {despesas.length === 0 && (
            <Block>
              <Text style={{ marginBottom: 50 }} center medium height={20}>
                Aqui você pode cadastrar despesas que teve ao longo dos dias
                para que possamos calcular corretamente o seu lucro final.
              </Text>

              <Text style={{ marginBottom: 50 }} center medium height={20}>
                Nenhuma despesa encontrada no mês
              </Text>

              <Text center medium height={20}>
                Clique no + para cadastrar uma nova despesa.
              </Text>
            </Block>
          )}
        </SafeAreaView>
      </Block>
    );
  }

  render() {
    const { profile, navigation } = this.props;
    const { meses, mesSelected, loading } = this.state;
    return (
      <Block>
        <Block flex={false} row center space="between" style={styles.header}>
          <Text h1 bold>
            Despesas
          </Text>
          <Button onPress={() => navigation.navigate("Settings")}>
            <Image source={profile.avatar} style={styles.avatar} />
          </Button>
        </Block>
        <Block flex={false} row space="between" style={styles.agendHeader}>
          <Picker
            style={{
              height: 50,
              width: 200,
              transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
            }}
            selectedValue={mesSelected}
            onValueChange={(v) => this.onChangeMonth(v)}
            itemStyle={{ fontSize: 20 }}
          >
            {meses.map((mes) => (
              <Picker.Item
                key={`mes-${mes.numero}`}
                label={mes.nome}
                value={mes.numero}
              />
            ))}
          </Picker>
        </Block>
        <ScrollView showsHorizontalScrollIndicator={false}>
          {loading ? (
            <ActivityIndicator size="large" color="green" />
          ) : (
            this.renderDespesas()
          )}
        </ScrollView>
        <TouchableOpacity onPress={() => this.setModal({})} style={styles.fab}>
          <Text style={styles.fabIcon}>+</Text>
        </TouchableOpacity>
        {this.renderSelectedDespesa()}
      </Block>
    );
  }
}

Despesas.defaultProps = {
  profile: mocks.profile,
};

export default Despesas;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  avatar: {
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2,
  },
  active: {
    borderBottomColor: theme.colors.secondary,
    borderBottomWidth: 3,
  },
  agendamentos: {
    flexWrap: "wrap",
    paddingHorizontal: theme.sizes.base * 2,
    marginBottom: theme.sizes.base * 3.5,
  },
  agendamento: {
    // this should be dynamic based on screen width
    minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
  },
  agends: {
    marginTop: -55,
    paddingTop: 55 + 20,
    paddingHorizontal: 15,
    zIndex: -1,
  },
  agendHeader: {
    paddingHorizontal: 70,
    paddingBottom: 2,
  },
  agend: {
    padding: 20,
    marginBottom: 15,
  },
  agendStatus: {
    marginRight: 20,
    overflow: "hidden",
    height: 90,
  },
  safe: {
    flex: 1,
  },
  fab: {
    position: "absolute",
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 20,
    backgroundColor: theme.colors.primary,
    borderRadius: 30,
    elevation: 8,
  },
  fabIcon: {
    fontSize: 40,
    color: "white",
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  inputs: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2,
  },
  inputRow: {
    alignItems: "flex-end",
  },
});
