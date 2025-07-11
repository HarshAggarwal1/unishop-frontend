import React, { useState, useRef } from 'react'
import { toast } from 'react-toastify';
import { Tab, Box, TextField, Button } from '@mui/material';
import { TabContext, TabPanel, TabList } from '@mui/lab';
import ReCAPTCHA from 'react-google-recaptcha';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const darkTheme = {
    "& .MuiInputLabel-root": {
        color: "#ffffff",
    },
    "& .MuiInputLabel-root.Mui-focused": {
        color: "#ffffff",
    },
    "& .MuiOutlinedInput-input": {
        color: "#d1d5db",
    },
    "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#d1d5db",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "#ffffff",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#ffffff",
    },
}


export default function RegisterPage() {
    const [userType, setUserType] = useState("customer")
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [captchaVerified, setCaptchaVerified] = useState(false)
    const [gstNumber, setGstNumber] = useState("")
    const theme = useSelector((state) => state.theme.theme);
    const recaptchaRef = useRef(null);
    const navigate = useNavigate();

    const handleCaptchaChange = (token) => {
        setCaptchaVerified(true);
        toast.success("CAPTCHA verified successfully!");
    };
    const handleCaptchaExpired = () => {
        setCaptchaVerified(false);
        toast.error("CAPTCHA expired, please verify again.");
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!captchaVerified) {
            toast({
                title: "CAPTCHA verification required",
                description: "Please verify that you are not a robot",
                variant: "destructive",
            });
            return;
        }
        setIsLoading(true);

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            setIsLoading(false);
            return;
        }

        const response = await fetch('http://localhost:8080/api/auth/register', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "name": name,
                "phone": phone,
                "username": email,
                "password": password,
                "address": address,
            }),
        });

        const data = await response.json();

        setIsLoading(false);
        setName("");
        setPhone("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setAddress("");
        if (recaptchaRef.current) {
            recaptchaRef.current.reset();
        }
        setCaptchaVerified(false);

        if (response.status === 201) {
            toast.success("Registration successful!");
            navigate("/auth/login");
        }
        else {
            toast.error(data.message || "Registeration failed. Please try again.");
        }
    }

    return (
        <div className=" container flex items-center justify-center">
            <div className="mx-auto w-full max-w-md space-y-2">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">Welcome Aboard!</h1>
                    <p className="text-muted-foreground">Enter your details to register your account</p>
                </div>

                <TabContext value={userType}>
                    <Box sx={{ border: 1, borderColor: `${theme === 'dark' ? '#757575' : 'divider'}`, backgroundColor: `${theme === 'dark' ? '#757575' : 'divider'}`, padding: 0.5, borderRadius: 1 }}>
                        <TabList
                            onChange={(e, newValue) => setUserType(newValue)}
                            aria-label="auth tabs"
                            variant="fullWidth"
                            slotProps={{
                                indicator: {
                                    style: { display: 'none' },
                                },
                            }}
                            sx={{
                                minHeight: '2rem',
                                height: '2rem',
                            }}
                        >
                            <Tab
                                label="Customer"
                                value="customer"
                                sx={{
                                    padding: 0,
                                    minHeight: '2rem',
                                    height: '2rem',
                                    width: '7.5rem',
                                    borderRadius: 1,
                                    backgroundColor: userType === "customer" ? "white" : "transparent",
                                    color: userType === "customer" ? "black" : "text.secondary",
                                    fontWeight: userType === "customer" ? "bold" : "normal",
                                    textTransform: 'none',
                                }}
                            />
                            <Tab
                                label="Seller"
                                value="seller"
                                disabled={true}
                                sx={{
                                    padding: 0,
                                    minHeight: '2rem',
                                    height: '2rem',
                                    width: '7.5rem',
                                    borderRadius: 1,
                                    backgroundColor: userType === "seller" ? "white" : "transparent",
                                    color: userType === "seller" ? "black" : "text.secondary",
                                    fontWeight: userType === "seller" ? "bold" : "normal",
                                    textTransform: 'none',
                                }}
                            />
                        </TabList>
                    </Box>

                    <TabPanel value="customer">
                        <RegisterFormCustomer
                            userType="customer"
                            email={email}
                            setEmail={setEmail}
                            password={password}
                            setPassword={setPassword}
                            isLoading={isLoading}
                            handleSubmit={handleSubmit}
                            name={name}
                            setName={setName}
                            phone={phone}
                            setPhone={setPhone}
                            address={address}
                            setAddress={setAddress}
                            confirmPassword={confirmPassword}
                            setConfirmPassword={setConfirmPassword}
                            recaptchaRef={recaptchaRef}
                            handleCaptchaChange={handleCaptchaChange}
                            handleCaptchaExpired={handleCaptchaExpired}
                            theme={theme}
                        />
                    </TabPanel>

                    <TabPanel value="seller">
                        <RegisterFormSeller
                            userType="customer"
                            email={email}
                            setEmail={setEmail}
                            password={password}
                            setPassword={setPassword}
                            isLoading={isLoading}
                            handleSubmit={handleSubmit}
                            name={name}
                            setName={setName}
                            phone={phone}
                            setPhone={setPhone}
                            address={address}
                            setAddress={setAddress}
                            confirmPassword={confirmPassword}
                            setConfirmPassword={setConfirmPassword}
                            gstNumber={gstNumber}
                            setGstNumber={setGstNumber}
                            recaptchaRef={recaptchaRef}
                            handleCaptchaChange={handleCaptchaChange}
                            handleCaptchaExpired={handleCaptchaExpired}
                            theme={theme}
                        />
                    </TabPanel>
                </TabContext>

                <div className="text-center text-sm">
                    Already a user?{" "}
                    <Link to="/auth/login" className="font-medium underline">
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    )
}

function RegisterFormCustomer({
    userType,
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    handleSubmit,
    name,
    setName,
    phone,
    setPhone,
    address,
    setAddress,
    confirmPassword,
    setConfirmPassword,
    recaptchaRef,
    handleCaptchaChange,
    handleCaptchaExpired,
    theme,
}) {
    const siteKey = process.env.REACT_APP_RECAPTCHA_SITE_KEY;

    return (
        <form onSubmit={handleSubmit}>
            <Box sx={{ my: 2 }}>
                <TextField
                    fullWidth
                    required
                    label="Name"
                    id={`${userType}-name`}
                    placeholder={`Enter your full name`}
                    type="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={theme === 'dark' ? darkTheme : {}}
                />
            </Box>
            <Box sx={{ my: 2 }}>
                <TextField
                    fullWidth
                    required
                    label="Phone Number"
                    id={`${userType}-phone`}
                    placeholder={`Enter your contact number`}
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    slotProps={{
                        input: {
                            inputMode: 'tel',
                            pattern: '[0-9]*',
                        },
                    }}
                    sx={theme === 'dark' ? darkTheme : {}}
                />
            </Box>
            <Box sx={{ my: 2 }}>
                <TextField
                    fullWidth
                    required
                    label="Email"
                    id={`${userType}-email`}
                    placeholder={`${userType}@example.com`}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={theme === 'dark' ? darkTheme : {}}
                />
            </Box>
            <Box sx={{ my: 2 }}>
                <TextField
                    label="Address"
                    id={`${userType}-address`}
                    placeholder={`123 Main St, City, Country`}
                    type='text'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows={4}
                    variant="outlined"
                    fullWidth
                    sx={theme === 'dark' ? darkTheme : {}}
                />
            </Box>

            <Box sx={{ my: 2, display: 'flex', gap: 2 }}>
                <TextField
                    fullWidth
                    required
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    id={`${userType}-password`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={theme === 'dark' ? darkTheme : {}}
                />
                <TextField
                    fullWidth
                    required
                    label="Confirm Password"
                    placeholder="Enter again"
                    type="password"
                    id={`${userType}-confirm-password`}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    sx={theme === 'dark' ? darkTheme : {}}
                />
            </Box>

            <Box sx={{ my: 2 }}>
                <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={siteKey}
                    onChange={handleCaptchaChange}
                    onExpired={handleCaptchaExpired}
                    theme={`${theme === 'dark' ? 'dark' : 'light'}`}
                />
            </Box>

            <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={isLoading}
                sx={{
                    textTransform: 'none',
                    backgroundColor: 'primary.main',
                    '&:hover': {
                        backgroundColor: 'primary.dark',
                    },
                    padding: '0.5rem 1rem',
                }}
            >
                {isLoading ? 'Signing up...' : 'Register'}
            </Button>
        </form>
    );
}

function RegisterFormSeller({
    userType,
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    handleSubmit,
    name,
    setName,
    phone,
    setPhone,
    address,
    setAddress,
    confirmPassword,
    setConfirmPassword,
    gstNumber,
    setGstNumber,
    recaptchaRef,
    handleCaptchaChange,
    handleCaptchaExpired,
    theme,

}) {
    const siteKey = process.env.REACT_APP_RECAPTCHA_SITE_KEY;
    return (
        <form onSubmit={handleSubmit}>
            <Box sx={{ my: 2 }}>
                <TextField
                    fullWidth
                    required
                    label="Business Name"
                    id={`${userType}-bname`}
                    placeholder={`Enter your business name`}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={theme === 'dark' ? darkTheme : {}}
                />
            </Box>
            <Box sx={{ my: 2 }}>
                <TextField
                    fullWidth
                    required
                    label="Phone Number"
                    id={`${userType}-phone`}
                    placeholder={`Enter your contact number`}
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    slotProps={{
                        input: {
                            inputMode: 'tel',
                            pattern: '[0-9]*',
                        },
                    }}
                    sx={theme === 'dark' ? darkTheme : {}}
                />
            </Box>
            <Box sx={{ my: 2 }}>
                <TextField
                    fullWidth
                    required
                    label="Email"
                    id={`${userType}-email`}
                    placeholder={`${userType}@example.com`}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={theme === 'dark' ? darkTheme : {}}
                />
            </Box>
            <Box sx={{ my: 2 }}>
                <TextField
                    required
                    label="Business Address"
                    id={`${userType}-address`}
                    placeholder={`123 Main St, City, Country`}
                    type='text'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows={4}
                    variant="outlined"
                    fullWidth
                    sx={theme === 'dark' ? darkTheme : {}}
                />
            </Box>
            <Box sx={{ my: 2 }}>
                <TextField
                    fullWidth
                    required
                    label="GST Number"
                    id={`${userType}-gst`}
                    placeholder={`Enter your GST number`}
                    type="text"
                    value={gstNumber}
                    onChange={(e) => setGstNumber(e.target.value)}
                    sx={theme === 'dark' ? darkTheme : {}}
                />
            </Box>

            <Box sx={{ my: 2, display: 'flex', gap: 2 }}>
                <TextField
                    fullWidth
                    required
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    id={`${userType}-password`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={theme === 'dark' ? darkTheme : {}}
                />
                <TextField
                    fullWidth
                    required
                    label="Confirm Password"
                    placeholder="Enter again"
                    type="password"
                    id={`${userType}-confirm-password`}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    sx={theme === 'dark' ? darkTheme : {}}
                />
            </Box>


            <Box sx={{ my: 2 }}>
                <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={siteKey}
                    onChange={handleCaptchaChange}
                    onExpired={handleCaptchaExpired}
                    theme={`${theme === 'dark' ? 'dark' : 'light'}`}
                />
            </Box>

            <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={isLoading}
                sx={{
                    textTransform: 'none',
                    backgroundColor: 'primary.main',
                    '&:hover': {
                        backgroundColor: 'primary.dark',
                    },
                    padding: '0.5rem 1rem',
                }}
            >
                {isLoading ? 'Signing up...' : 'Register'}
            </Button>
        </form>
    );
}