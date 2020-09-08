import React, { Component } from "react";
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Modal,
} from "react-native";

import { Card, Badge, Button, Block, Text, Switch } from "../components";
import { theme, mocks } from "../constants";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
const { width } = Dimensions.get("window");

class Horarios extends Component {
  state = {
    horarios: [],
    isDateTimePickerVisible: false,
    horarioSelected: {},
    showWeek: false,
    horaSelected: {},
    showTimePicker: false,
  };

  componentDidMount() {
    this.setState({ horarios: this.props.horarios });
  }

  selectWeekDay(horario) {
    this.setState({ horarioSelected: horario, showWeek: true });
  }

  horaSelected(horario, tipo) {
    this.setState({
      horaSelected: { hora: horario, tipo: tipo },
      showTimePicker: true,
    });
  }

  handleTime(event, date, tipo) {
    console.log("passou");
    this.setState({ showTimePicker: false });
    if (date) {
      if (tipo === "ini") {
        this.state.horarioSelected.horaIni = new Date(date);
      } else {
        this.state.horarioSelected.horaFim = new Date(date);
      }
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
            {this.state.horarioSelected.name}
          </Text>
          <ScrollView style={{ marginVertical: theme.sizes.padding }}>
            <TouchableOpacity
              onPress={() =>
                this.horaSelected(this.state.horarioSelected.horaIni, "ini")
              }
            >
              <Text h2 light size={15}>
                Horário de Início:
              </Text>
              <Text style={{ marginBottom: theme.sizes.base }} bold>
                {" "}
                {moment(new Date(this.state.horarioSelected.horaIni)).format(
                  "HH:mm"
                )}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.horaSelected(this.state.horarioSelected.horaFim, "fim")
              }
            >
              <Text h2 light size={15}>
                Horário de Término:
              </Text>
              <Text style={{ marginBottom: theme.sizes.base }} bold>
                {moment(new Date(this.state.horarioSelected.horaFim)).format(
                  "HH:mm"
                )}
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
                on
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
                value={this.state.horarioSelected.naoTrab}
                onValueChange={(value) =>
                  (this.state.horarioSelected.naoTrab = value)
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

  render() {
    const { profile, navigation } = this.props;
    const { horarios } = this.state;
    let horaRender;
    const naoTrab = (horario) => {
      if (horario.naoTrab) {
        horaRender = (
          <Text medium height={20}>
            Não trabalho
          </Text>
        );
      } else {
        horaRender = (
          <Text medium height={20}>
            {moment(new Date(horario.horaIni)).format("HH:mm")} até{" "}
            {moment(new Date(horario.horaFim)).format("HH:mm")}
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
                  key={horario.name}
                >
                  <Card center middle shadow style={styles.horario}>
                    <Text medium height={20}>
                      {horario.name}
                    </Text>
                    {naoTrab(horario)}
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
  horarios: mocks.dayWeek,
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
