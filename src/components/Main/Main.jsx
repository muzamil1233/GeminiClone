import React, { useContext } from 'react';
import "./main.css";
import { assets } from '../../assets/assets/assets';
import { Context } from '../../context/context';

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input
  } = useContext(Context);

  const handleSend = () => {
    if (input.trim() !== "") {
      onSent(input);
    }
  };

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img
          onClick={() => { console.log("clicked"); handleSend(); }}
          src={assets.user_icon}
          alt="User Icon"
        />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p><span>Hello dev</span></p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Lorem ipsum dolor sit amet consectetur.</p>
                <img src={assets.compass_icon} alt="Compass Icon" />
              </div>
              <div className="card">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                <img src={assets.bulb_icon} alt="Bulb Icon" />
              </div>
              <div className="card">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                <img src={assets.message_icon} alt="Message Icon" />
              </div>
              <div className="card">
                <p>Lorem ipsum dolor sit amet.</p>
                <img src={assets.code_icon} alt="Code Icon" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="User Icon" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="Gemini Icon" />
              {loading? <div className='loader'> 
                <hr />
                <hr />
                <hr />

              </div>:<p dangerouslySetInnerHTML={{ __html: resultData }}></p>}
              
            </div>
          </div>
        )}
        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
            />
            <div>
              <img src={assets.gallery_icon} alt="Gallery Icon" />
              <img src={assets.mic_icon} alt="Mic Icon" />
              {input?<img
                onClick={handleSend}
                src={assets.send_icon}
                alt="Send Icon"
                style={{ cursor: "pointer" }}
              />:null}
            </div>
          </div>
          <p className="bottom-info">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam, ea laboriosam.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
