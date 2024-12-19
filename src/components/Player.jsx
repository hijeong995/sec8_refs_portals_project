import {useState, useRef} from "react";

export default function Player() {
    const playerName = useRef();
    const [enteredPlayerName, setEnteredPlayerName] = useState(null);

    function handelClick(){
        setEnteredPlayerName(playerName.current.value);
        playerName.current.value = '';
    }

    /* 참조 없이 사용
    const [submitted, setSubmitted] = useState(false);


    function handleChange(event) {
        setSubmitted(false);
        setEnteredPlayerName(event.target.value);
    }

    function handelClick(){
        setSubmitted(true);
    }
    */

  return (
      <section id="player">
          {/* 참조를 사용하지 않은
          <h2>Welcome {submitted ? enteredPlayerName : 'unknown entity'}</h2>
          */}
          <h2>Welcome {enteredPlayerName ?? 'unknown entity'}</h2>
          <p>
              <input ref={playerName}
                     type="text"
                     /* 참조를 사용하지 않은
                       onChange={handleChange}
                       value={enteredPlayerName}
                     */
              />
              <button onClick={handelClick}>Set Name</button>
          </p>
      </section>
  );
}
