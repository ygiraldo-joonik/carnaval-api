import logo from '../../assets/logo.png'
export default function ApplicationLogo(props) {
    return (
        <img src={logo} alt="Logo" {...props} />
    );
}
