import SpotifyAccess from "./Components/ChatBot/SpotifyAccess";
import SpotifyAccessPart2 from "./Components/ChatBot/SpotifyAccessPart2";
import LinkList from "./Components/ChatBot/LinkList";


import { createChatBotMessage } from 'react-chatbot-kit';

const config = { 
  botName: "LearningBot",
  initialMessages: [
    createChatBotMessage("Hi, I'm your Acoustic Companion. I'm here to help you find new music. In order to find out what kind of music you might like I'll need access to your Spotify. Is that ok? I promise I won't change anything in your account.", {
      widget: "spotifyAccess",
    }),
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#376B7E",
    },
  },
  widgets: [
     {
     	widgetName: "spotifyAccess",
    	widgetFunc: (props) => <SpotifyAccess {...props} />,
     },
    {
     	widgetName: "greetingPart2",
    	widgetFunc: (props) => <SpotifyAccessPart2 {...props} />,
     },
     {
      widgetName: "javascriptLinks",
      widgetFunc: (props) => <LinkList {...props} />,
      props: {
        options: [
          {
            text: "Introduction to JS",
            url:
              "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/basic-javascript/",
            id: 1,
          },
          {
            text: "Mozilla JS Guide",
            url:
              "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
            id: 2,
          },
          {
            text: "Frontend Masters",
            url: "https://frontendmasters.com",
            id: 3,
          },
        ]
      }
    },
 ]
}

export default config