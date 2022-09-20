import Devit from "components/Devit"

export default function DevitPage(props) {
  console.log("received props", props)
  if (!props.createAt) {
    return
  }

  return <Devit {...props} />
}

export async function getServerSideProps(context) {
  const { params, res } = context
  const { id } = params

  const apiResponse = await fetch(`http://localhost:3000/api/devits/${id}`)
  console.log("___apiResponse", apiResponse)
  if (apiResponse.ok) {
    const props = await apiResponse.json()
    return { props }
  }

  if (res) {
    res.writeHead(301, { location: "/home" }).end()
  }
}
