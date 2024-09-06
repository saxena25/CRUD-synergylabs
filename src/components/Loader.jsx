import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

function Loader() {
    return ( 
        <>
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Button variant="primary" disabled>
                    <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    />
                    Loading...
                </Button>
            </div>
        </>
     );
}

export default Loader;