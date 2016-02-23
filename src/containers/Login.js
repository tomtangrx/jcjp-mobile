import React, {
  View,
  ScrollView,
  TextInput,
  Component,
  Text,
  TouchableOpacity
} from "react-native";
import { connect } from 'react-redux';
import config from "../../config";
import Button from 'apsl-react-native-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from "../styles/base";
import * as authActions from '../actions/authActions';


class Login extends Component {
  state = {
    username: null,
    password: null
  };
  changeInput(text, key) {
    var user = {};
    user[key] = text;
    this.setState(user);
  }
  login() {
    this.props.dispatch(authActions.login({
      username: this.state.username,
      password: this.state.password
    }));
  }
  render() {
    return (
      <View style={{backgroundColor: "#f0f0f0", flex: 1, height: 1000}}>
        
        <View style={{flexDirection: "row", justifyContent: "center", backgroundColor: "#333", paddingTop: 30}}>
          <Icon name="bullseye" size={25} color="#d05737" style={{textAlign:"center"}} />
          <Text style={{marginBottom: 20, marginTop: 3, marginLeft: 5, textAlign:"center", fontSize: 16, color: "#FFF"}}>JapaneseClass.jp</Text>
        </View>
        <ScrollView>
          <View style={{margin: 30, marginBottom: 5, borderRadius: 5, padding:30, paddingTop: 20, paddingBottom: 20, backgroundColor: "#FFF"}}>
            <Text style={{fontSize: 18, marginBottom: 15}}>Login</Text>
            <Text>Username</Text>
            <TextInput
              style={{marginTop: 5, height: 35, borderColor: 'lightgray', borderWidth: 1, padding:5, marginBottom: 10}}
              onChangeText={(text) => this.changeInput(text, "username")}
              value={this.state.text}
              autoCapitalize="none"
            />
            <Text>Password</Text>
            <TextInput
              style={{marginTop: 5, height: 35, borderColor: 'lightgray', borderWidth: 1, padding: 5}}
              onChangeText={(text) => this.changeInput(text, "password")}
              value={this.state.text}
              secureTextEntry={true}
              autoCapitalize="none"
            />
            <Button style={{
                margin: 0,
                marginTop: 15,
                backgroundColor: '#656460',
                borderWidth: 2,
                borderColor: "#656460",
                borderRadius:0,
                height: 35
              }}
              textStyle={{
                fontSize: 16,
                fontWeight: "bold",
                color: "white"
              }}
              onPress={() => this.login()}
            >
              Login
            </Button>
          </View>
          <View style={{margin: 30, marginTop: 20, marginBottom: 5, borderRadius: 5, padding:30, paddingTop: 20, paddingBottom: 20, backgroundColor: "#FFF"}}>
            <Text style={{fontSize: 18, marginBottom: 15}}>Sign up</Text>
            <View style={{flex: 1, flexDirection:"row", justifyContent: "center"}}>
              <TouchableOpacity style={{
                  margin: 0,
                  backgroundColor: '#A81A0C',
                  borderWidth: 2,
                  borderColor: "#A81A0C",
                  borderRadius:0,
                  height: 35,
                  width: 70,
                  marginRight: 20,
                  flex: 1,
                  justifyContent: "center",
                }}
                textStyle={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "white"
                }}
                onPress={() => this.login()}
              >
                <Icon name="envelope" size={20} color="#FFF" style={{textAlign:"center"}} />
              </TouchableOpacity>
              <TouchableOpacity style={{
                  margin: 0,
                  backgroundColor: '#3b5998',
                  borderWidth: 2,
                  borderColor: "#3b5998",
                  borderRadius:0,
                  height: 35,
                  width: 70,
                  marginRight: 20,
                  flex: 1,
                  justifyContent: "center",
                }}
                textStyle={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "white"
                }}
                onPress={() => this.login()}
              >
                <Icon name="facebook" size={20} color="#FFF" style={{textAlign:"center"}} />
              </TouchableOpacity>
              <TouchableOpacity style={{
                  margin: 0,
                  backgroundColor: '#00aced',
                  borderWidth: 2,
                  borderColor: "#00aced",
                  borderRadius:0,
                  height: 35,
                  width: 70,
                  marginRight: 20,
                  flex: 1,
                  justifyContent: "center",
                }}
                textStyle={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "white"
                }}
                onPress={() => this.login()}
              >
                <Icon name="twitter" size={20} color="#FFF" style={{textAlign:"center"}} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}
export default connect(
  state => ({ auth: state.auth})
)(Login);
