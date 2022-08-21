import './button.styles.scss';
/* we have three kinds of button:
default

inverted

google sign in
*/

const BUTTON_TYPW_CLASSES = {
    google: 'google-sign-in',
    inverted: 'inverted',
}

const Button = ({ children, buttonType, ...otherProps}) => {
    return(
        <button 
        className={`button-container ${BUTTON_TYPW_CLASSES[buttonType]}`} 
        {...otherProps}
        >
         {children}
        </button>
    );
};
export default Button;
