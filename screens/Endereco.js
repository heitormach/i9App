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
import { Picker } from "@react-native-community/picker";

import { Button, Block, Text, Input } from "../components";
import { theme, mocks } from "../constants";
const { width } = Dimensions.get("window");
import apiEndereco from "../services/apiEndereco";
import apiNegocio from "../services/apiNegocio";
import { AsyncStorage } from "react-native";

class Endereco extends Component {
  state = {
    endereco: {},
    usuario: {},
    loading: false,
    listaUF: [
      "AC",
      "AL",
      "AM",
      "AP",
      "BA",
      "CE",
      "DF",
      "ES",
      "GO",
      "MA",
      "MG",
      "MS",
      "MT",
      "PA",
      "PB",
      "PE",
      "PI",
      "PR",
      "RJ",
      "RN",
      "RO",
      "RR",
      "RS",
      "SC",
      "SE",
      "SP",
      "TO",
    ],
  };

  componentDidMount() {
    this.getEndereco();
  }

  getByCep = async (cep) => {
    const { endereco, usuario } = this.state;
    try {
      const response = await apiEndereco.get(cep + "/json");

      this.setState((prev) => ({
        endereco: {
          ...prev.endereco,
          cep: cep,
          logradouro: response.data.logradouro,
          bairro: response.data.bairro,
          uf: response.data.uf,
          cidade: response.data.localidade,
          cpf_proprietario: usuario.cpf,
        },
      }));
    } catch (err) {
      console.log(err);
    }
  };

  getEndereco = async () => {
    const usuario = JSON.parse(await AsyncStorage.getItem("@i9App:userDados"));
    this.setState({ usuario: usuario });

    try {
      const response = await apiNegocio.get(
        "estabelecimento/local/" + usuario.cpf
      );

      console.log(response.data);

      if (response.data) {
        this.setState({ endereco: response.data });
      } else {
        this.setState({
          endereco: {
            cpf_proprietario: usuario.cpf,
          },
        });
      }
    } catch (err) {
      console.log(err);
      Alert.alert("Erro", JSON.stringify(err.data));
      this.setState({
        endereco: {
          cpf_proprietario: usuario.cpf,
        },
      });
    }
  };

  saveEndereco = async () => {
    const { endereco } = this.state;
    try {
      this.setState({ loading: true });
      const response = await apiNegocio.patch(
        "estabelecimento/local",
        endereco
      );
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
    const { endereco, loading, listaUF } = this.state;
    return (
      <Block>
        <Block flex={false} row center space="between" style={styles.header}>
          <Text h1 bold>
            Endereço
          </Text>
          <Button onPress={() => navigation.navigate("Settings")}>
            <Image source={profile.avatar} style={styles.avatar} />
          </Button>
        </Block>
        <ScrollView showsHorizontalScrollIndicator={false}>
          <KeyboardAvoidingView>
            <Block style={styles.inputs}>
              <Input
                label="CEP"
                style={[styles.input]}
                defaultValue={endereco.cep}
                onBlur={() => this.getByCep(endereco.cep)}
                onChangeText={(text) =>
                  this.setState((prev) => ({
                    endereco: {
                      ...prev.endereco,
                      cep: text,
                    },
                  }))
                }
              />
              <Input
                label="Rua"
                number
                style={[styles.input]}
                defaultValue={endereco.logradouro}
                onChangeText={(text) =>
                  this.setState((prev) => ({
                    endereco: {
                      ...prev.endereco,
                      logradouro: text,
                    },
                  }))
                }
              />
              <Input
                label="Número"
                number
                style={[styles.input]}
                defaultValue={String(endereco.numero ? endereco.numero : "")}
                onChangeText={(text) =>
                  this.setState((prev) => ({
                    endereco: {
                      ...prev.endereco,
                      numero: text,
                    },
                  }))
                }
              />
              <Input
                label="Bairro"
                style={[styles.input]}
                defaultValue={endereco.bairro}
                onChangeText={(text) =>
                  this.setState((prev) => ({
                    endereco: {
                      ...prev.endereco,
                      bairro: text,
                    },
                  }))
                }
              />
              <Input
                label="Complemento"
                style={[styles.input]}
                defaultValue={endereco.complemento}
                onChangeText={(text) =>
                  this.setState((prev) => ({
                    endereco: {
                      ...prev.endereco,
                      complemento: text,
                    },
                  }))
                }
              />
              <Block>
                <Text gray2>Estado</Text>
                <Picker
                  style={{
                    height: 50,
                    width: 150,
                  }}
                  selectedValue={endereco.uf}
                  onValueChange={(v) =>
                    this.setState((prev) => ({
                      endereco: { ...prev.endereco, uf: v },
                    }))
                  }
                  itemStyle={{ fontSize: 20 }}
                >
                  {listaUF.map((uf) => (
                    <Picker.Item key={`${uf}`} label={uf} value={uf} />
                  ))}
                </Picker>
              </Block>
              <Input
                label="Cidade"
                style={[styles.input]}
                defaultValue={endereco.cidade}
                onChangeText={(text) =>
                  this.setState((prev) => ({
                    endereco: {
                      ...prev.endereco,
                      cidade: text,
                    },
                  }))
                }
              />
              <Button gradient onPress={() => this.saveEndereco()}>
                {loading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text bold white center>
                    Salvar
                  </Text>
                )}
              </Button>
            </Block>
          </KeyboardAvoidingView>
        </ScrollView>
      </Block>
    );
  }
}

Endereco.defaultProps = {
  profile: mocks.profile,
};

export default Endereco;

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
  endereco: {
    flexWrap: "wrap",
    paddingHorizontal: theme.sizes.base * 2,
    marginBottom: theme.sizes.base * 3.5,
  },
  endereco: {
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
