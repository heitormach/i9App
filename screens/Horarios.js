import React, { Component } from "react";
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from "react-native";

import { Card, Badge, Button, Block, Text } from "../components";
import { theme, mocks } from "../constants";
import DateTimePicker from "@react-native-community/datetimepicker";

const { width } = Dimensions.get("window");

class Horarios extends Component {
  state = {
    horarios: [],
    isDateTimePickerVisible: false,
  };

  componentDidMount() {
    this.setState({ horarios: this.props.horarios });
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (time) => {
    console.log("A time has been picked: ", time);
    this._hideDateTimePicker();
  };

  render() {
    const { profile, navigation } = this.props;
    const { horarios, selectedHours, selectedMinutes } = this.state;
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
            <Block flex={false} row space="between" style={styles.categories}>
              {horarios.map((horario) => (
                <TouchableOpacity key={horario.name}>
                  <Card center middle shadow style={styles.horario}>
                    <Badge margin={[0, 0, 15]} size={40}></Badge>
                    <Text medium height={20}>
                      {horario.horaIni.toString()}
                    </Text>
                  </Card>
                </TouchableOpacity>
              ))}
            </Block>
          </ScrollView>
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
    marginBottom: theme.sizes.base * 1.1,
  },
  horario: {
    // this should be dynamic based on screen width
    minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
  },
});
