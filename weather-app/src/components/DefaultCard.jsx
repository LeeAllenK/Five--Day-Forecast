export function DefaultCard({day , icon , temp ,tempHi, tempLo, description,className }) {
	return (
		<section className={className}  >
			<p className='text-white'>{day}</p>
			<p className='text-white'>{temp}&deg;</p>
			<img className='lg:h-40 lg:w-40 md:h-40 md:w-40 sm:h-30 sm:w-30 w-fit h-fit' alt='weather icon' src={icon}/>
			<p className='text-white'>HI {tempHi}&deg;</p>
			<p className='text-white'>Lo {tempLo}&deg;</p>
			<p className='text-white lg:text-3xl md:text-md sm:text-sm text-[11px] h-10'>{description}</p>
		</section>

	)
}