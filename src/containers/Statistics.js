import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  ScrollView,
  ListView,
  View,
  TabBarIOS,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TouchableHighlight,
  LayoutAnimation,
  Animated,
  Image
} from 'react-native';
import styles from "../styles/base";
import helpers from "../lib/helpers";
import config from "../../config";
import {Motion, spring} from "react-motion";
import rebound from "rebound";
import _ from "lodash";
import ProgressBar from '../components/ProgressBar';
import Chapter from "./Chapter";
import { connect } from 'react-redux';
import * as lessonsActions from '../actions/lessonsActions';
import * as userActions from '../actions/userActions';
import ScrollableTabView from "react-native-scrollable-tab-view";

class Overview extends Component {
  componentDidMount() {
    this.props.dispatch(userActions.getUserStatistics({id:this.props.id, sub: ""})).then(() => {
      console.log(this.props.user);
    });
  }
  render() {
    var id = this.props.id;
    var statistics = this.props.user.statistics;
    var user = statistics[id];
    if (!user) {
      return (
        <View>
          <Text>Loading ... </Text>
        </View>
      );
    }
    var userPage = user.userPage;
    return (
      <View>
        <View style={{textAlign: "center", padding: 5, borderWidth: 1, borderColor: "#DDD"}}>
          <Image source={{uri:userPage.pic}} style={{width: 150, height: 150, flex:1}} />
        </View>
        <View>
          <Text>{userPage.name}</Text>
        </View>
      </View>

    );
  }
};

class Statistics extends Component {
  componentDidMount() {
  }
  render() {
    return (
      <ScrollView>
        <Overview {...this.props}/>
      </ScrollView>
    );
  }
};
export default connect(
  state => ({
    auth: state.auth,
    lessons: state.lessons,
    user: state.user
  })
)(Statistics);

