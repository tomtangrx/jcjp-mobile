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
  Animated
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
import ScrollableTabView from "react-native-scrollable-tab-view";


class LessonType extends Component {
  render() {
    var type = this.props.type;
    var scores = this.props.scores || [];
    return (
      <View>
        <View style={{flex: 1}}>
          <Text style={styles.heading[1]}>{helpers.capitalize(type)}</Text>
        </View>
        {
          _.range(1, 8).map((level) => {
            return (
              <View key={level}>
                <View>
                  <Text style={styles.heading[2]}>Level {level}</Text>
                </View>
                <View style={styles.lessons.chapterContainer}>
                  {_.range(1+(level-1)*10, (10+(level-1) * 10) + 1).map((chapter) => {
                      return (
                        <TouchableOpacity
                          key={chapter}
                          onPress={helpers.routes.lessonChapter.bind(this, type, level, chapter, "push")}
                        >
                          <View style={styles.lessons.chapterItem}>
                            <Text style={{
                              flex: 1,
                            }}>{chapter}</Text>
                          </View>
                            <View style={{marginLeft:10}}>
                              <ProgressBar
                                width={55}
                                progress={scores[chapter] ? scores[chapter].score : 0}
                                backgroundColor={scores[chapter] ? scores[chapter].color : null}
                              />
                            </View>

                        </TouchableOpacity>
                      )
                    })}
                </View>
              </View>
            )
          })
        }
      </View>
    );
  }
}

class Lesson extends Component {
  componentDidMount() {
    this.props.dispatch(lessonsActions.getLessonsList({cookie: this.props.auth.cookie}));
  }
  render() {
    var lessonList = this.props.lessons.list || {};

    return (
      <ScrollView>
        <ScrollableTabView>
          <LessonType tabLabel="Vocabulary" type="vocabulary" scores={lessonList.vocabularyScores} navigator={this.props.navigator}/>
          <LessonType tabLabel="Kanji" type="kanji" scores={lessonList.kanjiScores} navigator={this.props.navigator}/>
        </ScrollableTabView>
      </ScrollView>
    )

  }
};
export default connect(
  state => ({
    auth: state.auth,
    lessons: state.lessons
  })
)(Lesson);
