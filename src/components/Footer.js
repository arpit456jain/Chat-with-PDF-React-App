
import { Container } from "react-bootstrap";
function Footer({summary}){
    console.log("lol",summary.length);
    const style = {
    position : summary.length > 1 ? 'relative' : 'fixed',
    left: '0',
    bottom: '0',
    width: '100%',
    }
    return(
        <>
        <Container className="col-12 text-center text-light footer" style={style}>
            <b>This is made with ❤️ by Arpit Jain <br></br> For Source Code and More Information About this project <a href="https://github.com/arpit456jain/Chat-with-PDF-React-App">click here</a> </b>
        </Container>
        </>
    );
}

export default Footer;