import { Register } from '@/components'
import { registerRequest } from '@/modules/auth/register'
import React, {useState} from 'react'
import { useDispatch, connect } from 'react-redux'

const RegisterPage = () =>{
    const [user, setUser] = useState({
        userid: '',
        password: '',
        email: '',
        name: '',
        phone: '',
        birth: '',
        address: '' 
    })
    const dispatch = useDispatch()
    const onChange = e => {
        e.preventDefault()
        const {name, value} = e.target;
        setUser({...user, [name] :value})
    }
    const onSubmit = e => {
        e.preventDefault()
        alert('>>')
        dispatch(registerRequest(user))
    }
    return(<Register onChange={onChange} onSubmit = {onSubmit}/>)
}
const mapStateToProps = state => ({})
const registerActions = { registerRequest }
export default connect(mapStateToProps, registerActions)(RegisterPage)