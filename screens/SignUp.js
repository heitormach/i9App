import React, { Component } from "react";
import {
  Alert,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import { Button, Block, Input, Text, Switch } from "../components";
import { theme } from "../constants";
import DateTimePicker from "@react-native-community/datetimepicker";
const { width } = Dimensions.get("window");

export default class SignUp extends Component {
  state = {
    email: null,
    username: null,
    password: null,
    errors: [],
    loading: false,
    contato: {
      celular: {
        ddd: 0,
        numero: 0,
      },
      email: "",
    },
    cpf: "",
    dados_login: {
      login: "",
      senha: "",
    },
    data_nascimento: new Date(),
    ind_whatsapp: false,
    nome_completo: "",
    tipo_usuario: "PRESTADOR",
    show: false,
    mode: "date",
  };

  setShow = (type) => {
    this.setState({ show: type });
  };

  onChange = (event, date) => {
    this.setShow(false);
    const currentDate = date;
    this.setState({ data_nascimento: new Date(date) });
  };

  setMode = (currentMode) => {
    this.setState({ mode: currentMode });
  };
  showMode = (currentMode) => {
    this.setShow(true);
    this.setMode(currentMode);
  };

  showDatepicker = () => {
    this.setShow(true);
    this.setState({ mode: "date" });
  };

  handleSignUp = () => {
    console.log(this.state);
    const { navigation } = this.props;
    const { email, username, password } = this.state;
    const errors = [];

    Keyboard.dismiss();
    this.setState({ loading: true });

    // check with backend API or with some static data
    if (!email) errors.push("email");
    if (!username) errors.push("username");
    if (!password) errors.push("password");

    this.setState({ errors, loading: false });

    if (!errors.length) {
      Alert.alert(
        "Success!",
        "Your account has been created",
        [
          {
            text: "Continue",
            onPress: () => {
              navigation.navigate("Browse");
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  onChangeNumber = (text) => {
    return text && text.replace(/[^0-9]/g, "");
  };

  render() {
    const { navigation } = this.props;
    const { loading, errors } = this.state;
    const hasErrors = (key) => (errors.includes(key) ? styles.hasErrors : null);

    return (
      <KeyboardAvoidingView style={styles.signup} behavior="padding">
        <Block flex={false} row center space="between" style={styles.header}>
          <Text h1 bold>
            Cadastro
          </Text>
        </Block>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Block middle style={styles.inputs}>
            <Input
              email
              label="Email"
              error={hasErrors("email")}
              style={[styles.input, hasErrors("email")]}
              defaultValue={this.state.email}
              onChangeText={(text) => {
                this.state.email = text;
                this.state.contato.email = text;
                this.state.dados_login.login = text;
              }}
            />
            <Input
              label="Nome Completo"
              error={hasErrors("nome_completo")}
              style={[styles.input, hasErrors("nome_completo")]}
              defaultValue={this.state.nome_completo}
              onChangeText={(text) => this.setState({ nome_completo: text })}
            />
            <Input
              label="CPF/CNPJ"
              error={hasErrors("cpf")}
              style={[styles.input, hasErrors("cpf")]}
              defaultValue={this.state.cpf}
              onChangeText={(text) => this.setState({ cpf: text })}
            />
            <TouchableOpacity onPress={() => this.showDatepicker()}>
              <Input
                label="Data de Nascimento"
                style={[styles.input]}
                value={this.state.data_nascimento.toString()}
                disabled={true}
              ></Input>
            </TouchableOpacity>
            {this.state.show && (
              <DateTimePicker
                value={this.state.data_nascimento}
                mode={this.state.mode}
                display="calendar"
                onChange={(event, date) => this.onChange(event, date)}
              />
            )}
            <Input
              label="DDD"
              style={[styles.input]}
              defaultValue={this.state.contato.celular.ddd}
              onChangeText={(text) =>
                (this.state.contato.celular.ddd = this.onChangeNumber(text))
              }
            />
            <Input
              label="Celular"
              style={[styles.input]}
              defaultValue={this.state.contato.celular.numero}
              value={this.onChangeNumber()}
              onChangeText={(text) =>
                (this.state.contato.celular.numero = this.onChangeNumber(text))
              }
            />
            <Block
              row
              center
              space="between"
              style={{ marginBottom: theme.sizes.base * 2 }}
            >
              <Text gray2>O número informado é WhatsApp?</Text>
              <Switch
                value={this.state.ind_whatsapp}
                onValueChange={(value) =>
                  this.setState({
                    ind_whatsapp: value,
                  })
                }
              />
            </Block>
            <Input
              secure
              label="Senha"
              error={hasErrors("password")}
              style={[styles.input, hasErrors("password")]}
              defaultValue={this.state.senha}
              onChangeText={(text) => (this.state.dados_login.senha = text)}
            />
            <Button gradient onPress={() => this.handleSignUp()}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text bold white center>
                  Entrar
                </Text>
              )}
            </Button>

            <Button onPress={() => navigation.navigate("Login")}>
              <Text
                gray
                center
                caption
                style={{ textDecorationLine: "underline" }}
              >
                Voltar para Login
              </Text>
            </Button>
          </Block>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  signup: {
    flex: 1,
    justifyContent: "center",
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
  hasErrors: {
    borderBottomColor: theme.colors.accent,
  },
  header: {
    paddingHorizontal: theme.sizes.base * 2,
  },
  category: {
    // this should be dynamic based on screen width
    minWidth: (width - theme.sizes.padding * 4 - theme.sizes.base) / 2,
    maxWidth: (width - theme.sizes.padding * 4 - theme.sizes.base) / 2,
    maxHeight: (width - theme.sizes.padding * 4 - theme.sizes.base) / 2,
  },
});
