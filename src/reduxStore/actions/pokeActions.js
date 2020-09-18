import {FETCH_POKE_REQUEST , FETCH_POKE_SUCCESS , FETCH_POKE_FAILURE, MAXIMUM_SAVINGS  } from './types';

export const fetchingPokeRequest = () => ({ type: FETCH_POKE_REQUEST });

export const fetchingPokeSuccess = json => ({
    type: FETCH_POKE_SUCCESS,
    payload: json
});

export const fetchingPokeFailure = error => ({
    type: FETCH_POKE_FAILURE,
    payload: error 
});

export const fetchPoke = (offSet) => {
    console.log(offSet);
    return async (dispatch , offset) => {
        
        dispatch(fetchingPokeRequest());
        try{
            let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=100&offset=0`);
            let json = await response.json();
            console.log('hey',json.results);
            console.log('resux',offSet);
            dispatch(fetchingPokeSuccess(json.results));
            // return {
            //     type: MAXIMUM_SAVINGS,
            //     payload: json.results
            //   };

        } catch(error) {
            dispatch(fetchingPokeFailure(error));
        }
    };
};