import React, { ChangeEvent, useState } from 'react'
import { TextField } from '@mui/material'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@mui/material/Button';

function LoginPage() {

    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(true);
    const [email, setEmail] = useState('');


    const seePassword = () => {
        //console.log("clicked");
        let ele: any = document.getElementById('password');
        if (ele) {
            //console.log(ele.type);
            ele.type = ele.type === 'password' ? 'text' : 'password';

            setShowPassword(!showPassword);

        }
    }

    const login = () => {
        //console.log("clicked");
    }


    return (
        <div className=' w-[60%] h-[50%] mx-auto mt-24 px-6 py-4 my-auto rounded-3xl shadow-md bg-[#212529] text-white'>
            <p className=' text-2xl mb-12 italic text-blue-500'>Login To Your Account</p>


            <div className=' flex flex-row justify-center mt-12'>
                <TextField className=' w-[60%]' sx={{
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'white',
                            borderRadius: '20px',
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: 'white',
                        fontSize: '1.5rem'
                    },
                    '& .MuiOutlinedInput-input': {
                        color: 'white',
                        fontSize: '1.5rem'
                    }
                }}
                    id="email" label='Email ID' variant="outlined" />

            </div>
            <div className=' mt-12 flex flex-row justify-center'>
                <div className=' flex flex-row gap-x-4 w-[60%]'>
                    <TextField className=' w-full' sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'white',
                                borderRadius: '20px',
                            },
                        },
                        '& .MuiInputLabel-root': {
                            color: 'white',
                            fontSize: '1.5rem'
                        },
                        '& .MuiOutlinedInput-input': {
                            color: 'white',
                            fontSize: '1.5rem'
                        }
                    }}
                        id="password" label='Password' type='password' variant="outlined" />
                    {showPassword &&
                        <button><FontAwesomeIcon icon={faEye} onClick={() => { seePassword() }} /> </button>}

                    {!showPassword &&
                        <button><FontAwesomeIcon icon={faEyeSlash} onClick={() => { seePassword() }} /> </button>}
                </div>

            </div>
            <p className=' text-lg mt-8'>Forgot Password? <a className=' text-blue-500'>Click Here</a> </p>

            <div className=' mt-12 flex flex-row justify-center'>
                <Button sx={{ fontSize: '1.3rem', borderRadius: '10px' }} onClick={() => { login() }} variant="contained">Login</Button>
            </div>
        </div>
    )
}

export default LoginPage
