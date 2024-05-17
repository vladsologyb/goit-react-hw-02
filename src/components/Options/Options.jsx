import css from './Options.module.css'

export default function Options({ totalFeedback, updateFeedback, onReset }) {
    return (
        <div className={css.btn}>
            <button onClick={() => updateFeedback("good")}>Good</button>
            <button onClick={() => updateFeedback("neutral")}>Neutral</button>
            <button onClick={() => updateFeedback("bad")}>Bad</button>
            {totalFeedback > 0 && (<button onClick={() => onReset('Reset')}>Reset</button>)}
        </div>
    )
}