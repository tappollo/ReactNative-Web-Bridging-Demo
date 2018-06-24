import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, WebView } from 'react-native';


export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      counter: 0,
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <WebView
          ref={(wv)=>{
            this.wv = wv;
          }}
          source={require('./test.html')}
          scalesPageToFit={false}
          style={styles.web}
          onMessage={(e) => {
            const state = JSON.parse(e.nativeEvent.data);
            if (state !== this.state){
              this.setState(state);
            };
          }}
        />
        <View>
          <Text>Above Runs in Webview</Text>
          <Text>Below Runs in Native</Text>
        </View>
        <View style={styles.nativeFooter} >
          <TouchableOpacity
            onPress={()=>{
              const newState = {
                counter: this.state.counter + 1
              }
              this.wv.postMessage(JSON.stringify(newState));
              this.setState(newState);
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Increase</Text>
          </TouchableOpacity>
          <View style={styles.button}>
            <Text>{this.state ? this.state.counter:'0'}</Text>
          </View>
          <TouchableOpacity
            onPress={()=>{
              const newState = {
                counter: this.state.counter - 1
              }
              this.wv.postMessage(JSON.stringify(newState));
              this.setState(newState);
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Decrease</Text>
          </TouchableOpacity>
        </View>
      </View>

    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  nativeFooter: {
    flex: 1,
    flexDirection: 'row',
  },
  button: {
    width: 80,
    height: 30,
    margin: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'blue',
  },
  web: {
    width: 300,
  },
});
