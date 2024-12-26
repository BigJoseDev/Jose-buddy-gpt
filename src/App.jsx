import React, { useEffect, useRef, useState } from 'react';
import gptLogo from './assets/chatgpt.svg';
import './App.css';
import addBtn from './assets/add-30.png';
import msgIcon from './assets/message.svg';
import home from './assets/home.svg';
import saved from './assets/bookmark.svg';
import rocket from './assets/rocket.svg';
import sendBtn from './assets/send.svg';
import userIcon from './assets/user-icon.png';
import gptImgLogo from './assets/chatgptLogo.svg';
import { sendMsgToOpenAI } from './openai';

const App = () => {
  const msgEnd = useRef(null);
  const [input, setInput] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false); // State to manage sidebar visibility
  const [messages, setMessages] = useState([
    {
      text: "Hi, I am Jose Buddy, an AI assistant created by Jose. I am here to help you with your queries. How can I help you today?",
      isBot: true,
    },
  ]);

  useEffect(() => {
    msgEnd.current.scrollIntoView();
  }, [messages]);

  const handleSend = async () => {
    const text = input;
    setInput('');
    setMessages([...messages, { text, isBot: false }]);
    const res = await sendMsgToOpenAI(text);
    setMessages([...messages, { text, isBot: false }, { text: res, isBot: true }]);
  };

  const handleEnter = async (e) => {
    if (e.key === 'Enter') await handleSend();
  };

  const handleQuery = async (e) => {
    const text = e.target.value;
    setMessages([...messages, { text, isBot: false }]);
    const res = await sendMsgToOpenAI(text);
    setMessages([...messages, { text, isBot: false }, { text: res, isBot: true }]);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="App">
      {/* Hamburger Icon for Mobile */}
      <div className="hamburger" onClick={toggleSidebar}>
        <img
          src={
            sidebarOpen
              ? 'https://www.citypng.com/public/uploads/preview/png-close-x-logo-white-icon-73581169686041574qndouypm.png' // "X" icon
              : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQstdKmu4kkL4Zjoi4XW-soR3Upi1R9pWvk-w&s' // Hamburger icon
          }
          alt={sidebarOpen ? 'Close Menu' : 'Open Menu'}
        />
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="upperSide">
          <div className="upperSideTop">
            <img src={gptLogo} alt="Logo" className="logo" />
            <span className="brand">Jose Buddy</span>
          </div>
          <button className="midBtn" onClick={() => window.location.reload()}>
            <img src={addBtn} alt="new chat" className="addBtn" />
            New Chat
          </button>
          <div className="upperSideBottom">
            <button className="query" onClick={handleQuery} value={"How to use an API?"}>
              <img src={msgIcon} alt="query" />
              How to use an API?
            </button>
            <button className="query" onClick={handleQuery} value={"What is programming?"}>
              <img src={msgIcon} alt="" />
              Smart contract
            </button>
          </div>
        </div>

        <div className="lowerSide">
          <div className="listItems">
            <img src={home} alt="" className="listItemsImg" />
            Home
          </div>
          <div className="listItems">
            <img src={saved} alt="" className="listItemsImg" />
            Saved
          </div>
          <div className="listItems">
            <img src={rocket} alt="" className="listItemsImg" />
            Upgrade to pro
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="main">
        <div className="chats">
          {messages.map((message, i) => (
            <div key={i} className={message.isBot ? 'chat bot' : 'chat'}>
              <img
                className="chatimg"
                src={message.isBot ? gptImgLogo : userIcon}
                alt=""
              />
              <p className="txt">{message.text}</p>
            </div>
          ))}
          <div ref={msgEnd} />
        </div>
        <div className="chatFooter">
          <div className="inp">
            <input
              type="text"
              placeholder="Ask Jose anything..."
              value={input}
              onKeyDown={handleEnter}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="send">
              <img src={sendBtn} alt="Send" onClick={handleSend} />
            </button>
          </div>
          <p>
            Jose may produce inaccurate information about people, places, or facts. Jose 2024 Version
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
