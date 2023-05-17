import { EulerMaterials } from "@eulerxyz/euler-materials/context"
import { styled } from "@eulerxyz/euler-materials/theme"

import "@eulerxyz/euler-materials/dist/css/font.css"

const Header = styled("p")(({ theme }) => ({
  color: "#D4DBDD",
  fontSize: theme.typography.xs.fontSize,
  lineHeight: "40px",
  marginTop: theme.spacing(4),
  textAlign: "center",
}))

export default function App() {
  return (
    <EulerMaterials.Provider>
      <Header>Fleek test</Header>
    </EulerMaterials.Provider>
  )
}
