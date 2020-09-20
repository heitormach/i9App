import React, { Component } from "react";
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Image,
  SafeAreaView,
  View,
} from "react-native";

import { Card, Badge, Button, Block, Text, Switch } from "../components";
import { theme, mocks } from "../constants";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker, Item } from "@react-native-community/picker";
import moment from "moment";
const { width } = Dimensions.get("window");

class Agendamento extends Component {
  state = {
    agendamentos: [],
    isDateTimePickerVisible: false,
    agenduramentoSelected: {},
    showWeek: false,
    horaSelected: {},
    showTimePicker: false,
    meses: [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ],
    mesSelected: null,
  };

  componentDidMount() {
    this.setState({ agends: this.props.agends });
  }

  selectWeekDay(agenduramento) {
    this.setState({ agenduramentoSelected: agenduramento, showWeek: true });
  }

  horaSelected(agenduramento, tipo) {
    this.setState({
      horaSelected: { hora: agenduramento, tipo: tipo },
      showTimePicker: true,
    });
  }

  handleTime(event, date, tipo) {
    this.setState({ showTimePicker: false });
    if (tipo === "ini") {
      this.state.agenduramentoSelected.horaIni = new Date(date);
    } else {
      this.state.agenduramentoSelected.horaFim = new Date(date);
    }
  }

  renderSelectTimeWeek() {
    return (
      <Modal
        animationType="slide"
        visible={this.state.showWeek}
        onRequestClose={() => this.setState({ showWeek: false })}
      >
        <Block
          padding={[theme.sizes.padding * 2, theme.sizes.padding]}
          space="between"
        >
          <Text h2 light>
            {this.state.agenduramentoSelected.name}
          </Text>
          <ScrollView style={{ marginVertical: theme.sizes.padding }}>
            <TouchableOpacity
              onPress={() =>
                this.horaSelected(
                  this.state.agenduramentoSelected.horaIni,
                  "ini"
                )
              }
            >
              <Text
                h2
                light
                size={15}
                style={{ marginBottom: theme.sizes.base }}
              >
                Horário de Início:
                {moment(
                  new Date(this.state.agenduramentoSelected.horaIni)
                ).format("HH:mm")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.horaSelected(
                  this.state.agenduramentoSelected.horaFim,
                  "fim"
                )
              }
            >
              <Text
                h2
                light
                size={15}
                style={{ marginBottom: theme.sizes.base }}
              >
                Horário de Término:
                {moment(
                  new Date(this.state.agenduramentoSelected.horaFim)
                ).format("HH:mm")}
              </Text>
            </TouchableOpacity>
            {this.state.showTimePicker && (
              <DateTimePicker
                value={new Date(this.state.horaSelected.hora)}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={(event, date) =>
                  this.handleTime(event, date, this.state.horaSelected.tipo)
                }
              />
            )}
            <Block
              row
              center
              space="between"
              style={{ marginBottom: theme.sizes.base * 2 }}
            >
              <Text gray2>Não trabalho</Text>
              <Switch
                value={this.state.agenduramentoSelected.naoTrab}
                onValueChange={(value) =>
                  (this.state.agenduramentoSelected.naoTrab = value)
                }
              />
            </Block>
          </ScrollView>
          <Block middle padding={[theme.sizes.base / 2, 0]}>
            <Button gradient onPress={() => this.setState({ showWeek: false })}>
              <Text center white>
                Salvar
              </Text>
            </Button>
          </Block>
        </Block>
      </Modal>
    );
  }

  renderAgend(agend) {
    return (
      <Block row card shadow color="white" style={styles.agend}>
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
              {agend.dia}
            </Text>
          </Block>
        </Block>
        <Block flex={0.75} column middle>
          <Text h3 style={{ paddingVertical: 8 }}>
            Serviços: {agend.servicos.length}
          </Text>
          <Text h4 style={{ paddingVertical: 8 }}>
            (Aperte para visualizar)
          </Text>
        </Block>
      </Block>
    );
  }

  renderAgends() {
    const { agendamentos, navigation } = this.props;
    return (
      <Block flex={0.8} column style={styles.agends}>
        <SafeAreaView style={styles.safe}>
          {agendamentos.map((agend) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ServicosDia", { servsDia: agend })
              }
              activeOpacity={0.8}
              key={`agend-${agend.id}`}
            >
              {this.renderAgend(agend)}
            </TouchableOpacity>
          ))}
        </SafeAreaView>
      </Block>
    );
  }

  render() {
    const { profile, navigation } = this.props;
    const { meses } = this.state;
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
        <Block flex={false} row space="between" style={styles.agendHeader}>
          <Picker
            selectedValue={meses[7]}
            onValueChange={(v) => this.setState({ mesSelected: v })}
          >
            {meses.map((mes) => (
              <Item label={mes} value={mes} />
            ))}
          </Picker>
        </Block>
        <ScrollView showsHorizontalScrollIndicator={false}>
          {this.renderAgends()}
        </ScrollView>
      </Block>
    );
  }
}

Agendamento.defaultProps = {
  profile: mocks.profile,
  agendamentos: mocks.agendamentos,
};

export default Agendamento;

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
    paddingHorizontal: 20,
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
});
