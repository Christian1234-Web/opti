
import { Spinner } from 'reactstrap'

export const LoaderGrow = () => {

    return (
        <div style={{
            backgroundColor: '#7a7a7d', position: 'fixed', width: '100vw', height: '100vh',
            top: '0', left: '0', right: '0', bottom: '0', zIndex: '1050'
            , opacity: '0.5'
        }} className="text-center">

            <div className='' style={{ top: '50%', position: 'fixed', left:'48%' }}>
                <Spinner type='grow' size={'50'} color='primary' />
                <Spinner type='grow' color='secondary' />
                <Spinner type='grow' color='success' />
                <Spinner type='grow' color='danger' />
                <Spinner type='grow' color='warning' />
                <Spinner type='grow' color='info' />
                <Spinner type='grow' color='light' />
                <Spinner type='grow' color='dark' />
            </div>
        </div>
    )
}
