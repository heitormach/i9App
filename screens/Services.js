import React, { Component } from "react";
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  ActivityIndicator,
  Alert,
} from "react-native";

import { Card, Button, Block, Text, Input } from "../components";
import { theme, mocks } from "../constants";
const { width } = Dimensions.get("window");
import apiNegocio from "../services/apiNegocio";
import { AsyncStorage } from "react-native";

class Services extends Component {
  state = {
    servicos: [],
    showService: false,
    serviceSelected: {
      servico: {},
    },
    servicoNovo: false,
    usuario: {},
    loading: false,
  };

  componentDidMount() {
    // this.setState({ services: this.props.services });
    this.getServicos();
  }

  getServicos = async () => {
    const usuario = JSON.parse(await AsyncStorage.getItem("@i9App:userDados"));
    this.setState({ usuario: usuario });
    try {
      const response = await apiNegocio.get("estabelecimento/servico");
      this.setState({ servicos: response.data });
    } catch (err) {
      console.log(err);
      Alert.alert("Erro", JSON.stringify(err.data));
    }
  };

  saveServico = async () => {
    const { serviceSelected } = this.state;
    try {
      this.setState({ loading: true });
      const response = await apiNegocio.patch(
        "estabelecimento/servico",
        serviceSelected
      );
      this.setState({ loading: false, showService: false });
      Alert.alert("Salvo!", "Dados salvos com sucesso.");
      this.getServicos();
    } catch (err) {
      this.setState({ loading: false });
      Alert.alert("Erro", JSON.stringify(err.data));
      console.log(err);
    }
  };

  deleteAlert() {
    const { serviceSelected } = this.state;
    Alert.alert(
      "Excluir contato",
      `Deseja realmente excluir o serviço ${serviceSelected.servico.nome}?`,
      [
        {
          text: "Não",
          onPress: () => console.log("Não excluir"),
          style: "cancel",
        },
        {
          text: "Excluir",
          onPress: () => this.deleteServico(),
        },
      ]
    );
  }

  deleteServico = async () => {
    const { serviceSelected } = this.state;

    try {
      this.setState({ loading: true });

      const response = await apiNegocio.delete(
        "/estabelecimento/servico/" + serviceSelected.id
      );

      Alert.alert("Excluído", "Serviço excluído com sucesso!");

      this.setState({ loading: false, showService: false });

      this.getServicos();
    } catch (err) {
      Alert.alert("ERRO", JSON.stringify(err.data));
      console.log(err);
      this.setState({ loading: false });
    }
  };

  setModal = (servicoSelecionado) => {
    const { usuario, serviceSelected } = this.state;
    if (JSON.stringify(servicoSelecionado) === "{}") {
      this.setState({ servicoNovo: true });
      this.setState({
        serviceSelected: {
          cpfProprietario: usuario.cpf,
          id: null,
          servico: {
            descricao: null,
            nome: null,
            preco: 0,
          },
        },
      });

      console.log();
    } else {
      this.setState({
        servicoNovo: false,
        serviceSelected: servicoSelecionado,
      });
    }
    this.setState({ showService: true });
  };

  renderSelectedService() {
    const { serviceSelected, loading, servicoNovo } = this.state;
    return (
      <Modal
        animationType="slide"
        visible={this.state.showService}
        onRequestClose={() => this.setState({ showService: false })}
      >
        <Block>
          <Block flex={false} row center space="between" style={styles.header}>
            {servicoNovo && (
              <Text h1 bold>
                Novo Serviço
              </Text>
            )}
            {!servicoNovo && (
              <Text h1 bold>
                Dados do Serviço
              </Text>
            )}
          </Block>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Block style={styles.inputs}>
              <Input
                label="Nome"
                style={[styles.input]}
                defaultValue={serviceSelected.servico.nome}
                onChangeText={(text) =>
                  this.setState((prev) => ({
                    serviceSelected: {
                      ...prev.serviceSelected,
                      servico: {
                        ...prev.serviceSelected.servico,
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
                defaultValue={serviceSelected.servico.descricao}
                onChangeText={(text) =>
                  this.setState((prev) => ({
                    serviceSelected: {
                      ...prev.serviceSelected,
                      servico: {
                        ...prev.serviceSelected.servico,
                        descricao: text,
                      },
                    },
                  }))
                }
              />
              <Input
                number
                label="Preço (R$)"
                style={[styles.input]}
                defaultValue={String(
                  serviceSelected.servico.preco
                    ? Number(serviceSelected.servico.preco).toFixed(2)
                    : "0.00"
                )}
                onChangeText={(text) =>
                  this.setState((prev) => ({
                    serviceSelected: {
                      ...prev.serviceSelected,
                      servico: {
                        ...prev.serviceSelected.servico,
                        preco: text,
                      },
                    },
                  }))
                }
              />
              <Block middle padding={[theme.sizes.base / 2, 0]}>
                <Button gradient onPress={() => this.saveServico()}>
                  {loading ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text bold white center>
                      Salvar
                    </Text>
                  )}
                </Button>
                {!servicoNovo && (
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
                  onPress={() => this.setState({ showService: false })}
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

  render() {
    const { profile, navigation } = this.props;
    const { servicos } = this.state;
    return (
      <Block>
        <Block flex={false} row center space="between" style={styles.header}>
          <Text h1 bold>
            Serviços
          </Text>
          <Button onPress={() => navigation.navigate("Settings")}>
            <Image source={profile.avatar} style={styles.avatar} />
          </Button>
        </Block>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          style={{ paddingVertical: theme.sizes.base * 2 }}
        >
          {servicos.length > 0 && (
            <Block flex={false} row space="between" style={styles.servicos}>
              {servicos.map((service) => (
                <TouchableOpacity
                  onPress={() => this.setModal(service)}
                  key={service.servico.nome}
                >
                  <Card
                    color="#fffcfc"
                    center
                    middle
                    shadow
                    style={styles.servico}
                  >
                    <Text center medium height={20}>
                      {service.servico.nome}
                    </Text>
                    <Text medium height={20}>
                      R$ {Number(service.servico.preco).toFixed(2)}
                    </Text>
                  </Card>
                </TouchableOpacity>
              ))}
            </Block>
          )}
          {servicos.length === 0 && (
            <Block>
              <Text style={{ marginBottom: 50 }} center medium height={20}>
                Aqui você pode cadastrar os serviços que são prestados no seu
                negócio.
              </Text>
              <Text center medium height={20}>
                Clique no + para criar um novo.
              </Text>
            </Block>
          )}
        </ScrollView>
        <TouchableOpacity onPress={() => this.setModal({})} style={styles.fab}>
          <Text style={styles.fabIcon}>+</Text>
        </TouchableOpacity>
        {this.renderSelectedService()}
      </Block>
    );
  }
}

Services.defaultProps = {
  profile: mocks.profile,
};

export default Services;

const styles = StyleSheet.create({
  keyavoid: {
    flex: 1,
    justifyContent: "center",
  },
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
  inputs: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2,
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
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
});
