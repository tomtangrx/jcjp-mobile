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
  ReactNativeART,
  ART
} from 'react-native';
import Svg,{
    Path,
    Rect,
} from 'react-native-art-svg';
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
  renderVocabularyRow(item) {
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
/*      return (
        <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', paddingTop: 100, alignItems: 'center'}}>
            <Svg width={55} height={55} style={{width: 55, height: 55}}>
              <Rect
                x="0"
                y="0"
                height="55"
                width="55"
                fill="#FFF"
                stroke="#666"
                strokeWidth="1"
              />
              <Path d="M0,27.5L55,27.5" stroke="#DDDDDD"/>
              <Path d="M27.5,0L27.5,55" stroke="#DDDDDD"/>

            </Svg>
        </View>
    );*/

  renderKanjiSvg(k) {
    return (
      <View style={{flex: 1, backgroundColor: 'white', flexDirection: 'row', flexWrap: "wrap", alignItems: 'center'}}>
        { _.map(k.kanjiVg.paths, (path, i) => {
          return (
            <Svg
              key={"svg"+i}
              viewbox="0 0 109 109"
              x="0"
              y="0"
              width={55}
              height={55}
            >
              <Rect
                x="0"
                y="0"
                height="109"
                width="109"
                fill="#FFF"
                stroke="#666"
                strokeWidth="1"
              />
              <Path d="M0,55.5L109,55.5" stroke="#DDDDDD"/>
              <Path d="M55.5,0L55.5,109" stroke="#DDDDDD"/>

              {
                _.range(0, i+1).map((d) => {
                  return (
                    <Path
                      key={"path" + d}
                      d={k.kanjiVg.paths[d]}
                      className={(i===k.kanjiVg.paths.length-1) ? 'stroke' : ''}
                      stroke="#000"
                      fill="none"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        fill:"none",
                        stroke: "#000000",
                        strokeWidth:2,
                        strokeLinecap:"round",
                        strokeLinejoin:"round"
                      }}
                    />
                  );
                })
              }
            </Svg>
          )
        })}
    {/*<Svg
          id={'animated-' + k.kanjiVg.id}
          viewbox="0 0 109 109"
          x="0"
          y="0"
          width={55}
          height={55}
        >
          <Rect
            x="0"
            y="0"
            height="109"
            width="109"
            fill="#FFF"
            stroke="#666"
            strokeWidth="1"
          />
          <Path d="M0,55.5L109,55.5" stroke="#DDDDDD"/>
          <Path d="M55.5,0L55.5,109" stroke="#DDDDDD"/>
        </Svg>*/}
      </View>
    );
  }
  renderKanjiRow(item) {
    return (
      <View style={{
        alignItems: 'center',
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: 10,
      }}>
        <View style={{width: 50}}>
          <Text style={{
            fontSize: 30
          }}>{item.kanji || item.literal}</Text>
        </View>
        
        <View style={{flex:1}}>
          {
            item.reading.ja_on ? 
              <Text style={{marginBottom: 5}}>On: {item.reading.ja_on.join("・")}</Text> : false
          }
          {
            item.reading.ja_kun ?
            <Text style={{marginBottom: 5}}>Kun: {item.reading.ja_kun.join("・")}</Text> : false
          }
          <Text style={{
            fontWeight: "bold",
            marginBottom: 5
          }}>{item.meaning.en.join(' / ')}</Text>
          {this.renderKanjiSvg(item)}
        </View>
      </View>
    )
  }
  render() {
    var type = this.props.type;
    var row = type === "kanji" ? this.renderKanjiRow : this.renderVocabularyRow;
    return (
      <ListView
        renderRow={(item) => row.bind(this, item)()}
        dataSource={this.state.items}
        renderSeparator={this.renderSeparator}
      />
    )
  }
}
