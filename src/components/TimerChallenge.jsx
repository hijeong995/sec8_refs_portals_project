import {useState, useRef} from "react";
import ResultModal from "./ResultModal.jsx";

//컴포넌트 함수 안이 아닌 바깥에 저의
//let timer;

export default function TimerChallenge({title, targetTime}) {
    const timer = useRef();
    const dialog  = useRef();
    //남은 시간을 다룽기 위한 상태
    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
    //타이머 활성화되는 조건
    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

/*  타이머가 시작됐는지 안 됐는지 알려주는 상태
    141강에서 주석
    const [timerStarted, setTimerStarted] = useState(false);
    const [timerExpired, setTimerExpired] = useState(false);
*/

    //let timer;
    //interval(간격)이 시간이 다 되면 없애야 한다.
    if(timeRemaining <= 0) {
        clearInterval(timer.current);
        dialog.current.open();
    }

    function handleReset() {
        setTimeRemaining(targetTime * 1000);
    }

    //도전을 시작하기 위한 함수
    function handleStart(){
        //141강 setTimeout -> setInterval 변경
        timer.current = setInterval(() => {
            setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 10)
        }, 10)
    }

    /* 141강에서 주석
    function handleStart(){
        setTimerStarted(true);

        timer.current = setTimeout(() => {
            setTimerExpired(true);
           // 140강에서 주석 dialog.current.showModal();
            dialog.current.open();
        }, targetTime * 1000)
    }
    */

    //도전을 멈추기 위한 함수
    function handleStop(){
        dialog.current.open();
        //141강 주석
        //clearTimeout(timer.current);
        clearInterval(timer.current);
    }

return (
        <>
            {/* 139강에서 주석 처리
                {timerExpired && (
            */}
            {/* 141강애서 timerStarted -> timerIsActive 로 변경 */}
            {/* 142강 주석, <ResultModal ref={dialog} targetTime={targetTime} result="lost"/> */}
            <ResultModal ref={dialog}
                         targetTime={targetTime}
                         remainingTime={timeRemaining}
                         onReset={handleReset}
            />
            {/*)}*/}
            <section className="challenge">
                <h2>{title}</h2>
                {/* 138강. Modal이 있기 때문에 제거
                {timerExpired && <p>You lost!</p>}
                */}
                <p className="challenge-time">
                    {targetTime} second{targetTime > 1 ? 's' : ''}
                </p>
                <p>
                    <button onClick={timerIsActive ? handleStop : handleStart}>
                        {timerIsActive ? 'Stop' : 'Start'} Challenge
                    </button>
                </p>
                <p className={timerIsActive ? 'active' : undefined}>
                    {timerIsActive ? 'Time is running...' : 'Timer inactive'}
                </p>
            </section>
        </>
    );
}