import React from 'react';
import {
    View,
    Text,TouchableOpacity,Image
} from 'react-native';

export default class Users extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        items: []
      };
    }
  
    componentDidMount() {
      fetch("http://zeus.marcohama.com/api/zeusapi/get_companies")
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              items: result
            });
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }
  
    render() {
      const { error, isLoaded, items } = this.state;
      if (error) {
        return <Text style={{marginTop:200}}>Error: {error.message}</Text>;
      } else if (!isLoaded) {
        return <Text style={{marginTop:200}}>Loading...</Text>;
      } else {
        return (
          <View style={{marginTop:200}}>
            {items.map(item => (
              <Text key={item.id}>
                {item.id} {item.email}
              </Text>
            ))}
          </View>
        );
      }
    }
}
    

