export default function ReplaceButton({ onResetClick }) {
    return (
      <div className="replace_button" onClick={onResetClick}>
        <img src='./images/replace.png' alt='reset' /> 
      </div>
    )
}