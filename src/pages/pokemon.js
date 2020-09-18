import React, { Component } from 'react';
import api from '../services/api';
import styles from '../styles/pokemonPageStyleSheet'
import _ from 'lodash';
import { View, Image, Text, YellowBox, FlatList, ScrollView } from "react-native";

YellowBox.ignoreWarnings([
    'VirtualizedLists should never be nested', // TODO: Tratar o Warning
])

export default class Pokemon extends Component {

    static navigationOptions = ({ navigation }) => {
        const { state } = navigation
        return {
            title: `${state.params.pokemon.name.replace(/^\w/, c => c.toUpperCase())}`//this.navigationOptions.getParams(pokemon)
        }
    }

    state = {
        pokemonInfo: {},
        types: [],
        disadvantages: [],
        advantages: [],
        ImageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"
    }


    componentDidMount() {
        this.loadPokemon();
    }

    loadPokemon = async () => {
        const pokemonName = this.props.navigation.state.params.pokemon.name

        const response = await api.get(`/pokemon/${pokemonName}/`);
        const { types, ...pokemonInfo } = response.data;

        this.setState({
            types: types,
            pokemonInfo,

        })
        this.loadTypeAdvantages();

    };

    loadTypeAdvantages = async () => {
        const types = this.state.types;
        
        for (const type of types) {
            const response = await api.get(`/type/${type.type.name}`);
            const { damage_relations } = response.data;

            this.setState({
                advantages: [...this.state.advantages, ...damage_relations.double_damage_to].filter(function (a) {
                    return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
                }, Object.create(null)),
                disadvantages:[...this.state.disadvantages, ...damage_relations.double_damage_from].filter(function (a) {
                    return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
                }, Object.create(null))
            })
        }
    };

    filterUnique=(array)=>{

        
    }
    takeIdFromUrl = (baseURL) => {
        const id = baseURL.replace("https://pokeapi.co/api/v2/pokemon/", "").replace("/", "");
        return id;
    }

    renderItem = ({ item }) => {
        const typeColor = item.type.name;

        return (
            <View style={_.get(styles, typeColor)}>
                <Text style={styles.pokemonTypes}>{item.type.name}</Text>
            </View>
        );

    }
    renderItemRelation = ({ item }) => {
        const typeName = item.name;
        return (
            <View style={_.get(styles, typeName)}>
                <Text style={styles.pokemonTypes}>{item.name}</Text>
            </View>
        );

    }
    render() {
        const pokemon = this.props.navigation.state.params.pokemon;

        return (
            <ScrollView >
                <Text style={styles.pokemonStats}>Name: {this.takeIdFromUrl(pokemon.name)}</Text>
                <Text style={styles.pokemonStats}>Weight: {this.state.pokemonInfo.weight} hectograms</Text>
                <Text style={styles.pokemonStats}>Height: {this.state.pokemonInfo.height} decimetres</Text>
                <Text style={styles.pokemonStats}>Base Experience: {this.state.pokemonInfo.base_experience}</Text>

                <Image
                    style={styles.Image}
                    source={{ uri: this.state.ImageUrl + this.takeIdFromUrl(pokemon.url) + ".png" }}
                />
                <Text style={styles.pokemonStats}>type</Text>
                <View style={styles.container}>
                    <FlatList
                        contentContainerStyle={styles.list}
                        numColumns={2}
                        data={this.state.types}
                        keyExtractor={item => item.type.url}
                        renderItem={this.renderItem}
                    />
                    <Text style={styles.pokemonStats}>advantages</Text>
                    <FlatList
                        contentContainerStyle={styles.list}
                        numColumns={3}
                        data={this.state.advantages}
                        keyExtractor={item => item.name}
                        renderItem={this.renderItemRelation}
                    />
                    <Text style={styles.pokemonStats}>Disadvantages</Text>
                    <FlatList
                        
                        contentContainerStyle={styles.list}
                        numColumns={3}
                        data={this.state.disadvantages}
                        keyExtractor={item => item.name}
                        renderItem={this.renderItemRelation}
                    />
                </View>

                <View style={styles.container}>

                </View>

            </ScrollView>
        )
    }


}

