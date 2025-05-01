export default function Input({ type = "text", name, placeholder = "" }) {

  return (
    <>
      <input
        className="input-field"
        type={type}
        name={name}
        placeholder={placeholder} />
    </>
  )
}