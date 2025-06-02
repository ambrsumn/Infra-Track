import React, { ChangeEvent, useState } from 'react'
import { TextField } from '@mui/material'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import axios from 'axios';
import ApiMiddleware from '../middleware/ApiMiddleware';
import { Loader } from '@react-three/drei';
import LoaderSpinner from './UiComponents/LoaderSpinner';
import SnackBar from './UiComponents/SnackBar';

function RegisterPage({ getSelectedTab }: { getSelectedTab: (tab: string) => void }) {

    const [password, setPassword] = useState('');
    const [securityKey, setSecurityKey] = useState('');
    const [showPassword, setShowPassword] = useState(true);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [designation, setDesignation] = useState<string | null>('');
    const [company, setCompany] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
    const [loader, setLoader] = useState(false);
    const [snackBar, setSnackBar] = useState(true);
    const [snackBarMessage, setSnackBarMessage] = useState<string>('');

    const designationList: string[] = ['Engineer', 'Product Manager', 'Purchaser', 'Store Incharge', 'Director'];

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            setImageFile(file);

            setImagePreviewUrl(URL.createObjectURL(file));
            // reader.readAsDataURL(file);
        } else {
            setImageFile(null);
            setImagePreviewUrl(null);
        }
    };




    const seePassword = () => {
        //console.log("clicked");
        let ele: any = document.getElementById('password');
        if (ele) {
            //console.log(ele.type);
            ele.type = ele.type === 'password' ? 'text' : 'password';
            setShowPassword(!showPassword);
        }
    }

    const register = async () => {

        setLoader(true);


        let registrationData = new FormData();
        registrationData.append('firstName', firstName);
        registrationData.append('lastName', lastName);
        registrationData.append('email', email);
        registrationData.append('phone', phone);
        registrationData.append('roleName', designation || '');
        registrationData.append('companyName', company);
        registrationData.append('accountPassword', password);
        registrationData.append('securityCode', securityKey);
        registrationData.append('profileImage', imageFile || '');

        console.log("FormData : ", registrationData);

        try {
            const res: any = await ApiMiddleware.post('/auth/register', registrationData);
            console.log("Response : ", res);
            setSnackBarMessage(res.data.message);
            setSnackBar(true);


            setTimeout(() => {
                getSelectedTab('Login');
            }, 5000);

        }
        catch (error: any) {
            console.log("Error : ", error);
            setSnackBarMessage(error.data.message);
            setSnackBar(true);
        }
        finally {
            setLoader(false);
        }
    }


    return (
        <>
            {
                !loader &&
                <div className=' w-[60%] h-[85%] mx-auto mt-24 px-6 py-4 rounded-3xl shadow-md bg-[#212529] text-white'>
                    <p className=' text-2xl mb-12 italic text-blue-500'>New User? Create Free Account</p>

                    <div className=' flex flex-row justify-between'>
                        <TextField className=' w-[45%]' sx={{
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
                            id="fname"
                            label='First Name'
                            variant="outlined"
                            onChange={(e) => { setFirstName(e.target.value) }} />
                        <TextField className=' w-[45%]' sx={{
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
                            id="lname" label='Last Name' variant="outlined" onChange={(e) => { setLastName(e.target.value) }} />

                    </div>
                    <div className=' flex flex-row justify-between mt-12'>
                        <TextField className=' w-[45%]' sx={{
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
                            id="mobile"
                            label='Mobile Number'
                            variant="outlined"
                            onChange={(e) => { setPhone(e.target.value) }} />
                        <TextField className=' w-[45%]' sx={{
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
                            id="email" label='Email ID' variant="outlined" onChange={(e) => { setEmail(e.target.value) }} />

                    </div>

                    <div className='mt-12 flex flex-row justify-between'>
                        <Autocomplete className=' w-[45%]' sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'white',
                                    borderRadius: '20px',
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: 'white',
                                fontSize: '1.5rem',

                            },
                            '& .MuiOutlinedInput-input': {
                                color: 'white',
                                fontSize: '1.5rem'
                            }
                        }}
                            disablePortal
                            options={designationList}
                            onChange={(event, value) => setDesignation(value)}
                            renderInput={(params) => <TextField {...params} label="Designation" />}
                        />

                        <TextField className=' w-[45%]' sx={{
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
                            id="companyName"
                            label='Company Name'
                            variant="outlined"
                            onChange={(e) => { setCompany(e.target.value) }} />
                    </div>
                    <div className=' mt-12 flex flex-row justify-between'>
                        <div className=' flex flex-row gap-x-4 w-[45%]'>
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
                                id="password" label='Password' type='password' variant="outlined" onChange={(e) => { setPassword(e.target.value) }} />
                            {showPassword &&
                                <button><FontAwesomeIcon icon={faEye} onClick={() => { seePassword() }} /> </button>}

                            {!showPassword &&
                                <button><FontAwesomeIcon icon={faEyeSlash} onClick={() => { seePassword() }} /> </button>}
                        </div>

                        <div className=' flex flex-col gap-y-1 w-[45%]'>
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
                                id="securityKey" label='Security Code' type='text' variant="outlined" onChange={(e) => { setSecurityKey(e.target.value) }} />
                            {
                                securityKey?.trim() !== '' && <p className=' text-red-500 text-left pl-2'>Do not your security code with anyone</p>
                            }
                        </div>

                    </div>

                    <div className="flex flex-col items-center gap-6 mt-16">
                        <div className="relative">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                                id="profile-image-upload"
                            />
                            <label
                                htmlFor="profile-image-upload"
                                className={`cursor-pointer flex items-center justify-center w-48 h-48 rounded-lg border-2 border-dashed border-white transition-all duration-300 ${!imagePreviewUrl ? 'hover:bg-gray-700' : ''}`}
                            >
                                {!imagePreviewUrl ? (
                                    <div className="text-center text-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                        </svg>
                                        <p>Click to upload profile photo</p>
                                    </div>
                                ) : (
                                    <img
                                        src={imagePreviewUrl}
                                        alt="Preview"
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                )}
                            </label>
                        </div>
                    </div>

                    <div className=' mt-12 flex flex-row justify-center'>
                        <Button sx={{ fontSize: '1.3rem', borderRadius: '10px' }} onClick={() => { register() }} variant="contained">Register</Button>
                    </div>

                </div>
            }

            {
                loader &&
                <LoaderSpinner />
            }
            {snackBar &&
                <SnackBar message={snackBarMessage} />}
        </>
    )
}

export default RegisterPage
