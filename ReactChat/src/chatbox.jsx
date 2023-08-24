import "./css/chatbox.css";
import { useState, useRef, useEffect } from "react";
import { printResponseStream, updateURI } from "./socketcall";
import { WhisperSTT } from "whisper-speech-to-text";

export default function Chatbox() {
  const chatRef = useRef(null);

  const default_msg = {
    text: "This is the default msg !",
    sender: "server",
  };

  const [messages, setMessages] = useState([default_msg]);
  const [inputMessage, setInputMessage] = useState("");
  const [loadDot, setLoadDot] = useState(false);
  const [msgCount, setMsgCount] = useState(0);
  const [URI, setURI] = useState("");

  // console.log(messages);

  // var msgCount = 0;
  var placeholder_msg =
    msgCount < 2
      ? "Enter your Prompt here"
      : "You have exhausted the messaging limit.";
  console.log(msgCount);
  // Handle the scroll behaviour
  useEffect(() => {
    if (chatRef) {
      chatRef.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
  }, []);

  const whisper = new WhisperSTT(
    "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"
  );

  async function speech() {
    await whisper.startRecording();

    const answer = await whisper.stopRecording((text) => {
      console.log("Transciption: ", text);
    });

    setTimeout(() => {
      answer();
      whisper.stopRecording();
    }, 3000);
  }

  const handleApiEndpoint = async (e) => {
    e.preventDefault();
    if (URI.trim() === "") return;
    const uriResponse = await updateURI(URI);
    if(uriResponse) alert(`The remote URI is set to ${URI}`);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (inputMessage.trim() === "") return;
    setMsgCount(msgCount + 1);

    const userMessage = {
      text: inputMessage,
      sender: "user",
    };
    setMessages([...messages, userMessage]);
    setLoadDot(true);
    setInputMessage("");
    const botResponse = await printResponseStream(userMessage.text);

    const serverResponse = {
      text: botResponse,
      sender: "server",
    };
    setLoadDot(false);
    setMessages([...messages, userMessage, serverResponse]);
  };

  // setMessages([deff]);
  return (
    <section className="msger">
      <div>
        <form className="msger-inputarea" onSubmit={handleApiEndpoint}>
          <label>Api Endpoint :</label>
          <input
            type="text"
            className="msger-input"
            placeholder="Ex: wss://tell-jewelry-industries-rebates.trycloudflare.com/api/v1/stream"
            value={URI}
            onChange={(e) => setURI(e.target.value)}
          />
          <button
            type="submit"
            className="msger-send-btn"
          >
            Send
          </button>
        </form>
      </div>
      <div className="msger-chat" ref={chatRef}>
        {messages.map((e) =>
          e.sender == "user" ? (
            <>
              <div className="msg right-msg">
                <div className="msg-img"></div>
                <div className="msg-bubble">
                  <div className="msg-info">
                    <div className="msg-info-name">User</div>
                    <div className="msg-info-time">12:45</div>
                  </div>
                  <div className="msg-text">{e.text}</div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="msg left-msg">
                <div className="msg-img"></div>
                <div className="msg-bubble">
                  <div className="msg-info">
                    <div className="msg-info-name" onClick={speech}>
                      BOT
                    </div>
                    {/* <div className="msg-info-time">12:45</div> */}
                    <div>$$</div>
                  </div>
                  <div className="msg-text">{e.text}</div>
                </div>
              </div>
            </>
          )
        )}
        {loadDot && <div className="custom-loader"></div>}
      </div>

      {/* (loadDot) ? :null */}
      <form className="msger-inputarea" onSubmit={handleSendMessage}>
        <input
          type="text"
          className="msger-input"
          placeholder={placeholder_msg}
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          disabled={msgCount > 2}
        />
        <button
          type="submit"
          disabled={msgCount > 2}
          className="msger-send-btn"
        >
          Send
        </button>
      </form>
    </section>
  );
}
