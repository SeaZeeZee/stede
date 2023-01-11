const methodClasses = {
  get: 'bg-green-600 text-white',
  post: 'bg-sky-600 text-white',
  put: 'bg-orange-500 text-white',
  delete: 'bg-red-600 text-white',
}

const Method = (props) => {
  let method = false
  for (const m in methodClasses) {
    if (!method && props[m]) method = m.toUpperCase()
  }

  return (
    <div
      className={`my-1 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 rounded-full ${
        methodClasses[method.toLowerCase()]
      }`}
    >
      {method}
    </div>
  )
}

export default Method
