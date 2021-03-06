import React, {useState, useEffect, useRef} from 'react'
import { useDispatch, connect } from 'react-redux'
//import { logoutRequest } from '@/modules/auth/login'

import { createSvgIcon } from '@mui/material/utils'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ref } from 'yup';
import { Subtitles } from '@mui/icons-material';
const HomeIcon = createSvgIcon(
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>, 'Home'
)

const basicSettings = {
    subTitles: [
        '멤버관리'
    ], urls: ['/employee/list']
}

export function Nav(){
    const outside = useRef(null)
    const [loginCheck, setLoginCheck] = useState(false)
    const dispatch = useDispatch()
    const [userUrls, setUserUrls] = useState({subTitles: [], urls: []})
    const [anchorElNav, setAnchorElNav] = useState(null)
    const [anchorElUser, setAnchorElUser] = useState(null)
    const [imageInfos, setImageInfos] = useState({
        imageUrl: 'https://as2.ftcdn.net/v2/jpg/01/85/61/65/1000_F_185616556_uCc1J5d5GNfRH6ErgP1G' +
                '8x8ORLeG25en.jpg',
        imageTitle: 'sign'
    });
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseNavMenu = (event) => {
    };
    const handleCloseUserMenu = (event) => {
        /**if (outside.current && ! outside.current.click(event)){
            setUserUrls(['/'])
        }*/
    };
    const handleLogout = () => {
        dispatch(logoutRequest());
    }

    useEffect(() => {
        const loginUser = localStorage.getItem("loginUser")
        if(loginUser) setLoginCheck(false)
        if(loginUser !== null) {
            setUserUrls ({ 
                subTitles: [
                    '회원가입', '로그인'
                ], urls: ['/auth/register', '/auth/login']
            })
            setImageInfos({
                imageUrl: 'https://as2.ftcdn.net/v2/jpg/01/85/61/65/1000_F_185616556_uCc1J5d5GNfRH6ErgP1G' +
                '8x8ORLeG25en.jpg',
                imageTitle: 'sign'
            })
        } else if(loginUser === null) {
            setUserUrls({
                subTitles: [
                    '프로필', '정보수정', '회원탈퇴', '로그아웃'
                ], urls: ['/user/profile', '/auth/modifyUser', '/auth/delUser', '/auth/logout']
            })
            setImageInfos({
                imageUrl: 'https://www.w3schools.com/howto/img_avatar.png', imageTitle: 'users'
            })
        } 
    } ,[])
        
    return (
        <AppBar position="static" style={{marginBottom: "20px"}}>
        <Container maxWidth="xl">
            <Toolbar disableGutters="disableGutters">
                <Typography variant="h6" noWrap="noWrap" component="div"
                sx = {{mr: 2, display: {xs: 'none', md: 'flex'}}}>

                <Box sx = {{'& > :not(style)' : {m:2}}}>
                <a href= '/'><HomeIcon color = "primary"
                sx= {{my: 0, color: 'white', display: 'block'}}/>
                </a>
                </Box>
                </Typography>

                <Box sx ={{flewGlow: 1, color: 'white', 
                display : {xs: 'none', md: 'flex'}}}>

                    {basicSettings.urls.map((urls, i) => (
                        <a href={urls} key={i} style={{textDecoration: 'none'}}>
                            <Button key = {i} onClick = {handleCloseNavMenu}
                            sx = {{my: 2, color: 'white', display: 'block'}}>
                                {basicSettings.subTitles[i]}
                            </Button>
                        </a>
                    ))}
                </Box>
                <Box sx = {{flexGrow: 0}}  ref = {outside} onClick = {handleCloseUserMenu}>
                    <Tooltip title = {imageInfos.imageTitle}>
                        <IconButton onClick={handleOpenUserMenu}
                        sx = {{p: 0}}>
                            <Avatar alt = "Remy Sharp" src = {imageInfos.imageUrl}/>
                        </IconButton>
                    
                    </Tooltip>
                    <Menu
                    sx={{mt: '45px'}} id="menu-appbar" anchorEl={anchorElUser}
                    anchorOrigin={{ vertical: 'top',horizontal: 'right' }}
                    keepMounted="keepMounted" transformOrigin={{vertical: 'top',horizontal: 'right'}}
                    open={Boolean(anchorElUser)}>
                    {userUrls.urls.map((urls, i) => (
                        <MenuItem key={i}>
                            <a href={'urls'}>
                                <Typography textAlign="center" >{userUrls.subTitles[i]}</Typography>
                            </a>
                        </MenuItem>))}
                    </Menu>
                </Box>
                {loginCheck &&< Box >
                <Button onClick = {handleLogout}
                sx = {{ color : 'white', display : 'block'}}>로그아웃
                </Button>
                </Box>}
            </Toolbar>
        </Container>
        </AppBar>
        
    )
}