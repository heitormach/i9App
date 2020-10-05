import React, { Component } from "react";
import { Button, Block, Text, Card, Switch, Input } from "../components";
import {
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
} from "react-native";
import { theme, mocks } from "../constants";
// import { Container } from './styles';

const { width } = Dimensions.get("window");

class Contatos extends Component {
  state = {
    active: "Geral",
    contatos: [],
    estabelecimento: {},
    visibleModal: false,
    contatoSelecionado: {},
  };

  componentDidMount = () => {
    // this.setState({ contatos: this.props.contatos });
  };

  setModal = (contatoSelecionado) => {
    if (contatoSelecionado === {}) {
      this.state.contatoSelecionado = {
        ddd: null,
        numero: null,
        ind_whatsapp: false,
      };
    } else {
      this.state.contatoSelecionado = contatoSelecionado;
    }

    console.log(contatoSelecionado);
    this.setState({ visibleModal: true });
  };

  renderContatoForm() {
    const { contatoSelecionado } = this.state;
    return (
      <Modal
        animationType="slide"
        visible={this.state.visibleModal}
        onRequestClose={() => this.setState({ visibleModal: false })}
      >
        <Block>
          <Block flex={false} row center space="between" style={styles.header}>
            <Text h1 bold>
              Novo Contato
            </Text>
          </Block>

          <ScrollView showsVerticalScrollIndicator={false}>
            <Block style={styles.inputs}>
              <Input
                label="DDD"
                number
                style={[styles.input]}
                defaultValue={
                  contatoSelecionado.ddd ? String(contatoSelecionado.ddd) : ""
                }
                onChangeText={(text) =>
                  this.setState((prev) => ({
                    contatoSelecionado: {
                      ...prev.contatoSelecionado,
                      ddd: text,
                    },
                  }))
                }
              />
              <Input
                label="Número"
                number
                style={[styles.input]}
                defaultValue={
                  contatoSelecionado.numero
                    ? String(contatoSelecionado.numero)
                    : ""
                }
                onChangeText={(text) =>
                  this.setState((prev) => ({
                    contatoSelecionado: {
                      ...prev.contatoSelecionado,
                      numero: text,
                    },
                  }))
                }
              />
              <Block style={styles.toggles}>
                <Block
                  row
                  center
                  space="between"
                  style={{ marginBottom: theme.sizes.base * 2 }}
                >
                  <Text gray2>Este número é WhatsApp</Text>
                  <Switch
                    value={contatoSelecionado.ind_whatsapp}
                    onValueChange={(value) =>
                      this.setState((prev) => ({
                        contatoSelecionado: {
                          ...prev.contatoSelecionado,
                          ind_whatsapp: value,
                        },
                      }))
                    }
                  />
                </Block>
              </Block>
              <Block middle padding={[theme.sizes.base / 2, 0]}>
                <Button
                  gradient
                  onPress={() => this.setState({ visibleModal: false })}
                >
                  <Text center white>
                    Salvar
                  </Text>
                </Button>
                <Button
                  color="accent"
                  onPress={() => this.setState({ visibleModal: false })}
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
    const { contatos } = this.state;

    return (
      <Block>
        <Block flex={false} row center space="between" style={styles.header}>
          <Text h1 bold>
            Contatos
          </Text>
          <Button onPress={() => navigation.navigate("Settings")}>
            <Image source={profile.avatar} style={styles.avatar} />
          </Button>
        </Block>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingVertical: theme.sizes.base * 2 }}
        >
          <Block flex={false} row space="between" style={styles.contatos}>
            {contatos.length > 0 &&
              contatos.map((contato) => (
                <TouchableOpacity
                  onPress={() => this.setModal(contato)}
                  key={contato.numero}
                >
                  <Card center middle shadow style={styles.contato}>
                    <Text center medium height={20}>
                      {contato.ddd} - {contato.numero}
                    </Text>
                    {contato.ind_whatsapp && (
                      <Text center medium color="green">
                        WhatsApp
                      </Text>
                    )}
                  </Card>
                </TouchableOpacity>
              ))}
            {contatos.length === 0 && (
              <Block>
                <Text style={{ marginBottom: 50 }} center medium height={20}>
                  Aqui você pode cadastrar números para os clientes entrarem
                  em contato com você!
                </Text>
                <Text center medium height={20}>
                  Clique no + para criar um novo.
                </Text>
              </Block>
            )}
          </Block>
        </ScrollView>
        <TouchableOpacity onPress={() => this.setModal({})} style={styles.fab}>
          <Text style={styles.fabIcon}>+</Text>
        </TouchableOpacity>
        {this.renderContatoForm()}
      </Block>
    );
  }
}

Contatos.defaultProps = {
  profile: mocks.profile,
};

export default Contatos;

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
  contatos: {
    flexWrap: "wrap",
    paddingHorizontal: theme.sizes.base * 2,
    marginBottom: theme.sizes.base * 3.5,
  },
  inputs: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2,
  },
  FlatList: {
    flex: 1,
    marginTop: 5,
  },
  ContainerView: {
    marginBottom: 15,
    padding: 15,
    borderRadius: 4,
    backgroundColor: "#eee",

    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#eee",
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
  contato: {
    // this should be dynamic based on screen width
    minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  toggles: {
    paddingHorizontal: theme.sizes.base * 2,
  },
});
