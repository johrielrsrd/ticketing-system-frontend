type CounterButtonProps = {
  count: number;
  onIncrement: () => void;
};

export function CounterButton({ count, onIncrement }: CounterButtonProps) {
  return <button onClick={onIncrement}>count is {count}</button>;
}

export default CounterButton;
