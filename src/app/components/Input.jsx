export default function Input({
  type = "text",
  name,
  placeholder = "",
  defaultVal = ""
}) {

  return (
    <>
      <input
        className="input-field"
        type={type}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultVal} />
    </>
  )
}