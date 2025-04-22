import React, { useState, useRef } from 'react'
import { toast } from 'react-toastify';
import { Tab, Box, TextField, Button } from '@mui/material';
import { TabContext, TabPanel, TabList } from '@mui/lab';
import ReCAPTCHA from 'react-google-recaptcha';
import { Link } from 'react-router-dom';


export default function LoginPageLight() {
    const [userType, setUserType] = useState("customer")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [captchaVerified, setCaptchaVerified] = useState(false)

    const handleSubmit = (event) => {
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
    }

    return (
        <div className=" container flex items-center justify-center">
            <div className="mx-auto w-full max-w-md space-y-6">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">Welcome back</h1>
                    <p className="text-muted-foreground">Enter your credentials to sign in to your account</p>
                </div>

                <TabContext value={userType}>
                    <Box sx={{ border: 1, borderColor: 'divider', backgroundColor: 'divider', padding: 0.5, borderRadius: 1 }}>
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
                            captchaVerified={captchaVerified}
                            setCaptchaVerified={setCaptchaVerified}
                            isLoading={isLoading}
                            handleSubmit={handleSubmit}
                        />
                    </TabPanel>

                    <TabPanel value="seller">
                        <AuthForm
                            userType="seller"
                            email={email}
                            setEmail={setEmail}
                            password={password}
                            setPassword={setPassword}
                            captchaVerified={captchaVerified}
                            setCaptchaVerified={setCaptchaVerified}
                            isLoading={isLoading}
                            handleSubmit={handleSubmit}
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
    captchaVerified,
    setCaptchaVerified,
    isLoading,
    handleSubmit,
}) {
    const recaptchaRef = useRef(null);
    const handleCaptchaChange = (token) => {
        setCaptchaVerified(true);
        console.log("CAPTCHA token:", token);
        toast.success("CAPTCHA verified successfully!");
    };
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
                />
                <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                    <Button variant="text" size="small">Forgot password?</Button>
                </Box>
            </Box>

            <Box sx={{ my: 2 }}>
                <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={siteKey}
                    onChange={handleCaptchaChange}
                />
            </Box>

            <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={isLoading}
            >
                {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
        </form>
    );
}