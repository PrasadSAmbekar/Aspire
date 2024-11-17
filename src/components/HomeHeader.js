import ImageGallery from 'react-image-gallery';
import { headerdata } from "../assets/data"

function HomeHeader () {
    return (
        <div className="w-[100%] h-[auto] min-h-[400px] flex flex-row items-center mt-10 px-20 max-[800px]:px-10 gap-8 max-[1200px]:px-12 max-[1100px]:px-16px max-[1100px]:flex-col">
            <div className="w-[40%] min-w-[300px] min-[1100px]:max-w-[640px] max-[1100px]:w-[70%] max-[900px]:w-[80%]">
                <ImageGallery items={ headerdata.images } showThumbnails={ false } showBullets={ false } showIndex={ false } showFullscreenButton={ false } showNav={ false } showPlayButton={ false } autoPlay={ true } slideInterval={ 6000 } />
            </div>
            <div className='w-[60%] flex flex-col p-1 font-sans max-[1100px]:w-[75%] max-[900px]:w-[85%]'>
                <h1 className='text-4xl text-slate-800 font-bold font tracking-wide mb-2 leading-10'>{ headerdata.title }</h1>
                <h2 className='text-xl text-slate-600 font-light'>{ headerdata.subtitle }</h2>
            </div>
        </div>
    );
}

export default HomeHeader;