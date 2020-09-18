import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FF6347"
    },
    list: {
        padding: 20
    },
    pokemonContainer: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 5,
        padding: 20,
        marginBottom: 20,
    },
    pokemonName: {
        textTransform: 'capitalize',
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    pokemonDescription: {
        fontSize: 16,
        color: "#999",
        marginTop: 5,
        lineHeight: 24
    },
    pokemonButton: {
        height: 42,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#B22222",
        backgroundColor: "#B22222",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    pokemonButtonText: {
        fontSize: 16,
        color: "#FFFAF0",
        fontWeight: "bold"
    },
    Image: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 150,
        width: 180,

    }

});

export default styles