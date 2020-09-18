import React, { Component } from 'react';
import api from '../services/api';
import { View, Image, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import styles from '../styles/mainStylesheet'

import { fetchPoke } from '../reduxStore/actions/pokeActions';
import { connect } from 'react-redux'
import { StateUtils } from 'react-navigation';
import PropTypes from 'prop-types';

 class Main extends Component {
    static navigationOptions = {
        title: "Pokedex"
    };

    state = {
        pokemonInfo: {},
        results: [],
        offSet: 0,
        limit: 20,
        ImageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"
    };

    componentDidMount() {
        //this.loadPokemons();
        this.props.fetchPoke();
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
        // Pages 'a variavel de numero maximo de paginas nessa api utlizada como exemplo
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
        </View>
    );
    render() {
        //console.log('bla',this.props.randomPoke.isFetching);
        console.log('dd',this.props.randomPoke);
        if(this.props.randomPoke.isFetching == false){
        return (
            <View style={styles.container}>
                <FlatList
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
