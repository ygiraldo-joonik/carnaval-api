import logo from '../../assets/logo.jpg'
export default function ApplicationLogo(props) {
    return (
        <img src={logo} alt="Logo" {...props} />
    );
}
