import apierror from '../assets/apierror.png'

function Error() {
    return ( 
        <div className='error-parent'>
            <div className='error-wrapper'>
                <div className='error-left-box'>
                    <h1>Oops..</h1>
                    <h1>Invalid API Key!</h1>
                    <p>The page you were trying to reach is absolutely forbidden for some reason.</p>
                </div>
                <div className='error-right-box'>
                    <img className='error-img' src={apierror} alt="" />
                </div>
            </div>
        </div>
     );
}

export default Error;