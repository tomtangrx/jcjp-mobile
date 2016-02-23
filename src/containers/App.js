'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  TabBarIOS,
  TouchableWithoutFeedback,
  TouchableOpacity,
  LayoutAnimation,
  NavigatorIOS
} from 'react-native';
var Icon = require('react-native-vector-icons/FontAwesome');
import { connect } from 'react-redux';

import config from "../../config";
import styles from "../styles/base";

import Quiz from "./Quiz";
import Lesson from "./Lesson";
import Login from "./Login";
import Statistics from "./Statistics";
import * as authActions from '../actions/authActions';

class App extends Component {
  state = {
    selectedTab: "lessons",
  };
  componentDidMount() {
    this.props.dispatch(authActions.getAuth()).then(() => {
      
    });
  }
  render() {
    if (!this.props.auth.isAuthenticated) {
      return (
        <View>
          <Login dispatch={this.props.dispatch}/>
        </View>
      );
    }
    return (
      <View style={styles.container.main}>
        <TabBarIOS
          selectedTab={this.state.selectedTab}
          style={styles.container.tab}
          //tintColor="#656460"
          //barTintColor="#EAE1D1"
          translucent={true}
        >
          {/* Feeds */}
          <Icon.TabBarItem
            title="Social Feeds"
            selected={this.state.selectedTab === 'feeds'}
            iconName="group"
            selectedIconName="group"
            onPress={() => {this.setState({selectedTab: 'feeds'});}}
          >
            <NavigatorIOS
              //barTintColor="#EAE1D1"
              //titleTextColor="#656460"
              style={styles.navigator.container}
              initialRoute={{
                component: Quiz,
                title: 'Social Feeds',
              }}
            />
          </Icon.TabBarItem>

          {/* Lessons */}
          <Icon.TabBarItem
            title="Lessons"
            selected={this.state.selectedTab === 'lessons'}
            iconName="book"
            selectedIconName="book"
            onPress={() => {this.setState({selectedTab: 'lessons'});}}
          >
            <NavigatorIOS
              //barTintColor="#EAE1D1"
              //titleTextColor="#656460"
              //tintColor="#656460"
              style={styles.navigator.container}
              initialRoute={{
                component: Lesson,
                title: 'Lessons',
                passProps: {
                  actions: {
                    selectTab: (tab) => {
                      this.setState({selectedTab: tab});
                    }
                  }
                }
              }}
            />
          </Icon.TabBarItem>


          {/* Practice */}
          <Icon.TabBarItem
            title="Practice"
            selected={this.state.selectedTab === 'practice'}
            iconName="bullseye"
            selectedIconName="bullseye"
            onPress={() => {this.setState({selectedTab: 'practice'});}}
          >
            <NavigatorIOS
              //barTintColor="#EAE1D1"
              //titleTextColor="#656460"
              style={styles.navigator.container}
              initialRoute={{
                component: Quiz,
                title: 'Practice',
                passProps: {
                  name: "practice"
                }
              }}
            />
          </Icon.TabBarItem>

          {/* Statistics */}
          <Icon.TabBarItem
            title="Statistics"
            selected={this.state.selectedTab === 'statistics'}
            iconName="user"
            selectedIconName="user"
            onPress={() => {this.setState({selectedTab: 'statistics'});}}
          >
            <NavigatorIOS
              //barTintColor="#EAE1D1"
              //titleTextColor="#656460"
              style={styles.navigator.container}
              initialRoute={{
                component: Statistics,
                title: 'Statistics',
                passProps: {
                  id: this.props.auth.user.no

                }
              }}
            />
          </Icon.TabBarItem>

        </TabBarIOS>
      </View>
    );
  }
}

export default connect(
  state => ({ auth: state.auth})
)(App);
