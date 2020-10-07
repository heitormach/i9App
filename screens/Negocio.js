import React, { Component } from "react";
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
} from "react-native";

import { Button, Block, Text, Switch, Input } from "../components";
import { theme, mocks } from "../constants";
const { width } = Dimensions.get("window");
import apiNegocio from "../services/apiNegocio";
import { AsyncStorage } from "react-native";

class Negocio extends Component {
  state = {
    negocio: {},
    usuario: {},
    loading: false,
  };

  componentDidMount() {
    this.getNegocio();
  }

  getNegocio = async () => {
    const usuario = JSON.parse(await AsyncStorage.getItem("@i9App:userDados"));
    try {
      this.setState({ usuario: usuario, loading: true });
      const response = await apiNegocio.get("estabelecimento/" + usuario.cpf);
      if (response.data) {
        this.setState({ negocio: response.data });
      } else {
        this.setState({
          negocio: {
            cpf_proprietario: usuario.cpf,
          },
        });
      }
      this.setState({ loading: false });
    } catch (err) {
      console.log(err.data);
      Alert.alert("Erro", JSON.stringify(err.data));
      this.setState({
        loading: false,
        negocio: {
          cpf_proprietario: usuario.cpf,
        },
      });
      this.setState({ loading: false });
    }
  };

  saveNegocio = async () => {
    const { negocio } = this.state;
    try {
      this.setState({ loading: true });
      const response = await apiNegocio.patch("estabelecimento", {
        nome: negocio.nome,
        cpf_proprietario: negocio.cpf_proprietario,
        cnpj: negocio.cnpj,
        atendimento_domiciliar: negocio.atendimento_domiciliar,
      });
      this.setState({ loading: false });
      Alert.alert("Salvo!", "Dados salvos com sucesso.");
    } catch (err) {
      this.setState({ loading: false });
      Alert.alert("Erro", JSON.stringify(err.data));
      console.log(err);
    }
  };

  render() {
    const { profile, navigation } = this.props;
    const { negocio, loading } = this.state;
    return (
      <Block>
        <Block flex={false} row center space="between" style={styles.header}>
          <Text h1 bold>
            Dados do Negócio
          </Text>
          <Button onPress={() => navigation.navigate("Settings")}>
            <Image source={profile.avatar} style={styles.avatar} />
          </Button>
        </Block>
        <KeyboardAvoidingView>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            style={{ paddingVertical: theme.sizes.base * 2 }}
          >
            {loading ? (
              <ActivityIndicator size="large" color="green" />
            ) : (
              <Block style={styles.inputs}>
                <Input
                  label="Nome do Negócio"
                  style={[styles.input]}
                  defaultValue={negocio.nome}
                  onChangeText={(text) =>
                    this.setState((prev) => ({
                      negocio: {
                        ...prev.negocio,
                        nome: text,
                      },
                    }))
                  }
                />
                <Input
                  label="CNPJ (Não obrigatório)"
                  style={[styles.input]}
                  defaultValue={negocio.cnpj}
                  onChangeText={(text) =>
                    this.setState((prev) => ({
                      negocio: {
                        ...prev.negocio,
                        cnpj: text,
                      },
                    }))
                  }
                />
                <Block
                  row
                  center
                  space="between"
                  style={{ marginBottom: theme.sizes.base * 2 }}
                >
                  <Text gray2>Faço atendimento em domicílio</Text>
                  <Switch
                    value={negocio.atendimento_domiciliar}
                    onValueChange={(value) =>
                      this.setState((prev) => ({
                        negocio: {
                          ...prev.negocio,
                          atendimento_domiciliar: value,
                        },
                      }))
                    }
                  />
                </Block>
                <Button gradient onPress={() => this.saveNegocio()}>
                  {loading ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text bold white center>
                      Salvar
                    </Text>
                  )}
                </Button>
              </Block>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </Block>
    );
  }
}

Negocio.defaultProps = {
  profile: mocks.profile,
};

export default Negocio;

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
  Negocio: {
    flexWrap: "wrap",
    paddingHorizontal: theme.sizes.base * 2,
    marginBottom: theme.sizes.base * 3.5,
  },
  negocio: {
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
  inputs: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2,
  },
});
