import React, { Component } from "react";
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Picker,
} from "react-native";

import { Card, Badge, Button, Block, Text } from "../components";
import { theme, mocks } from "../constants";

const { width } = Dimensions.get("window");

class Horarios extends Component {
  state = {
    horarios: [],
  };

  componentDidMount() {
    this.setState({ horarios: this.props.horarios });
  }

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
            {horarios.map((horario) => (
              <Block flex={false} row style={styles.horarios}>
                <Text
                  bold
                  style={{ paddingVertical: 15, paddingHorizontal: 10 }}
                  black
                >
                  {horario.name}
                </Text>
                <Picker
                  selectedValue={this.state.language}
                  style={{ height: 50, width: 100 }}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ language: itemValue })
                  }
                >
                  <Picker.Item label="00" value="java" />
                  <Picker.Item label="01" value="js" />
                </Picker>
                <Text style={{ paddingVertical: 15 }} black>
                  :
                </Text>
                <Picker
                  selectedValue={this.state.language}
                  style={{ height: 50, width: 100 }}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ language: itemValue })
                  }
                >
                  <Picker.Item label="00" value="java" />
                  <Picker.Item label="01" value="js" />
                </Picker>
              </Block>
            ))}
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
    marginBottom: theme.sizes.base * 1.10,
  },
  horario: {
    // this should be dynamic based on screen width
    minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
  },
});
