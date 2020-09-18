import {FETCH_POKE_REQUEST ,
     FETCH_POKE_SUCCESS ,
      FETCH_POKE_FAILURE  } from '../actions/types';

import * as Action from '../actions/pokeActions';

      const initialState = {
        pokemonInfo: {},
        results: [],
        offSet: 0,
        limit: 20,
        ImageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/",
        isFetching: false
      }

      const pokeReducer = (state = initialState, action) => {
          switch (action.type) {
              case Action.FETCH_POKE_REQUEST:
                  return { ...state, isFetching: true };
              case Action.FETCH_POKE_FAILURE:
                  console.log(fprs);
                  return { ...state, isFetching: false, errorMessage: action.payload };
              case FETCH_POKE_SUCCESS:
                  return { ...state, isFetching: false , results: action.payload };
              case Action.MAXIMUM_SAVINGS:
                  return { ...state, isFetching: false , results: action.payload };
              default:
                  return state;
          }
      };

      export default pokeReducer;