import React, { Component } from 'react';
import api from '../services/api';
import { View, Image, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import styles from '../styles/mainStylesheet'

import { fetchPoke } from '../reduxStore/actions/pokeActions';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
var SharedPreferences = require('react-native-shared-preferences');

import {Icon} from 'native-base';

 class Main extends Component {
    static navigationOptions = {
        title: "Pokedex"
    };

    state = {
        // pokemonInfo: {},
        // results: [],
        // offSet: 0,
        // limit: 20,
         ImageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/",
        favourites: [],
    };

    componentDidMount() {
        //this.loadPokemons();
        this.props.fetchPoke();
        let ref = this;
        SharedPreferences.getAllKeys(function(keys){
            //console.log('ll',keys);
            if(typeof keys !== "undefined"){
            //this.setState({ favourites: keys })
            console.log('ke',keys);
            ref.setState({favourites: keys});
            }
          });

    }


    loadPokemons = async (offSet = 0) => {
        const response = await api.get(`/pokemon?offset=${offSet}&limit=${this.state.limit}`);

        console.log(response.data);

        const { results, ...pokemonInfo } = response.data;

        console.log('results',results);
        console.log('pokemoninfo',pokemonInfo);

        this.setState({
            results: [...this.state.results, ...results],
            //pokemonInfo,
            offSet

        })
    };

    loadMore = () => {
        console.log('this.loadmore');
        const  offSet = this.props.randomPoke.offSet;
        
        //if (pokemonInfo.next == null) return;

        this.setState((prevState) =>({
            offSet:  prevState.offSet + 20
        }));
        // const offSetNumber = this.props.randomPoke.offSet + this.props.randomPoke.limit;
        console.log(offSet, this.props.randomPoke.limit);

        const offSetNumber = this.state.offSet + this.state.limit;

        //this.loadPokemons(offSetNumber);
        // console.log('offset',this.state.offSet);
        // this.props.fetchPoke(this.state.offset);
    }


    takeIdFromUrl = (baseURL) => {
        const id = baseURL.replace("https://pokeapi.co/api/v2/pokemon/", "").replace("/", "");
        return id;
    }

    TickFav = rowData => {
        // rowData.is_fav = !rowData.is_fav
        // this.setState({});
        if(this.state.favourites.includes(rowData.name)){

            SharedPreferences.setItem(rowData.name,rowData.url);

            var joined = this.state.favourites;
            const index = joined.indexOf(rowData.name);
            if (index > -1) {
                joined.splice(index, 1);
              }
            this.setState({ favourites: joined })
        }
        else{
        SharedPreferences.removeItem(rowData.name);
        // SharedPreferences.getAllKeys(function(keys){
        //     console.log('keys',keys);
        //   });
        var joined = this.state.favourites.concat(rowData.name);
        this.setState({ favourites: joined })
        console.log('rowdata',rowData);
        }
      }

    
    renderItem = ({ item }) => (
        <View style={styles.pokemonContainer}>
            <Text style={styles.pokemonName}>{this.takeIdFromUrl(item.url)}-{item.name}</Text>
            <Image
                style={styles.Image}
                source={{ uri: this.state.ImageUrl + this.takeIdFromUrl(item.url) + ".png" }}
            />
            <TouchableOpacity style={styles.pokemonButton}
                onPress={() => {
                    this.props.navigation.navigate("Pokemon", { pokemon: item })
                }}
            >
                <Text style={styles.pokemonButtonText}>Check Pokemon</Text>
                
            </TouchableOpacity>
            <TouchableOpacity style = { styles.favouriteButton } onPress={() => this.TickFav(item)} >
            {this.state.favourites.includes(item.name)? <Icon name='heart' />: <Icon name='heart-outline' /> }
           
            </TouchableOpacity>
            
            
            
            
        </View>
    );
    render() {
        //console.log('ff',this.state.favourites);
        //console.log('bla',this.props.randomPoke.isFetching);
        //console.log('dd',this.props.randomPoke);
        if(this.props.randomPoke.isFetching == false){
        return (
            <View style={styles.container}>
                <FlatList

                    extraData = {this.state}

                    contentContainerStyle={styles.list}
                    data={this.props.randomPoke.results}
                    keyExtractor={item => item.url}
                    renderItem={this.renderItem}
                    onEndReached={this.loadMore}
                    onEndReachedThreshold={0.3}
                />
            </View>
        );

            }
            else{
                return (
                    <View style={styles.container}>
                        {/* <FlatList
                            contentContainerStyle={styles.list}
                            data={this.props.randomPoke.results}
                            keyExtractor={item => item.url}
                            renderItem={this.renderItem}
                            onEndReached={this.loadMore}
                            onEndReachedThreshold={0.3}
                        /> */}
                    </View>
                );  
            }
        
    }
}

Main.PropTypes = {
    fetchPoke: PropTypes.func.isRequired,
    randomPoke: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {
        randomPoke: state
    };
};

export default connect(mapStateToProps, { fetchPoke })(Main);
