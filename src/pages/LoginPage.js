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

export default function LoginPage() {
    const [userType, setUserType] = useState("customer")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [captchaVerified, setCaptchaVerified] = useState(false)
    const theme = useSelector((state) => state.theme.theme);
    const recaptchaRef = useRef(null);
    const navigate = useNavigate();

    const handleCaptchaChange = (token) => {
        setCaptchaVerified(true);
        toast.success("CAPTCHA verified successfully!");
    };
    const handleCaptchaExpired = () => {
        setCaptchaVerified(false);
        recaptchaRef.current.reset();
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

        const response = await fetch('http://localhost:8080/api/auth/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": email,
                "password": password,
            }),
        });

        const data = await response.json();

        setIsLoading(false);
        setEmail("");
        setPassword("");
        setCaptchaVerified(false);
        if (recaptchaRef.current) {
            recaptchaRef.current.reset();
        }

        if (response.status === 200) {
            toast.success("Login successful!");
            console.log(data.token);
            navigate("/");
        }
        else {
            toast.error(data.message || "Login failed. Please try again.");
        }

    }

    return (
        <div className=" container flex items-center justify-center">
            <div className="mx-auto w-full max-w-md space-y-2">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">Welcome back</h1>
                    <p className="text-muted-foreground">Enter your credentials to sign in to your account</p>
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
                        <AuthForm
                            userType="customer"
                            email={email}
                            setEmail={setEmail}
                            password={password}
                            setPassword={setPassword}
                            isLoading={isLoading}
                            handleSubmit={handleSubmit}
                            theme={theme}
                            recaptchaRef={recaptchaRef}
                            handleCaptchaChange={handleCaptchaChange}
                            handleCaptchaExpired={handleCaptchaExpired}
                        />
                    </TabPanel>

                    <TabPanel value="seller">
                        <AuthForm
                            userType="seller"
                            email={email}
                            setEmail={setEmail}
                            password={password}
                            setPassword={setPassword}
                            isLoading={isLoading}
                            handleSubmit={handleSubmit}
                            theme={theme}
                            recaptchaRef={recaptchaRef}
                            handleCaptchaChange={handleCaptchaChange}
                            handleCaptchaExpired={handleCaptchaExpired}
                        />
                    </TabPanel>
                </TabContext>

                <div className="text-center text-sm">
                    Don't have an account?{" "}
                    <Link to="/auth/register" className="font-medium underline">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    )
}

function AuthForm({
    userType,
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    handleSubmit,
    theme,
    recaptchaRef,
    handleCaptchaChange,
    handleCaptchaExpired,
}) {
    const siteKey = process.env.REACT_APP_RECAPTCHA_SITE_KEY;

    return (
        <form onSubmit={handleSubmit}>
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
                <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                    <Button variant="text" size="small" sx={theme === 'dark' ? { color: 'white' } : {}}>Forgot password?</Button>
                </Box>
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
                {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
        </form>
    );
}