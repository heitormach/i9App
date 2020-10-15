import React, { Component } from "react";
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Modal,
  Alert,
  ActivityIndicator,
} from "react-native";

import { Button, Block, Text } from "../components";
import { theme, mocks } from "../constants";
const { width } = Dimensions.get("window");
import apiAgendamento from "../services/apiAgendamento";
import { showLocation } from "react-native-map-link";
class ServicosDia extends Component {
  state = {
    servsDia: this.props.navigation.state.params.servsDia,
    isDateTimePickerVisible: false,
    showModal: false,
    horaSelected: {},
    showTimePicker: false,
    servicoSelected: {
      servico: {},
      cliente: {
        endereco: {},
      },
    },
    options: {
      latitude: 38.8976763,
      longitude: -77.0387185,
      title: "",
      dialogTitle: "Deseja abrir em qual aplicativo?",
      dialogMessage: "",
      cancelText: "Cancelar",
    },
    loading: false,
    dataCorret: "",
  };

  componentDidMount() {
    const { servsDia } = this.state;
    const { navigation } = this.props;
    this.setState({ servsDia: this.props.navigation.state.params.servsDia });
    const dataCorrect = new Date(servsDia.data_agendamento.substring(0, 10));
    navigation.state.params.onGoBack(dataCorrect);
  }

  getById = async () => {
    const { servicoSelected, servsDia } = this.state;

    try {
      const response = await apiAgendamento.get(
        `agendamento/${servicoSelected.id}`
      );

      let foundIndex = servsDia.agendamentos.findIndex(
        (x) => x.id == response.data.id
      );

      servsDia.agendamentos[foundIndex] = response.data;

      this.setState({
        servicoSelected: response.data,
      });
    } catch (err) {
      Alert.alert("Erro", JSON.stringify(err.data));
      console.log(err);
    }
  };

  alertConfirma() {
    Alert.alert(
      "Confirmar agendamento",
      "Deseja confirmar o agendamento do serviço?",
      [
        {
          text: "Não",
          onPress: console.log("Não"),
          style: "cancel",
        },
        { text: "Confirmar", onPress: () => this.confirmarAgendamento() },
      ]
    );
  }

  confirmarAgendamento = async () => {
    const { servicoSelected } = this.state;
    try {
      this.setState({
        loading: true,
      });
      const response = await apiAgendamento.post("/agendamento/confirmar", {
        id_agendamento: servicoSelected.id,
      });
      this.setState((prev) => ({
        servicoSelected: { ...prev.servicoSelected, status: "CONFIRMADO" },
      }));
      this.setState({ loading: false });
      Alert.alert("Confirmado!", "O agendamento foi confirmado com sucesso.");
      this.getById();
    } catch (err) {
      Alert.alert("Erro", JSON.stringify(err.data));
      console.log(err);
      this.setState({ loading: false });
    }
  };

  alertCancela() {
    Alert.alert(
      "Cancelar agendamento",
      "Deseja cancelar o agendamento do serviço?",
      [
        {
          text: "Não",
          onPress: console.log("Não"),
          style: "cancel",
        },
        { text: "Cancelar", onPress: () => this.cancelarAgendamento() },
      ]
    );
  }

  cancelarAgendamento = async () => {
    const { servicoSelected } = this.state;

    try {
      this.setState({
        loading: true,
      });
      const response = await apiAgendamento.post("/agendamento/cancelar", {
        id_agendamento: servicoSelected.id,
      });
      this.setState((prev) => ({
        servicoSelected: { ...prev.servicoSelected, status: "CANCELADO" },
      }));
      Alert.alert("Cancelado!", "O agendamento foi cancelado com sucesso.");
      this.setState({
        loading: false,
      });
      this.getById();
    } catch (err) {
      Alert.alert("Erro", JSON.stringify(err.data));
      console.log(err);
      this.setState({
        loading: false,
      });
    }
  };

  openEndereco() {
    const { servicoSelected, options } = this.state;

    options.dialogMessage = `Endereço:\n${
      servicoSelected.cliente.endereco.logradouro
    }, ${servicoSelected.cliente.endereco.numero}, ${
      servicoSelected.cliente.endereco.cidade
    }, ${servicoSelected.cliente.endereco.uf}, ${
      servicoSelected.cliente.endereco.complemento
        ? servicoSelected.cliente.endereco.complemento + ","
        : ""
    } ${servicoSelected.cliente.endereco.cep}`;
    options.title = `${servicoSelected.cliente.endereco.logradouro}, ${servicoSelected.cliente.endereco.numero}, ${servicoSelected.cliente.endereco.cidade}, ${servicoSelected.cliente.endereco.uf}, ${servicoSelected.cliente.endereco.cep}`;

    showLocation(options);
  }

  alertConcluido() {
    Alert.alert(
      "Concluir agendamento",
      "Confirmar significa que o serviço já foi prestado e será faturado.\n\n Deseja concluir?",
      [
        {
          text: "Não",
          onPress: console.log("Não"),
          style: "cancel",
        },
        { text: "Concluir", onPress: () => this.concluirAgendamento() },
      ]
    );
  }

  concluirAgendamento = async () => {
    const { servicoSelected } = this.state;

    try {
      this.setState({
        loading: true,
      });
      const response = await apiAgendamento.post("/agendamento/concluir", {
        id_agendamento: servicoSelected.id,
      });
      this.setState((prev) => ({
        servicoSelected: { ...prev.servicoSelected, status: "CONCLUIDO" },
      }));
      Alert.alert("Concluído!", "O agendamento foi concluído com sucesso.");
      this.setState({
        loading: false,
      });
      this.getById();
    } catch (err) {
      Alert.alert("Erro", JSON.stringify(err.data));
      console.log(err);
      this.setState({
        loading: false,
      });
    }
  };

  renderServices(serv) {
    return (
      <Block row card shadow color="#fffcfc" style={styles.serv}>
        <Block
          flex={0.25}
          card
          column
          color={serv.status === "CANCELADO" ? "orange" : "secondary"}
          style={styles.servStatus}
        >
          <Block
            flex={0.25}
            middle
            center
            color={
              serv.status === "CANCELADO"
                ? theme.colors.accent
                : theme.colors.primary
            }
          >
            <Text h4 white style={{ textTransform: "uppercase" }}>
              Horário
            </Text>
          </Block>
          <Block flex={0.7} center middle>
            <Text h2 white>
              {serv.data_hora.substring(11, 16)}
            </Text>
            <Text size={10} white>
              {serv.status}
            </Text>
          </Block>
        </Block>
        <Block flex={0.75} column middle>
          <Text h3 style={{ paddingVertical: 8 }}>
            Cliente: {serv.cliente.nome}
          </Text>
          <Text h3 style={{ paddingVertical: 8 }}>
            Serviço: {serv.servico.nome}
          </Text>
          <Text h3 style={{ paddingVertical: 8 }}>
            Valor: R$ {Number(serv.servico.preco).toFixed(2)}
          </Text>
        </Block>
      </Block>
    );
  }

  renderModal() {
    const { servicoSelected, servsDia, loading } = this.state;
    const { navigation } = this.props;

    const dataCorrect = new Date(servsDia.data_agendamento.substring(0, 10));
    navigation.state.params.onGoBack(dataCorrect);
    const horaCorrect = servicoSelected.data_hora
      ? servicoSelected.data_hora.substring(11, 16)
      : "00:00";
    return (
      <Modal
        animationType="slide"
        visible={this.state.showModal}
        onRequestClose={() => this.setState({ showModal: false })}
      >
        <Block
          padding={[theme.sizes.padding * 2, theme.sizes.padding]}
          space="between"
        >
          <Text h1 light>
            {servicoSelected.servico.nome} - {dataCorrect.getUTCDate()}/
            {dataCorrect.getUTCMonth() + 1}
          </Text>
          <ScrollView style={{ marginVertical: theme.sizes.padding }}>
            <Text h2 light style={{ marginBottom: theme.sizes.base }}>
              Cliente: {servicoSelected.cliente.nome}
            </Text>
            <Text h2>Descrição do Serviço:</Text>
            <Text h3 light style={{ marginBottom: theme.sizes.base }}>
              {servicoSelected.servico.descricao}
            </Text>
            <Text h2 style={{ marginBottom: theme.sizes.base }}>
              Horário: {horaCorrect}
            </Text>
            <Text h2>Status: {servicoSelected.status}</Text>
          </ScrollView>
          <Block middle padding={[theme.sizes.base / 2, 0]}>
            {servicoSelected.cliente.endereco.cep && (
              <Button gradient onPress={() => this.openEndereco()}>
                <Text bold white center>
                  Endereço do Cliente
                </Text>
              </Button>
            )}
            {servicoSelected.status === "PENDENTE" && (
              <Button gradient onPress={() => this.alertConfirma()}>
                {loading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text bold white center>
                    Confirmar
                  </Text>
                )}
              </Button>
            )}
            {servicoSelected.status === "CONFIRMADO" && (
              <Button gradient onPress={() => this.alertConcluido()}>
                {loading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text bold white center>
                    Concluído
                  </Text>
                )}
              </Button>
            )}
            {servicoSelected.status !== "CANCELADO" &&
              servicoSelected.status !== "CONCLUIDO" && (
                <Button color="accent" onPress={() => this.alertCancela()}>
                  {loading ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text bold white center>
                      Cancelar
                    </Text>
                  )}
                </Button>
              )}
            <Button
              color="orange"
              onPress={() => this.setState({ showModal: false })}
            >
              <Text center white>
                Voltar
              </Text>
            </Button>
          </Block>
        </Block>
      </Modal>
    );
  }

  renderServsDia() {
    const { servsDia } = this.state;
    return (
      <Block flex={0.8} column style={styles.servs}>
        <SafeAreaView style={styles.safe}>
          {servsDia.agendamentos.map((serv) => (
            <TouchableOpacity
              activeOpacity={0.8}
              key={`serv-${serv.id}`}
              onPress={() => {
                this.setState({ showModal: true, servicoSelected: serv });
              }}
            >
              {this.renderServices(serv)}
            </TouchableOpacity>
          ))}
        </SafeAreaView>
      </Block>
    );
  }

  render() {
    const { profile, navigation } = this.props;
    const { servsDia } = this.state;
    const dataCorrect = new Date(servsDia.data_agendamento.substring(0, 10));
    navigation.state.params.onGoBack(dataCorrect);
    return (
      <Block>
        <Block flex={false} row center space="between" style={styles.header}>
          <Text h1 bold>
            Agendamentos
          </Text>
          <Button onPress={() => navigation.navigate("Settings")}>
            <Image source={profile.avatar} style={styles.avatar} />
          </Button>
        </Block>
        <Block flex={false} row space="between" style={styles.servHeader}>
          <Text h1 light>
            Agenda - {dataCorrect.getUTCDate()}/{dataCorrect.getUTCMonth() + 1}
          </Text>
        </Block>
        <ScrollView showsHorizontalScrollIndicator={false}>
          {this.renderServsDia()}
        </ScrollView>
        {this.renderModal()}
      </Block>
    );
  }
}

ServicosDia.defaultProps = {
  profile: mocks.profile,
  agendamentos: mocks.agendamentos,
};

export default ServicosDia;

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
  servicos: {
    flexWrap: "wrap",
    paddingHorizontal: theme.sizes.base * 2,
    marginBottom: theme.sizes.base * 3.5,
  },
  servico: {
    // this should be dynamic based on screen width
    minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
  },
  servs: {
    marginTop: -55,
    paddingTop: 55 + 20,
    paddingHorizontal: 15,
    zIndex: -1,
  },
  servHeader: {
    paddingHorizontal: 20,
    paddingBottom: 2,
  },
  serv: {
    padding: 20,
    marginBottom: 15,
  },
  servStatus: {
    marginRight: 20,
    overflow: "hidden",
    height: 90,
  },
  safe: {
    flex: 1,
  },
});
