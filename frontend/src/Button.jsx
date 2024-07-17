import styles from './Button.module.css';

function Button({ text, onClickFun, bg = 'white', color = 'gray', size = 1 }) {
  return (
    <button
      className={styles.btn}
      style={{
        backgroundColor: bg,
        color: color,
        padding: `${0.25 * size}rem ${0.5 * size}rem`,
      }}
      onClick={(e) => {
        onClickFun(e);
      }}
    >
      {text}
    </button>
  );
}

export default Button;
