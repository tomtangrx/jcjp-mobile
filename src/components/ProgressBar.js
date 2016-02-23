import React, {
  Component,
  View
} from "react-native";
import styles from "../styles/base";

export default class ProgressBar extends Component {
  render() {
    if ("undefined" === typeof this.props.progress) {
      return (
        <View></View>
      );
    }
    var width = this.props.width || 55;
    var progress = this.props.progress / 100 * width;
    var height = this.props.height || 5;
    var backgroundColor = this.props.backgroundColor ? styles.backgroundColors[this.props.backgroundColor] : undefined;
    return (
      <View style={{
        backgroundColor: "#EEE",
        width: width,
        height: height,
        borderRadius: 0
      }}>
        <View style={[{
          backgroundColor: '#7DB06F',
          borderRadius: 0,
          height: height,
          width: progress
        }, backgroundColor]}>
        </View>
      </View>
    );
  }
}
