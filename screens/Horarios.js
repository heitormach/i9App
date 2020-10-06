import React, { Component } from "react";
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Modal,
  ActivityIndicator,
  Alert,
} from "react-native";

import { Card, Button, Block, Text, Switch } from "../components";
import { theme, mocks } from "../constants";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
const { width } = Dimensions.get("window");
import apiNegocio from "../services/apiNegocio";

class Horarios extends Component {
  state = {
    horarios: [],
    isDateTimePickerVisible: false,
    horarioSelected: {},
    showWeek: false,
    horaSelected: {},
    showTimePicker: false,
    loading: false,
  };

  componentDidMount() {
    this.getHorarios();
  }

  selectWeekDay(horario) {
    this.setState({ horarioSelected: horario, showWeek: true });
  }

  getHorarios = async () => {
    try {
      const response = await apiNegocio.get("estabelecimento/atendimento");

      this.setState({ horarios: response.data });
    } catch (err) {
      console.log(err.data);
    }
  };

  saveHorarios = async () => {
    const { horarioSelected } = this.state;
    try {
      this.setState({ loading: true });
      const response = await apiNegocio.patch(
        "estabelecimento/atendimento",
        horarioSelected
      );

      this.setState({ loading: false, showWeek: false });

      Alert.alert("Salvo", "Dados atualizados");
      console.log(response);
      this.getHorarios();
    } catch (err) {
      Alert.alert("Erro", JSON.stringify(err.data));
      this.setState({ loading: false });
      console.log(err);
    }
  };

  horaSelected(horario, tipo) {
    this.setState({
      horaSelected: { hora: horario, tipo: tipo },
      showTimePicker: true,
    });
  }

  handleTime(event, date, tipo) {
    this.setState({ showTimePicker: false });
    if (date) {
      if (tipo === "ini") {
        this.setState((prev) => ({
          horarioSelected: {
            ...prev.horarioSelected,
            inicio_atendimento: moment(new Date(date)).format("HH:mm"),
          },
        }));
      } else {
        this.setState((prev) => ({
          horarioSelected: {
            ...prev.horarioSelected,
            fim_atendimento: moment(new Date(date)).format("HH:mm"),
          },
        }));
      }
    }
  }

  renderSelectTimeWeek() {
    const {
      loading,
      horarioSelected,
      showWeek,
      showTimePicker,
      horaSelected,
    } = this.state;
    return (
      <Modal
        animationType="slide"
        visible={showWeek}
        onRequestClose={() => this.setState({ showWeek: false })}
      >
        <Block
          padding={[theme.sizes.padding * 2, theme.sizes.padding]}
          space="between"
        >
          <Text h2 light>
            {horarioSelected.dia_semana}
          </Text>
          <ScrollView style={{ marginVertical: theme.sizes.padding }}>
            <TouchableOpacity
              onPress={() =>
                this.horaSelected(horarioSelected.inicio_atendimento, "ini")
              }
            >
              <Text h2 light size={15}>
                Horário de Início:
              </Text>
              <Text style={{ marginBottom: theme.sizes.base }} bold>
                {" "}
                {horarioSelected.inicio_atendimento}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.horaSelected(horarioSelected.fim_atendimento, "fim")
              }
            >
              <Text h2 light size={15}>
                Horário de Término:
              </Text>
              <Text style={{ marginBottom: theme.sizes.base }} bold>
                {horarioSelected.fim_atendimento}
              </Text>
            </TouchableOpacity>
            {showTimePicker && (
              <DateTimePicker
                value={new Date("01/01/2020 " + horaSelected.hora)}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={(event, date) =>
                  this.handleTime(event, date, horaSelected.tipo)
                }
                on
              />
            )}
            <Block
              row
              center
              space="between"
              style={{ marginBottom: theme.sizes.base * 2 }}
            >
              <Text gray2>Trabalho neste dia</Text>
              <Switch
                value={horarioSelected.aberto}
                onValueChange={(value) =>
                  this.setState((prev) => ({
                    horarioSelected: {
                      ...prev.horarioSelected,
                      aberto: value,
                    },
                  }))
                }
              />
            </Block>
          </ScrollView>
          <Block middle padding={[theme.sizes.base / 2, 0]}>
            <Button gradient onPress={() => this.saveHorarios()}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text bold white center>
                  Salvar
                </Text>
              )}
            </Button>
            <Button
              color="orange"
              onPress={() => this.setState({ showWeek: false })}
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

  render() {
    const { profile, navigation } = this.props;
    const { horarios } = this.state;
    let horaRender;
    const aberto = (horario) => {
      if (!horario.aberto) {
        horaRender = (
          <Text medium height={20}>
            Não trabalho
          </Text>
        );
      } else {
        horaRender = (
          <Text medium height={20}>
            {horario.inicio_atendimento} até {horario.fim_atendimento}
          </Text>
        );
      }
    };
    return (
      <Block>
        <Block flex={false} row center space="between" style={styles.header}>
          <Text h1 bold>
            Horários
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
            <Block flex={false} row space="between" style={styles.horarios}>
              {horarios.map((horario) => (
                <TouchableOpacity
                  onPress={() => this.selectWeekDay(horario)}
                  key={horario.dia_semana}
                >
                  <Card center middle shadow style={styles.horario}>
                    <Text medium height={20}>
                      {horario.dia_semana}
                    </Text>
                    {aberto(horario)}
                    {horaRender}
                  </Card>
                </TouchableOpacity>
              ))}
            </Block>
          </ScrollView>
          {this.renderSelectTimeWeek()}
        </KeyboardAvoidingView>
      </Block>
    );
  }
}

Horarios.defaultProps = {
  profile: mocks.profile,
};

export default Horarios;

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
  horarios: {
    flexWrap: "wrap",
    paddingHorizontal: theme.sizes.base * 2,
    marginBottom: theme.sizes.base * 3.5,
  },
  horario: {
    // this should be dynamic based on screen width
    minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
  },
});
