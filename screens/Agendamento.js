import React, { Component } from "react";
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";

import { Button, Block, Text, Switch, Divider, Input } from "../components";
import { theme, mocks } from "../constants";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-community/picker";
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
    mesIni: moment(new Date()).format("YYYY-MM-DD"),
    mesFim: moment(new Date()).format("YYYY-MM-DD"),
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
    mesSelected: new Date().getMonth() + 1,
    servicos: [],
    servicoSelected: "",
    diaSelected: moment(new Date()).format("DD/MM/YYYY"),
    dateTime: new Date(),
    cliente: "",
    horariosDisponiveis: ["12:00", "13:00", "14:00", "15:00"],
    showNewService: false,
    showDatePicker: false,
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

  onChangeMonth(month) {
    this.setState({ mesSelected: month });
    
  }

  onChange = (event, date) => {
    this.setState({ showDatePicker: false });
    if (date) {
      const currentDate = date;
      this.setState({
        diaSelected: moment(new Date(date)).format("DD/MM/YYYY"),
        dateTime: new Date(date),
      });
    }
  };

  renderCreateService() {
    const { services } = mocks;
    const { horariosDisponiveis } = this.state;
    console.log(services);
    return (
      <Modal
        animationType="slide"
        visible={this.state.showNewService}
        onRequestClose={() => this.setState({ showNewService: false })}
      >
        <Block>
          <Block flex={false} row center space="between" style={styles.header}>
            <Text h1 bold>
              Novo Agendamento
            </Text>
          </Block>

          <ScrollView showsVerticalScrollIndicator={false}>
            <Block style={styles.inputs}>
              <Block
                row
                space="between"
                margin={[10, 0]}
                style={styles.inputRow}
              >
                <Block>
                  <TouchableOpacity
                    onPress={() => this.setState({ showDatePicker: true })}
                  >
                    <Text gray2>Data</Text>
                    <TextInput
                      defaultValue={this.state.diaSelected}
                      disabled={true}
                    ></TextInput>
                  </TouchableOpacity>
                  {this.state.showDatePicker && (
                    <DateTimePicker
                      value={this.state.dateTime}
                      mode="date"
                      display="calendar"
                      onChange={(event, date) => this.onChange(event, date)}
                    />
                  )}
                </Block>
              </Block>
              <Block
                row
                space="between"
                margin={[10, 0]}
                style={styles.inputRow}
              >
                <Block>
                  <Text gray2>Serviço</Text>
                  <Picker
                    style={{
                      height: 50,
                      width: 150,
                    }}
                    selectedValue={this.state.servicoSelected}
                    onValueChange={(v) => this.setState({ servicoSelected: v })}
                    itemStyle={{ fontSize: 20 }}
                  >
                    {services.map((servico) => (
                      <Picker.Item
                        key={`servico-${servico.nome}`}
                        label={servico.nome}
                        value={servico.nome}
                      />
                    ))}
                  </Picker>
                </Block>
                <Block>
                  <Text gray2>Horário</Text>
                  <Picker
                    style={{
                      height: 50,
                      width: 150,
                    }}
                    selectedValue={this.state.horaSelected}
                    onValueChange={(v) => this.setState({ horaSelected: v })}
                    itemStyle={{ fontSize: 20 }}
                  >
                    {horariosDisponiveis.map((hora) => (
                      <Picker.Item
                        key={`servico-${hora}`}
                        label={hora}
                        value={hora}
                      />
                    ))}
                  </Picker>
                </Block>
              </Block>
              <Block
                row
                space="between"
                margin={[10, 0]}
                style={styles.inputRow}
              >
                <Block>
                  <Text gray2>Cliente</Text>
                  <TextInput
                    defaultValue={this.state.cliente}
                    disabled={false}
                  ></TextInput>
                </Block>
              </Block>
              <Block middle padding={[theme.sizes.base / 2, 0]}>
                <Button
                  gradient
                  onPress={() => this.setState({ showNewService: false })}
                >
                  <Text center white>
                    Agendar
                  </Text>
                </Button>
                <Button
                  color="accent"
                  onPress={() => this.setState({ showNewService: false })}
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
            style={{
              height: 50,
              width: 200,
              transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
            }}
            selectedValue={this.state.mesSelected}
            onValueChange={(v) => this.setState({ mesSelected: v })}
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
          {this.renderAgends()}
        </ScrollView>
        <TouchableOpacity
          onPress={() => this.setState({ showNewService: true })}
          style={styles.fab}
        >
          <Text style={styles.fabIcon}>+</Text>
        </TouchableOpacity>
        {this.renderCreateService()}
      </Block>
    );
  }
}

Agendamento.defaultProps = {
  profile: mocks.profile,
  agendamentos: mocks.agendamentos,
  servicos: mocks.services,
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
  inputs: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2,
  },
  inputRow: {
    alignItems: "flex-end",
  },
});
