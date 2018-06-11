/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import firebase from 'react-native-firebase';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

  state = {
    token: ''
  }

  async componentDidMount() {
    // const notification = new firebase.notifications.Notification()
    //       .setNotificationId('notificationId')
    //       .setTitle('My notification title')
    //       .setBody('My notification body')
    //       .setData({
    //         key1: 'value1',
    //         key2: 'value2',
    //       });
    //
    //   notification
    //     .android.setChannelId('channelId')
    //     .android.setSmallIcon('ic_launcher');
    //
    //
    //   firebase.notifications().displayNotification(notification)

    FCM = firebase.messaging();
        ref = firebase.firestore().collection("users");
        // check to make sure the user is authenticated
        firebase.auth().onAuthStateChanged(user => {

          firebase.messaging().requestPermission()
              .then(() => {
                // User has authorised
              })
              .catch(error => {
                alert(error)
              });

          FCM.getToken().then(token => {
           // stores the token in the user's document
           this.setState({
             token
           })
          });

        });
  }

  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native! Token is { this.state.token }
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
