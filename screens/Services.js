import React, { Component } from "react";
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Modal,
  View,
  TextInput,
} from "react-native";

import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import { Card, Button, Block, Text, Input } from "../components";
import { theme, mocks } from "../constants";
import { services } from "../constants/mocks";
const { width } = Dimensions.get("window");

class Services extends Component {
  state = {
    servicos: [],
    showService: false,
    serviceSelected: {},
  };

  componentDidMount() {
    this.setState({ services: this.props.services });
  }

  selectService(service) {
    this.setState({ serviceSelected: service, showService: true });
    console.log(service);
  }

  renderSelectedService() {
    return (
      <Modal
        animationType="slide"
        visible={this.state.showService}
        onRequestClose={() => this.setState({ showService: false })}
      >
        <KeyboardAvoidingView style={styles.keyavoid}>
          <Block
            padding={[theme.sizes.padding * 2, theme.sizes.padding]}
            space="between"
          >
            <Text h2 light>
              {this.state.serviceSelected.nome}
            </Text>
            <Block>
              <ScrollView style={{ marginVertical: theme.sizes.padding }}>
                <Block middle style={styles.inputs}>
                  <Input
                    multiline={true}
                    numberOfLines={10}
                    label="Descrição"
                    style={[styles.input]}
                    defaultValue={this.state.serviceSelected.descricao}
                    onChangeText={(text) => {
                      this.state.serviceSelected.descricao = text;
                    }}
                  />
                  <Input
                    number
                    label="Preço (R$)"
                    style={[styles.input]}
                    defaultValue={String(this.state.serviceSelected.preco)}
                    onChangeText={(text) => {
                      this.state.serviceSelected.preco = Number(text);
                    }}
                  />
                </Block>
              </ScrollView>
            </Block>
            <Block middle padding={[theme.sizes.base / 2, 0]}>
              <Button
                gradient
                onPress={() => this.setState({ showService: false })}
              >
                <Text center white>
                  Salvar
                </Text>
              </Button>
              <Button
                color="accent"
                onPress={() => this.setState({ showService: false })}
              >
                <Text center white>
                  Excluir
                </Text>
              </Button>
            </Block>
          </Block>
        </KeyboardAvoidingView>
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
        <KeyboardAvoidingView>
          <View style={styles.Form}>
            <TextInput
              style={styles.Input}
              placeholderTextColor="#999"
              autoCorrect={true}
              placeholder="Pesquisar"
              maxLength={25}
            />
            <TouchableOpacity style={styles.Button}>
              <Ionicons name="ios-add" size={20} color="white" />
            </TouchableOpacity>
          </View>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            style={{ paddingVertical: theme.sizes.base * 2 }}
          >
            <Block flex={false} row space="between" style={styles.servicos}>
              {services.map((service) => (
                <TouchableOpacity
                  onPress={() => this.selectService(service)}
                  key={service.nome}
                >
                  <Card center middle shadow style={styles.servico}>
                    <Text medium height={20}>
                      {service.nome}
                    </Text>
                    <Text medium height={20}>
                      R$ {Number(service.preco)}
                    </Text>
                  </Card>
                </TouchableOpacity>
              ))}
            </Block>
          </ScrollView>
          {this.renderSelectedService()}
        </KeyboardAvoidingView>
      </Block>
    );
  }
}

Services.defaultProps = {
  profile: mocks.profile,
  services: mocks.services,
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
  Form: {
    padding: theme.sizes.base * 2,
    height: 60,
    justifyContent: "center",
    alignSelf: "stretch",
    flexDirection: "row",
    paddingTop: 13,
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  Input: {
    flex: 1,
    height: 40,
    backgroundColor: "#eee",
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  Button: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1c6cce",
    borderRadius: 4,
    marginLeft: 10,
  },
});
