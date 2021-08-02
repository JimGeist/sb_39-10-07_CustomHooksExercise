# sb_39-10-07_CustomHooksExercise
 
## Technology Stack
- **Front-end**: ReactJS
- **Back-end**: n/a

## Assignment Details

Practice with writing custom hooks. One hook needed to toggle the `useState` value between `true` and `false`. The second hook needed to handle an api call with Axios.


### Step One: Read the Code

The application presents a deck of regular playing cards on the left and Pokemon characters on the right. The playing card side and Pokemon side are independent of each other, but they will soon share some modules.

The business logic looks nearly identical between the two applications. Some of the duplicate business logic will get placed into custom hooks.


### Step Two: `useFlip`

Both playing cards and Pokemon cards can get 'flipped' -- or turning the card over to show the back via a toggle between isUp / not isUp (true / false). A `useFlip` custom hook was created to handle the card flip. An initial value can get specified for the `useFlip` and `true` is the default initial value. Both **PlayingCard** and **PokemonCard** components were refactured to use the `useFlip` custom hook. 


### Step Three: `useAxios` in _PlayingCardList_

The **PlayingCardLIst** component initialized a card state to an empty array. When `Add a playing card` button is clicked, a callback function makes an axios.get request to the deck of cards api. The resulting card is added to state and the **PlayingCardLIst** component renders. 

The useState for the cards and the axios.get call were moved to a `useAxios` custom hook. Now some of the benefits of a custom hook are evident in that fewer components (Axios, useState, UUID) are imported and the business logic in the component was reduced.


### Step Four: `useAxios` in _PokeDex_

The **PokeDex** component initialized a card state to an empty array. The difference for **PokeDex** is either a random Pokemon character or the selected Pokemon character is added to the Pokemon api url. The SAME `useAxios` custom hook had to get used between both applications. 

This is the part where some confusion occurred. The callback function to add / call the api required an argument to hold the Pokemon character name. **PlayingCardList**'s add / call does not require additional parameters and the was not changed in **PlayingCardList** because I felt the new code to support PokeDex should get added without impacting or further requiring a change to 'production code'.


### Further Study: Removing response data

The 'useAxios' hook was further modified to add a function to remvoe response data / clear state. This change required adding a new button to both **PlayingCardList** and **PokeDex** components. For **PokeDex**, the remove function was then passed as a prop to the child **PokemonSelect** component.


## Additional Details

**Enhancements**
- Function descriptors for `useFlip` and `useAxios` were added.

**Difficulties**
- `useAxios`, and even the original code, was odd because of how the response from the API call was used to alter the state. Some logic was added to the 'add' callback to handle the case where no argument is passed in the add callback -- the add from **PlayingCardList**. Again, rather than further changing existing code to accomodate the `useAxios` hook, the hook was adjusted to only use the argument when it contains a string -- the name of the Pokemon character.
