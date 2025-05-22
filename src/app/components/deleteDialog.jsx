export default function DeleteDialog({ ref, func }) {
  function handleTrue() {
    func();
    ref.current.close();
  }
  return (
    <dialog ref={ref}>
      Are you sure?
      <button onClick={() => handleTrue()}>Yes</button>
      <button onClick={() => ref.current.close()}>Go Back</button>
    </dialog>
  );
}
