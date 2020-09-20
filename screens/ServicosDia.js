import React, { Component } from "react";
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Modal,
} from "react-native";

import { Card, Badge, Button, Block, Text, Switch } from "../components";
import { theme, mocks } from "../constants";
const { width } = Dimensions.get("window");

class ServicosDia extends Component {
  state = {
    servsDia: this.props.navigation.state.params.servsDia,
    isDateTimePickerVisible: false,
    showModal: false,
    horaSelected: {},
    showTimePicker: false,
    servicoSelected: {},
  };

  componentDidMount() {
    this.setState({ servsDia: this.props.navigation.state.params.servsDia });
  }

  renderServices(serv) {
    return (
      <Block row card shadow color="white" style={styles.serv}>
        <Block
          flex={0.25}
          card
          column
          color="secondary"
          style={styles.servStatus}
        >
          <Block flex={0.25} middle center color={theme.colors.primary}>
            <Text h4 white style={{ textTransform: "uppercase" }}>
              Horário
            </Text>
          </Block>
          <Block flex={0.7} center middle>
            <Text h2 white>
              {serv.hora}
            </Text>
            <Text h4 white>
              {serv.concluido && "Atendido"}
              {!serv.concluido && "Em Aberto"}
            </Text>
          </Block>
        </Block>
        <Block flex={0.75} column middle>
          <Text h3 style={{ paddingVertical: 8 }}>
            Cliente: {serv.cliente}
          </Text>
          <Text h3 style={{ paddingVertical: 8 }}>
            Serviço: {serv.nome}
          </Text>
          <Text h3 style={{ paddingVertical: 8 }}>
            Valor: R$ {serv.preco}.00
          </Text>
        </Block>
      </Block>
    );
  }

  renderModal() {
    const { servicoSelected, servsDia } = this.state;
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
            {servicoSelected.nome} - {servsDia.dia}/{servsDia.mes}
          </Text>
          <ScrollView style={{ marginVertical: theme.sizes.padding }}>
            <Text h2 light style={{ marginBottom: theme.sizes.base }}>
              Cliente: {servicoSelected.cliente}
            </Text>
            <Text h2>Descrição do Serviço:</Text>
            <Text h3 light style={{ marginBottom: theme.sizes.base }}>
              {servicoSelected.descricao}
            </Text>
            <Text h2 style={{ marginBottom: theme.sizes.base }}>
              Horário: {servicoSelected.hora}
            </Text>
            <Text h2>
              Status: {servicoSelected.concluido && "Atendido"}{" "}
              {!servicoSelected.concluido && "Em aberto"}
            </Text>
          </ScrollView>
          <Block middle padding={[theme.sizes.base / 2, 0]}>
            <Button
              gradient
              onPress={() => this.setState({ showModal: false })}
            >
              <Text center white>
                Concluído
              </Text>
            </Button>
            <Button
              color="accent"
              onPress={() => this.setState({ showModal: false })}
            >
              <Text center white>
                Cancelar Serviço
              </Text>
            </Button>
            <Button
              color="primary"
              onPress={() => this.setState({ showModal: false })}
            >
              <Text center white>
                Fechar
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
          {servsDia.servicos.map((serv) => (
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
            Agenda - {servsDia.dia}/{servsDia.mes}
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
