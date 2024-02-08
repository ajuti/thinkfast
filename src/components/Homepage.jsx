import { Button, Paper, Container } from "@mui/material"
import { Link } from "react-router-dom"

const Homepage = (props) => {
  return (
    <Container sx={{
      height: "900px",
      backgroundColor: "#99c1f1",
      display: "flex",
      justifyContent: "center",
      position: "relative",
    }}>
      <Paper elevation={3} sx={{ 
          backgroundColor: "#7b718e",
          justifyContent: "center",
          display: "flex",
          height: "fit-content",
          width: "fit-content",
          padding: "25px",
          position: "absolute",
          alignSelf: "center"
        }}>
        <Link to={"/play"}><Button sx={{ width: 150}} variant="contained">Start Game</Button></Link>
      </Paper>
    </Container>
  )
}

export default Homepage