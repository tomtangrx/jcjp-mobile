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
import ProgressBar from '../components/ProgressBar';

export default class Chapter extends Component {
  state = {
    data: {},
    items: new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    })
  };
  fetchData() {
    var type = this.props.type;
    var level = this.props.level;
    var chapter = this.props.chapter;
    var url = config.APIURL + "/api/lessons/"+type+"/"+level+"/"+chapter;
    fetch(url, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "referer": "iosApp"
      }
    })
    .then((response) => response.json())
    .then((data) => {
      this.setState({
        data: data,
        items: this.state.items.cloneWithRows(data.vocabs || data.kanjis)
      });
    });
  }
  componentDidUpdate() {
    this.fetchData();
  }
  componentDidMount() {
    this.fetchData();
  }
  renderSeparator(
    sectionID: number | string,
    rowID: number | string,
    adjacentRowHighlighted: boolean
  ) {
    var style = {
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      height: 1,
      marginLeft: 4,
    };
    if (adjacentRowHighlighted) {
        style = [style, styles.rowSeparatorHide];
    }
    return (
      <View key={'SEP_' + sectionID + '_' + rowID}  style={style}/>
    );
  }
  renderRow(item) {
    return (
      <View style={{
        alignItems: 'center',
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: 10,
      }}>
        <View style={{width: 120}}>
          <Text style={{flex: 1, fontSize: 12, marginBottom: 5}}>{item.kana}</Text>
          <Text style={{
            fontSize: 20
          }}>{item.kanji}</Text>
        </View>
        
        <View style={{flex:1}}>
          <Text>{item.english}</Text>
        </View>
      </View>
    )
  }
  render() {
    return (
      <ListView
        renderRow={(item) => this.renderRow(item)}
        dataSource={this.state.items}
        renderSeparator={this.renderSeparator}
      />
    )
  }
}
