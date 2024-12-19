import {forwardRef, useImperativeHandle, useRef} from 'react';
import {createPortal} from "react-dom";

/* 139강에서 주석
export default function ResultModal({ref, result, targetTime}){
    return (
        <dialog ref={ref} className="result-modal">
            <h2>You {result}</h2>
            <p>The target time was <strong>{targetTime} seconds.</strong></p>
            <p>You stopped the timer with <strong>X seconds left.</strong></p>
            {/!*dialog로 설정하면 dialog 안에는 form을 제출하는 버튼이 있다.*!/}
            <form method="dialog">
                <button>Close</button>
            </form>
        </dialog>
    );
}
*/
/* 142강 result 속성 제거 */
const ResultModal = forwardRef(function ResultModal({targetTime, remainingTime, onReset}, ref){
    const dialog = useRef();

    const userLost = remainingTime <= 0;
    //remainingTime은 밀리초 이기 때문에 나누기 1000을 해서 초 단위로 변경
    //toFixed(2)를 사용하여 소수점 두 자리수 까지만 표시
    const formattedRemainingTime = (remainingTime / 1000).toFixed(2);

    const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

    //첫번째 인자는 forwardRef 로부터 받은 ref
    /*두번째 인자는  함수인데 객체를 반환해야 하며 속성과 메소드들을 모아 놓는다.
      그 속성과 메소드들은 컴포넌트나 다른 컴포넌트에 노출되어야 하는 것들이다.
    */
    useImperativeHandle(ref, () => {
       return {
            //이 메소드는 컴포넌트 바깥에서 호출될 것이다.
            open() {
                dialog.current.showModal();
            }
       };
    });

    return createPortal(
        <dialog ref={dialog} className="result-modal" onClose={onReset}>
            {userLost && <h2>You Lost</h2>}
            {!userLost && <h2>Your Score: {score}</h2>}
            <p>The target time was <strong>{targetTime} seconds.</strong></p>
            <p>You stopped the timer with <strong>{formattedRemainingTime} seconds left.</strong></p>
            {/*dialog로 설정하면 dialog 안에는 form을 제출하는 버튼이 있다.*/}
            <form method="dialog" onSubmit={onReset}>
                <button>Close</button>
            </form>
        </dialog>,
        document.getElementById('modal')
    );
})

export default ResultModal;