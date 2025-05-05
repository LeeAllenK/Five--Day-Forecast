import { useState, useEffect } from "react";
import { signInWithGooglePopup} from './signinWithGoogle';
import { signUpWithEmail } from './signUpWithEmail';
import { signInWithEmail } from './signInWithEmail';
import App from '../App.jsx';

function SignIn() {
	const [value, setValue] = useState('');
	const [error, setError] = useState(null);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isRegistering, setIsRegistering] = useState(false);

	const clearError = () => {
		setError(null);
	};

	const handleClickPopup = async () => {
		clearError();
		try {
			await signInWithGooglePopup();
			setValue('Signed In');
			localStorage.setItem('email', 'user@example.com');
		} catch(err) {
			setError(err.message);
		}
	};

	const handleSignUp = async () => {
		clearError();
		if(!firstName) {
			setError('First name is required.');
			return;
		}
		if(!lastName) {
			setError('Last name is required.');
			return;
		}
		if(!email) {
			setError('Email is required.');
			return;
		}
		if(!validateEmail(email)) {
			setError('Invalid email format.');
			return;
		}
		if(!password) {
			setError('Password is required.');
			return;
		}
		if(!validatePassword(password)) {
			setError('Password must be at least 6 characters long.');
			return;
		}
		try {
			await signUpWithEmail(email, password, firstName, lastName);
			setValue('Signed Up');
			localStorage.setItem('email', email);
			localStorage.setItem('firstName', firstName);
			localStorage.setItem('lastName', lastName);
		} catch(err) {
			setError('Email already in use');
		}
	};

	const handleSignIn = async () => {
		clearError();
		if(!email) {
			setError('Email is required.');
			return;
		}
		if(!validateEmail(email)) {
			setError('Invalid email format.');
			return;
		}
		if(!password) {
			setError('Password is required.');
			return;
		}
		try {
			await signInWithEmail(email, password);
			setValue('Signed In');
			localStorage.setItem('email', email);
		} catch(err) {
			setError('Incorrect password. Please try again.');
		}
	};

	const validateEmail = (email) => {
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return re.test(email);
	};

	const validatePassword = (password) => {
		return password.length >= 6;
	};

	useEffect(() => {
		setValue(localStorage.getItem('email'));
	}, []);

	return (
		<div className='grid grid-cols-1 items-center place-items-center w-screen h-screen bg-white  font-extrabold'>
			{value ? (
				<App />
			) : (
				<>
					{isRegistering ? (
							<div className="grid grid-rows-5 place-items-center lg:w-80 lg:h-100 md:w-[60%] md:h-[90%] sm:w-70 sm:h-100 h-[60%] w-[70%] border-4 lg:gap-1 md:gap-0 sm:gap-0 gap-0 rounded-xl text-2xl ">
							<input
								className='h-10 w-[90%] border-2 rounded-sm bg-white text-black hover:bg-gray-300'
								type="text"
								placeholder="First Name"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
							/>
							<input
								className='h-10 w-[90%] border-2 rounded-sm bg-white text-black hover:bg-gray-300'
								type="text"
								placeholder="Last Name"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
							/>
							<input
								className='h-10 w-[90%] border-2 rounded-sm bg-white text-black hover:bg-gray-300'
								type="email"
								placeholder="Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<input
								className='h-10 w-[90%] border-2 rounded-sm bg-white text-black hover:bg-gray-300'
								type="password"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
								<button className="border-1 rounded-md w-[90%] h-9 max-w-[90%] bg-blue-500 active:translate-y-0.5  cursor-pointer" onClick={handleSignUp}>
								Sign-Up with Email
							</button>
							<button className="text-blue-700  cursor-pointer" onClick={() => { clearError(); setIsRegistering(false); }}>
								Already have an account? Sign In
							</button>
						</div>
					) : (
								<div className="grid grid-rows-4 place-items-center lg:w-100 lg:h-100 md:w-[60%] md:h-[90%] sm:w-80 sm:h-100 h-[50%] w-[70%] border-4 lg:gap-1 md:gap-0 sm:gap-0 gap-0 rounded-xl text-2xl ">
							<input
								className='h-10 w-[90%] border-2 rounded-sm bg-white text-black hover:bg-gray-300 '
								type="email"
								placeholder="Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<input
								className='h-10 w-[90%] border-2 rounded-sm bg-white text-black hover:bg-gray-300'
								type="password"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<button className="border-1 rounded-md w-[90%] h-9 max-w-[90%] bg-blue-500 active:translate-y-0.5 cursor-pointer" onClick={handleSignIn}>
								Sign-In with Email
							</button>
							<button className="border-1 rounded-md w-[90%] h-9 max-w-[90%] bg-blue-500 active:translate-y-0.5  cursor-pointer" onClick={handleClickPopup}>
								Sign-In with Gmail
							</button>
							<button className="text-blue-700 text-xl cursor-pointer" onClick={() => { clearError(); setIsRegistering(true); }}>
								Don't have an account? Register
							</button>
							{error && <p >{error}</p>}
						</div>
					)}
				</>
			)}
		</div>
	);
}
export default SignIn;
