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
  Animated,
  ScrollView,
  Dimensions
} from 'react-native';
import Button from 'apsl-react-native-button';
import styles from "../styles/base";
import config from "../../config";
import {Motion, spring} from "react-motion";
import rebound from "rebound";
import _ from "lodash";
import ProgressBar from "../components/ProgressBar";
import Errors from "../lib/errors";
import helpers from "../lib/helpers";
import { connect } from 'react-redux';
import * as quizActions from '../actions/quizActions';


var SPRING_CONFIG = {tension: 2, friction: 3}; //Soft spring

class Quiz extends Component {
  state = {
    settings: {
      level: [1],
      type: ["kanji", "vocabulary", "jtoe"],
      presentation: ["kanji_option", "kana_option"]
    },
    wrongOptions: [],
    loading: false,
    error: null
  };
  getQuizData() {
    var name = this.props.name;
    var quizData = this.props.quiz || {};
    var answer = quizData.answer || {};
    answer = answer[name];

    var question = quizData.question || {};
    question = question[name] || {
      q: {},
      mc: []
    };
    var data = {
      question: question,
      answer: answer
    };
    return data;
  }
  answer(answer, key) {
    var self = this;
    var quizData = this.getQuizData();
    var question = quizData.question;
    var type = question.q.type;
    var q = question.q;
    var answerData = {
      a: answer.a,
      option: answer.option,
      type: q.type,
      q: q.q_no,
      token: question.token,
      answered_ids: this.props.settings ? this.props.settings.answered_ids : undefined
    };
    var name = this.props.name;
    this.props.dispatch(quizActions.getQuizAnswer(answerData, type, name)).then(() => {
      var quizData = this.getQuizData();
      var answer = quizData.answer;
      
      if (answer.correct || answer.answerType === 'once') {
        self.nextQuestion();
      } else {
        self.state.wrongOptions.push(key);
        self.setState({
          wrongOptions: self.state.wrongOptions,
          loading: false
        });
      }

      /*//self.state.animation.combo.scale.setValue(1.5);     // Start large
      Animated.timing(self.animation.exp, {
        toValue: 100,
        duration: 1000
      }).start();*/
    });
  }
  nextQuestion() {
    var self = this;
    var quizData = this.getQuizData();
    var answer = quizData.answer;
    if (answer) {
      this.state.settings = _.assign(this.state.settings, {
        answered_ids: answer.answered_ids
      });
    }

    this.setState({settings: this.state.settings});
    this.props.dispatch(quizActions.getQuizQuestion({settings: self.props.settings, name: this.props.name})).then(() => {
      var quizData = this.getQuizData();
      var data = quizData.question;
      if (data.success === false) {
        self.setState({
          error: data
        });
        return;
      }
      self.setState({
        loading: false,
        wrongOptions: []
      });
    });
  };
  componentDidMount() {
    this.nextQuestion();
  }
  componentWillMount() {
    this.springSystem = new rebound.SpringSystem();
    this._scrollSpring = this.springSystem.createSpring();
    var springConfig = this._scrollSpring.getSpringConfig();
    springConfig.tension = 230;
    springConfig.friction = 10;
    this._scrollSpring.addListener({
      onSpringUpdate: () => {
        var val = this._scrollSpring.getCurrentValue();
        this.setState({scale: val});
      }
    });
    this._scrollSpring.setCurrentValue(1);
    this.setState({
      settings: this.props.settings || this.state.settings
    });
    this.initialSettings = this.state.settings;

    /*this.animation = {
      exp: new Animated.Value(0)
    };*/
  }
  _handleOption = (m, key) => {
    if (this.state.wrongOptions.indexOf(key) !== -1) {
      return false;
    }
    if (this.state.loading) { return; }
    this.setState({loading: true});
    //this.setState({w: this.state.w + 15, h: this.state.h + 15})
    //this.fetchData();
    this.answer(m, key);
  };
  renderOption(m, key) {
    var isCorrect = this.state.wrongOptions.indexOf(key) === -1;
    return (
      <TouchableOpacity key={key} onPress={() => this._handleOption(m, key)}>
        <View style={[styles.practice.optionView, {backgroundColor: isCorrect ? "white" : "#fde2df"}]}>
          <Text style={[styles.practice.optionText]}>{m.option}</Text>
        </View>
      </TouchableOpacity>
    )
  }
  renderAnswerResult() {
    var quizData = this.getQuizData();
    var answer = quizData.answer;

    if (!answer) {
      return (<View></View>)
    }
    
    return (
      <View style={[styles.practice.answerResult, {
        backgroundColor: answer.correct ? "#CCF2BC" : "#fde2df",
      }]}>
        <Text style={[
          styles.practice.answerResultItem,
          { color: answer.correct ? "#090" : "#C30"}
        ]}>{answer.correct ? "Answer Correct" : "Answer Wrong"}</Text>
        <View style={[
          styles.practice.answerResultItem]}>
          <Text>{answer.exp} EXP</Text>
        </View>
        <Text style={[styles.item[answer.correct ? "green" : "red"], styles.practice.answerResultItem]}>{answer.combo} combo</Text>
      </View>
    )
  }
  getNext(next) {
    if (next.type === "practice") {
      return {
        button: "Earn more EXP in Practice to level up",
        action: () => {
          this.props.actions.selectTab("practice");
        }
      };
    } else {
      var type = next.type;
      var chapter = next.chapter;
      var level = next.level;

      return {
        button: helpers.capitalize(type) + " Chapter " + chapter,
        action: () => {
          var route = helpers.routes.getChapter.bind(this)(type, level, chapter);
          this.props.navigator.replacePreviousAndPop(route);
        }
      };


    }
  }
  tryAgain() {
    this.state.settings = _.assign(this.state.settings, {
      answered_ids: undefined
    });
    this.props.dispatch(quizActions.resetQuizAnswer(this.props.name));
    this.setState(this.state);
    this.nextQuestion();
  }
  render() {
    let overlay;
    var quizData = this.getQuizData();
    var question = quizData.question;
    var error = this.state.error;
    if (error) {
      var message = Errors[error.message];
      return (
        <ScrollView>
          <View style={styles.practice.questionSetView}>
            <View style={styles.practice.questionView}>
              <Text style={{textAlign:"center"}}>{message}</Text>
            </View>
          </View>
        </ScrollView>
      )
    }
    if (question.result) {
      var result = question.result;
      var button = null;
      var next = this.getNext(result.next);

      return (
        <ScrollView>
          <View style={styles.practice.questionSetView}>
            <View style={styles.practice.questionView}>
              <Text>Correct: {result.correct}</Text>
              <Text>Wrong: {result.wrong}</Text>
              <Text>Score: {result.total_questions}</Text>
              <Text>Score: {result.score}%</Text>
            </View>
          </View>
          <View>
            <Button style={{
                margin: 10,
                backgroundColor: 'white',
                borderWidth: 2,
                borderColor: "#994DB6"
              }}
              textStyle={{
                fontSize: 15,
                color: "#994DB6"
              }}
              onPress={() => next.action()}
            >
              {next.button}
            </Button>
            <Button style={{
                marginTop: 0,
                margin: 10,
                backgroundColor: 'white',
                borderWidth: 2,
                borderColor: "#999"
              }}
              textStyle={{
                fontSize: 15,
                color: "#333"
              }}
              onPress={() => this.tryAgain()}
            >
              Try Again
            </Button>
          </View>

        </ScrollView>
      );

    }
    if (this.state.loading) {
      overlay = <View style={{
        position: "absolute",
        bottom: 0,
        top:0,
        left: 0,
        right: 0,
        backgroundColor: "#EEE",
        opacity: 0.5,
        flex: 1
      }}></View>
    }

    var {height, width} = Dimensions.get('window');


    return (
      <ScrollView>
        {this.renderAnswerResult()}
        <View style={styles.practice.questionSetView}>
          <View style={styles.practice.questionView}>
            <Text style={styles.practice.question}>
              {question.q.question}
            </Text>
          </View>
          {question.mc.map((m, key) => this.renderOption(m, key))}
        </View>
        <ProgressBar height={10} width={width} progress={question.progress}/>
        {overlay}

        <View style={styles.practice.encounterView}>
          <Text style={styles.heading[2]}>Encounter History</Text>
        </View>
        
      </ScrollView>
    )
  }
}

export default connect(
  state => ({
    auth: state.auth,
    quiz: state.quiz
  })
)(Quiz);
