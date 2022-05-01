import React, {useState} from 'react'
import { useDispatch, connect } from 'react-redux'

const LoginPage = () => {
    const router = useRouter()
    const [user, setUser] = useState({userid : '', password : ''})
    const dispatch = useDispatch()
    const onChange = e => {
        e.preventDefault()
        const {name, value} = e.target;
        setUser({...user, [name]: value})
    }
    const onSubmit = e => {
        e.preventDefault()
        alert('>>')
        dispatch(loginRequest(user))
        router.push('/user/profile')
    }
    return(<Login onChange={onChange} onSubmit = {onSubmit}/>)
}
const mapStateToProps = state => ({})
const loginActions = { loginRequst, logoutRequset}
export default connect(mapStateToProps, loginActions)(LoginPage)