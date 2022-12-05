import HomeIcon from '@mui/icons-material/HomeOutlined';
import PersonIcon from '@mui/icons-material/PersonOutline';
import PeopleIcon from '@mui/icons-material/Groups';
import { IconButton } from '@mui/material';
import { useHistory } from 'react-router-dom';

const Navbar = () => {
    const history = useHistory();
    
    function directToHome() {
        history.push('/');
    }

    function directToAllList() {
        history.push('/allList/');
    }

    return (
        <div id='navbar'>
            <IconButton onClick={directToHome}>
                <HomeIcon fontSize='large'/>
            </IconButton >
            <IconButton onClick={directToAllList}>
                <PeopleIcon fontSize='large'/>
            </IconButton>
            <IconButton>
                <PersonIcon fontSize='large'/>
            </IconButton>
        </div>
    );
};

export default Navbar;
