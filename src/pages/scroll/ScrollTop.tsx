import { useEffect, useState } from 'react'
import { ChevronsUp } from 'lucide-react';


export const ScrollTop = () => {
    const [showScroll, setShowScroll] = useState(false);

	useEffect(() => {
		window.addEventListener('scroll', scrollToTop);
		return function cleanup() {
			window.removeEventListener('scroll', scrollToTop);
		};
	});
    
	const scrollToTop = () => {
		if (!showScroll && window.pageYOffset > 400) {
			setShowScroll(true);
		} else if (showScroll && window.pageYOffset <= 400) {
			setShowScroll(false);
		}
	};
    window.addEventListener('scroll', scrollToTop);
    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
    return (
        <div className='flex items-center justify-center '>
            <div style={{
					display: showScroll ? 'flex' : 'none'
				}} 
                className='absolute z-50 items-center justify-center w-8 h-8 text-2xl rounded-full cursor-pointer right-10 scrollToTop bottom-32 bg-slate-300 '  onClick={scrollTop}>
            <ChevronsUp className='text-white ' />
            </div>
        </div>
    )
}
