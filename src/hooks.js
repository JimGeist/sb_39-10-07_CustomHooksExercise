import { useState } from "react";

import { v4 as uuid } from "uuid";
import axios from "axios";


/**
 * useFlip toggles a useState between true and false.
 * @param {*} initialState is the initial state. Defaults to true when not provided. 
 * @returns [currentState, flipFunction] current state is the current state value
 *   and flipFunction is the function used to change the current state.
 */
const useFlip = (initialState = true) => {

    const [isFacingUp, setIsFacingUp] = useState(initialState);
    const flipCard = () => {
        setIsFacingUp(isUp => !isUp);
    };

    return [isFacingUp, flipCard];

}

/**
 * useAxios makes an axios get request to the provided url. The 
 *  resulting item from the get request is added to the values 
 *  already in state.
 * @param {*} url, required, no default, the url for the API  
 * @param {*} initialState, required, the initial state of the 
 *  object array. [] is the default.
 * @returns [currentState, addFunction, removeFunction] 
 *   currentState has the objects from previous API calls. 
 *  addFunction is the callback function
 *   that gets a new value via API and adds it to state. 
 *   The addFunction call accepts an optional string argument. The 
 *   contents of this arguement are added to the url.
 *  removeFunction is the callback function to remove all object 
 *   from state / sets state to initialState.
 */
const useAxios = (url, initialState = []) => {

    const [cards, setCards] = useState(initialState);

    const addCard = async (urlParams) => {

        let urlFull;
        // Make sure urlParams is a string. Do not use urlParams when
        //  it is not a String. The event object is returned as urlParams 
        //  when addCard() is called without an argument.
        typeof urlParams === "string" ?
            urlFull = `${url}${urlParams}/` :
            urlFull = url;


        const response = await axios.get(
            urlFull
        );
        setCards(cards => [...cards, { ...response.data, id: uuid() }]);
    };

    const removeAllCards = () => {
        setCards(initialState);
    }

    return [cards, addCard, removeAllCards];
}




export { useFlip, useAxios };