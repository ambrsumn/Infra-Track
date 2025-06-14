import React, { ChangeEvent, useEffect, useState } from 'react'
import { TextField } from '@mui/material'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import { useUserContext } from '../Context/UserContext';
import ApiMiddleware from '../middleware/ApiMiddleware';
import LoaderSpinner from './UiComponents/LoaderSpinner';

function ProfilePage() {

    const [password, setPassword] = useState('');
    const [securityKey, setSecurityKey] = useState('');
    const [showPassword, setShowPassword] = useState(true);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [designation, setDesignation] = useState('');
    const [company, setCompany] = useState(''); const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

    const designationList: string[] = ['Engineer', 'Product Manager', 'Purchaser', 'Store Incharge', 'Director'];
    const [loading, setLoading] = useState(true);

    // const user = JSON.parse(localStorage.getItem('userDetails') || '{}');
    const { user } = useUserContext();

    useEffect(() => {
        // console.log(user);
        if (user) {
            console.log(user.roleName);
            // console.log(user);
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setEmail(user.email);
            setPhone(user.phone);
            setDesignation(user.roleName);
            setCompany(user.companyName);
            setPassword(user.password);
            setSecurityKey(user.securityKey);

            if (user.profileImage) {
                // Assume it's a base64 string without data URI prefix
                setImagePreviewUrl(`data:image/jpeg;base64,${user.profileImage}`);
            }

            setLoading(false);
        }
    }, [user])

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            setImageFile(file);
            setImagePreviewUrl(URL.createObjectURL(file));
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

    const updateProfile = async () => {
        setLoading(true);


        console.log(firstName, lastName, email, phone, designation, company, imageFile);

        let formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('roleName', designation);
        formData.append('company', company);
        if (imageFile !== null) formData.append('profileImage', imageFile);


        await ApiMiddleware.put(`/auth/update-profile`, formData).then((res: any) => {
            console.log(res.data);
            alert("Profile Updated Successfully");

        }).catch((err: any) => {
            console.log(err);
        }).finally(() => {
            setLoading(false);
        })
    }


    return (
        <>
            {loading && <LoaderSpinner />}
            {!loading &&
                <div className=' w-[60%] h-[70%] mx-auto mt-24 px-6 py-4 rounded-3xl shadow-md bg-[#212529] text-white'>
                    <p className=' text-2xl mb-12 italic text-blue-500'>Hello {firstName}</p>

                    <div className=' flex flex-row justify-between'>
                        <TextField className=' w-[45%]' disabled sx={{
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
                            variant="outlined" value={firstName} onChange={(e) => setLastName(e.target.value)} />
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
                            id="lname" label='Last Name' variant="outlined" disabled value={lastName} onChange={(e) => setLastName(e.target.value)} />

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
                            variant="outlined" value={phone} onChange={(e) => setPhone(e.target.value)} />
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
                            id="email" label='Email ID' variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />

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
                            value={designation}
                            onChange={(event, newValue) => setDesignation(newValue || designation)}

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
                            variant="outlined" value={company} disabled onChange={(e) => setCompany(e.target.value)} />
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

                    <div className=' mt-12 flex flex-row justify-end'>
                        <Button sx={{ fontSize: '1.3rem', borderRadius: '10px' }} onClick={() => { updateProfile() }} variant="contained">Update</Button>
                    </div>

                </div>
            }
        </>
    )
}


export default ProfilePage
