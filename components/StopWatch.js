import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: null,
            min_Counter: '00',
            sec_Counter: '00',
            startDisable: false
        }
    }
    componentWillUnmount() {
        clearInterval(this.state.timer)
    }
    onButtonStart = () => {
        let timer = setInterval(() => {
            var num = (Number(this.state.sec_Counter) +1 ).toString(),
                count = this.state.min_Counter;
            if (Number(this.state.sec_Counter) == 59 )  {
                count = (Number(this.state.min_Counter) + 1).toString();
                num = '00'
            } 
            this.setState({
                min_Counter: count.length == 1 ? '0' + count : count,
                sec_Counter: num.length == 1 ? '0' + num : num
            });
        }, 1000);
        this.setState({ timer });
        this.setState({startDisable : true})
    }
    onButtonStop = () => {
        clearInterval(this.state.timer);
        this.setState({startDisable : false})
    }
    onButtonClear = () => {
        this.setState({
            timer: null,
            min_Counter: '00',
            sec_Counter: '00',
        });
    }


    render(){  
        return (
        <View style={styles.MainContainer}>
          <Text style={styles.counterText}>{this.state.min_Counter} : {this.state.sec_Counter}</Text>
          <TouchableOpacity
            onPress={this.onButtonStart}
            activeOpacity={0.6}
            style={[styles.button, { backgroundColor: this.state.startDisable ? '#B0BEC5' : '#FF6F00' }]}
            disabled={this.state.startDisable}> 
          <Text style={styles.buttonText}> START </Text></TouchableOpacity>
          <TouchableOpacity
            onPress={this.onButtonStop}
            activeOpacity={0.6}
            style={[styles.button, {backgroundColor: '#FF6F00'}]} >
            <Text style={styles.buttonText}>STOP</Text></TouchableOpacity>
            <TouchableOpacity
             onPress={this.onButtonClear}
             activeOpacity={0.6}
             style={[styles.button, { backgroundColor: this.state.startDisable ? '#B0BEC5' : '#FF6F00' }]} 
             disabled={this.state.startDisable} >

          <Text style={styles.buttonText}> CLEAR </Text>

        </TouchableOpacity>

        </View>
      );
    }
}

const styles = StyleSheet.create({
    MainContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    button: {
      width: '80%',
      paddingTop:8,
      paddingBottom:8,
      borderRadius:7,
      marginTop: 10
    },
    buttonText:{
        color:'#fff',
        textAlign:'center',
        fontSize: 20
    },
    counterText:{
   
      fontSize: 28,
      color: '#000'
    }
  });