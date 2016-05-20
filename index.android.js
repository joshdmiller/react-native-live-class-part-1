/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
} from 'react-native';

const REQUEST_URI = 'http://jsonplaceholder.typicode.com/users';

class liveClassPart1 extends Component {
  constructor ( props ) {
    super( props );

    this.state = {
      loading: true,
      ds: new ListView.DataSource({
        rowHasChanged: ( r1, r2 ) => r1 !== r2,
      }),
    };
  }

  componentDidMount () {
    fetch( REQUEST_URI )
    .then( d => d.json() )
    .then( users => {
      this.setState({
        loading: false,
        ds: this.state.ds.cloneWithRows( users ),
      });
    })
    .catch(e => console.warn("something went wrong", e))
    ;
  }

  _userRow ( user ) {
    return (
      <View style={styles.userRow}>
        <Image source={{uri: 'https://github.com/google/material-design-icons/raw/master/social/2x_web/ic_person_black_18dp.png'}} style={styles.avatar} />
        <Text style={styles.userName}>{user.name}</Text>
      </View>)
    ;
  }

  _renderList () {
    return (
      <ListView dataSource={this.state.ds} renderRow={this._userRow} />
    );
  }

  render() {
    const { loading } = this.state;
    let contents;

    if ( loading ) {
      contents = <Text style={styles.welcome}>Loading...</Text>;
    } else {
      return this._renderList();
    }

    return (
      <View style={styles.container}>
        { contents }
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
  avatar: {
    width: 18,
    height: 18,
    marginRight: 10,
  },

  userRow: {
    flexDirection: 'row',
    padding: 10,
  },

  userName: {
    flex: 1,
  },
});

AppRegistry.registerComponent('liveClassPart1', () => liveClassPart1);
