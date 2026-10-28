import { useEffect, useState } from 'react';
import { Envelope } from '../components/envelope/Envelope';
import Invitation from '../components/invitation/invitation';

const Home = () => {
    const [canScroll, setCanScroll] = useState(false);
    const [hasSound] = useState(true);

    useEffect(( )=> {
        console.log('canScroll',canScroll);
    }, [canScroll]);

    return (
        <div className={`global-container home `}>
            <div className={`global-container__content ${canScroll ? '': 'not-scroll'}`}>
                <Envelope setCanScroll={setCanScroll} hasSound={hasSound} />
                <Invitation canScroll={canScroll}  />
            </div>
        </div>
    );
};

export default Home;