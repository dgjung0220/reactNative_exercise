import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
} from 'react-native';

import Forecast from './Forecast';

const API_KEY = '6c3575dce02cfdd1e4f5a8d41a5f23cc';

export default class WeatherProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: '',
            forecast: null
        };
    }

    _handleTextChange = (event) => {
        let city = event.nativeEvent.text;
        this.setState({city : city});

        // Get open wether map api
        fetch('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&APPID=' + API_KEY)
        .then((response) => response.json())
        .then((responseJSON) => {
            this.setState({
                forecast: {
                    main: responseJSON.weather[0].main,
                    description: responseJSON.weather[0].description,
                    temp: responseJSON.main.temp
                }
            });
        })
    }
    
    render(){
        let content = null;
        if (this.state.forecast !== null) {
            content = <Forecast
                        main={this.state.forecast.main}
                        description={this.state.forecast.description}
                        temp={this.state.forecast.temp} />
        }

        return(
            <View style={styles.container}>
                <View style={styles.row}>
                    <Text style={styles.mainText}>
                        Current weather for   
                    </Text>
                    <View style={styles.zipContainer}>
                        <TextInput style={styles.zipCode} returnKeyType='done'
                                    onSubmitEditing={(event) => this._handleTextChange(event)}/>
                    </View>
                </View>
                <View style={styles.body}>
                    {content}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: 'skyblue',
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: 'flex-start',
        padding: 10
    },
    zipContainer: {
        borderBottomColor: '#DDDDDD',
        borderBottomWidth: 1,
        marginLeft: 5,
        marginTop: 3,
    },
    zipCode: {
        width: 50,
        height: 16,
        padding: 0,
    },
    body: {
        flex: 2
    },
    mainText: {
        fontSize: 16,
        color: '#ffffff'
    }
})