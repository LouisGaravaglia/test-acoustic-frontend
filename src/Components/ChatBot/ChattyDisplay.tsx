import React, {useContext, useRef} from "react";
import {MessagesContext} from "./MessagesProvider";
import MessageWrapper from "./MessageWrapper";
import ButtonWrapper from "./ButtonWrapper";
import Register from "./Register";
import useMessages from "./helpers/useMessages";
import useButtons from "./helpers/useButtons";
import {useHistory} from "react-router-dom";
import Backend from "../../Backend";
import useViewport from "../../Hooks/useViewport";
import UseAnimations from "react-useanimations";
import loading from 'react-useanimations/lib/loading'

//HOLDS ALL THE MESSAGE WRAPPER AND BUTTON WRAPPER COMPONENTS NEEDED TO BUILD THE 
//CONVERSATION CHATTY WILL HAVE WITH OUR USER
function ChattyDisplay(): JSX.Element {
  const scrollToBottomRef = useRef<any | null>();
  const history = useHistory();
  const {user, chattyMessagesPhase, displayedContent, loadingSpinner} = useContext(MessagesContext);
  const {viewportHeight}  = useViewport();
  const {initialButtons, proceedWithoutSpotifyButtons, tryAgainButtons} = useButtons();
  const {
    initialMessages,
    whatIfNoSpotify,
    spotifyAccountError,
    proceedWithoutSpotify,
    secondFailedAttempt,
    spotifyAccountValid,
    registerUserPartOne,
    registerUserPartTwo,
    registerUserPartThree,
    registerUserPartFour,
    registerUserPartFive,
    registerUserPartSix,
  } = useMessages();

  //FINISHED FUNCTION THAT WILL WILL RUN ONCE CHATTY HAS SENT THE FINAL MESSAGE TO REDIRECT TO USER PROFILE
  const redirectToProfile = (val: boolean) => {
    if (val === true) history.push("/profile");
    try {
      Backend.registerUser(user);
    } catch(e) {
      //add flash message functionality if registering user fails
    }
  };

///////////////////////////////////////////////  CHATTY SCRIPT  /////////////////////////////////////////////////

  //ALL POSSIBLE MESSAGE AND BUTTON OPTIONS THAT CHATTY CAN DISPLAY TO THE USER
  //THROUGH THE CHATTYMESSAGEPHASE VARIABLE WE WILL NAVIGATE TO THE NECESSARY ITEM TO DISPLAY
  const chattyScript = [
    <MessageWrapper key={initialMessages.id} messages={initialMessages.messages}/>,
    <ButtonWrapper key={initialButtons.id} buttons={initialButtons.buttons}/>,
    <MessageWrapper key={whatIfNoSpotify.id} messages={whatIfNoSpotify.messages}/>,
    <ButtonWrapper key={proceedWithoutSpotifyButtons.id} buttons={proceedWithoutSpotifyButtons.buttons}/>,
    <MessageWrapper key={spotifyAccountError.id} messages={spotifyAccountError.messages}/>,
    <ButtonWrapper key={tryAgainButtons.id} buttons={tryAgainButtons.buttons}/>,
    <MessageWrapper key={proceedWithoutSpotify.id} messages={proceedWithoutSpotify.messages} incrementMessageValue={3}/>,
    <MessageWrapper key={secondFailedAttempt.id} messages={secondFailedAttempt.messages} incrementMessageValue={2}/>,
    <MessageWrapper key={spotifyAccountValid.id} messages={spotifyAccountValid.messages}/>,
    <MessageWrapper key={registerUserPartOne.id} messages={registerUserPartOne.messages}/>,
    <Register key={"first name"} input="first name"/>,
    <MessageWrapper key={registerUserPartTwo.id} messages={registerUserPartTwo.messages}/>,
    <Register key={"last name"} input="last name"/>,
    <MessageWrapper key={registerUserPartThree.id} messages={registerUserPartThree.messages}/>,
    <Register key={"email"} input="email"/>,
    <MessageWrapper key={registerUserPartFour.id} messages={registerUserPartFour.messages}/>,
    <Register key={"username"} input="username"/>,
    <MessageWrapper key={registerUserPartFive.id} messages={registerUserPartFive.messages}/>,
    <Register key={"password"} input="password"/>,
    <MessageWrapper key={registerUserPartSix.id} messages={registerUserPartSix.messages} finishedFunction={redirectToProfile}/>,
  ]

///////////////////////////////////////////////  RETURN JSX  /////////////////////////////////////////////////

  return (
    <>
    {loadingSpinner && <UseAnimations className="Chatty-Loading-Spinner" animation={loading} size={200} style={{ padding: 100 }} strokeColor="#37f8ff" />}
    <div className="Chatty-Container" >
      <div className="Chatty" style={{maxHeight: viewportHeight - 200}}>
        <div className="Chatty-Left-Filler"></div>
        <div className="Chatty-Display">
          {displayedContent.map((item, index) => <div key={index}>{item}</div>)}
          {chattyScript[chattyMessagesPhase]}
          <div className="Chatty-MSG-Bottom-Filler" ref={scrollToBottomRef}></div>
        </div>
        <div className="Chatty-Right-Filler"></div>
      </div>
    </div>
    </>
  );
};

export default ChattyDisplay;