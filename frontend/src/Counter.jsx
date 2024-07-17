import Button from './Button';
import styles from './Counter.module.css';

function Counter({ count, onCount }) {
  return (
    <section className={styles.counter}>
      <Button
        color="green"
        text="-"
        size={2}
        onClickFun={() => onCount(count - 1)}
      />
      <input
        type="number"
        name="number"
        id="number"
        placeholder="1"
        value={count || ''}
        min={1}
        onChange={(e) => onCount(Number(e.target.value))}
      />
      <Button
        color="green"
        text="+"
        size={2}
        onClickFun={() => onCount(count + 1)}
      />
    </section>
  );
}
//  <Button
//    text={'Add To cart'}
//    size={1}
//    bg="#95C675"
//    color="white"
//    onClickFun={(e) => {
//      e.preventDefault();
//      onInCart({ sample: 'data', id: data.id });
//    }}
//  />;
export default Counter;
