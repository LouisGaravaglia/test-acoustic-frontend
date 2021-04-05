import React from "react";

//DEFINING THE CONTRACT FOR OUR CODE'S VARIABLE TYPES FOR THE CREATE CONTEXT FUNCTION
interface IState {
    user: {
      first_name: string
      last_name: string
      email: string
      username: string
      password: string
      access_token: string | null
      refresh_token: string | null
    }
    chattyMessagesPhase: number
    displayedContent: JSX.Element[]
    stateKey: string
    loadingSpinner: boolean
    incrementMessagingPhase: (payload: number) => void
    resetPhases: () => void
    updateUser: (key: string, value: string) => void
    addContentToBeDisplayed: (payload: JSX.Element[]) => void
    updateStakeKey: (payload: string) => void
    displayLoadingSpinner: () => void
};

//VARIABLE TYPES FOR THE ACTION OF OUR REDUCER FUNCTION
interface IAction {
  type: string
  payload?: any
  key?: string
  value?: string
};

//VARIABLE TYPES FOR THE STATE OF OUR REDUCER FUNCTION
const initialState: IState = {
  user: {
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    access_token: "",
    refresh_token: ""
  },
  chattyMessagesPhase: 0,
  displayedContent: [],
  stateKey: "",
  loadingSpinner: false,
  incrementMessagingPhase: () => {},
  resetPhases: () => {},
  updateUser: () => {},
  addContentToBeDisplayed: () => {},
  updateStakeKey: () => {},
  displayLoadingSpinner: () => {}
};

//CREATE CONTEXT TO BE ABLE TO PASS THROUGH TO OUR CHATTY COMPONENT MORE EFFICIENTLY THAN PROPS
export const MessagesContext = React.createContext<IState>(initialState);

const actions = {
  UPDATE_USER: "UPDATE_USER",
  UPDATE_MESSAGING_PHASE: "UPDATE_MESSAGING_PHASE",
  RESET: "RESET",
  DISPLAY_CONTENT: "DISPLAY_CONTENT",
  UPDATE_STATEKEY: "UPDATE_STATEKEY",
  DISPLAY_LOADING_SPINNER: "DISPLAY_LOADING_SPINNER"
};

//OUR REDUCER FUNCTION TO HANDLE ANY FUNCTIONS THAT EFFECT OUR STATE
const reducer = (state: IState, action: IAction): IState => {
  switch(action.type) {
    case actions.UPDATE_USER:
      return {...state, user: {...state.user, [action.key as keyof IState["user"]]: action.value}}
    case actions.UPDATE_MESSAGING_PHASE:
      return {...state, chattyMessagesPhase: state.chattyMessagesPhase + action.payload}
    case actions.DISPLAY_CONTENT:
      return {...state, displayedContent: [...state.displayedContent, ...action.payload]}
    case actions.UPDATE_STATEKEY:
      return {...state, stateKey: action.payload}
    case actions.DISPLAY_LOADING_SPINNER:
      return {...state, loadingSpinner: true}
    case actions.RESET:
      return {
        ...state,
        chattyMessagesPhase: 0,
        displayedContent: [],
        loadingSpinner: false,
        user: {
          first_name: "",
          last_name: "",
          email: "",
          username: "",
          password: "",
          access_token: "",
          refresh_token: ""
        }
      };
    default:
      return state;
  };
};

//OUR MESSSAGEPROVIDER FUNCTION IS WHAT USES OUR REDUCER AND INITIAL STATE AND
//MAKES AVAILALBE TO THE CHILDREN
export const MessagesProvider: React.FC = (props: any): JSX.Element => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const value = {
    user: state.user,
    chattyMessagesPhase: state.chattyMessagesPhase,
    displayedContent: state.displayedContent,
    stateKey: state.stateKey,
    loadingSpinner: state.loadingSpinner,
    incrementMessagingPhase: (payload: number) => {
      dispatch({type: actions.UPDATE_MESSAGING_PHASE, payload})
    },
    resetPhases: () => {
      dispatch({type: actions.RESET})
    },
    updateUser: (key: string, value: string) => {
      dispatch({type: actions.UPDATE_USER, key, value})
    },
    addContentToBeDisplayed: (payload: JSX.Element[]) => {
      dispatch({type: actions.DISPLAY_CONTENT, payload})
    },
    updateStakeKey: (payload: string) => {
      dispatch({type: actions.UPDATE_STATEKEY, payload})
    },
    displayLoadingSpinner: () => {
      dispatch({type: actions.DISPLAY_LOADING_SPINNER})
    }
  };

  return (
    <MessagesContext.Provider value={value}>
      {props.children}
    </MessagesContext.Provider>
  );
};