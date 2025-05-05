import  Home from './home'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
export function WeatherCard({classNameWeather, name , description, icon,tempHi, tempLo , date , sunset , sunrise , temp,locationInput,setLocationInput,onClick}){
	return(
		<section className={classNameWeather}>
			<Home
				className='flex justify-center items-center w-full h-full border-1 rounded-lg bg-white cursor-pointer text-2xl hover:bg-gray-300'>
				<FontAwesomeIcon
					icon={faArrowRightFromBracket}
				/>
			</Home>
			<section className='grid w-full h-full '>
 				<input
					className='w-[full] h-10  border-3 rounded-lg bg-white text-black hover:bg-gray-300 place-items-center'
					type='text'
					placeholder='Search...City,State or Country'
					value={locationInput}
					onChange={(e) => {
					  setLocationInput(e.target.value);
					}}
					/>
				<button className='w-full h-10 border-1 rounded-lg  bg-white cursor-pointer hover:bg-gray-300' 
					onClick={(e)=> {
						e.preventDefault();
						setLocationInput(e.target.value);
						onClick();
					}}
				>Search</button>
			</section>
			<section className='grid w-full h-full place-items-center place-content-center text-full lg:text-4xl '>
				<div className='grid text-white place-items-center place-content-center w-fit h-full gap-2 '>
				<p >{name}</p>		
				<p>Today</p>
				<p>{date}</p>
				<p >HI: {tempHi}&deg;</p>
				<p >LO: {tempLo}&deg;</p>
				<p >sunrise: {sunrise}</p>		
				<p >sunset: {sunset}</p>		
				<img className='h-full w-full' alt='No image' src={icon}/>
				<p className='lg:text-5xl'>{description.toUpperCase()}</p>
				<p className='lg:text-5xl '>{temp}&deg;</p>
				</div>
			</section>
		</section>
	)
}