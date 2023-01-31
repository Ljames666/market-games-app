import { styled } from '@mui/material/styles';

const StyledFooter = styled('div')(() => ({
    width: '100vw',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    bottom: 0,
    height: '10vh',
}));

function Footer() {
    return (
        <StyledFooter>
            <div>
                <small> Copyright &copy;2023 TechHelper James SA.</small>
            </div>
        </StyledFooter>
    );
}
export default Footer;
