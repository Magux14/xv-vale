import { useEffect, useState } from 'react';
import { Envelope } from '../components/envelope/Envelope';
import Invitation from '../components/invitation/invitation';

const Home = () => {
    const [canScroll, setCanScroll] = useState(false);
    const [hasSound, setHasSound] = useState(true);

    useEffect(() => {
        console.log('canScroll', canScroll);
    }, [canScroll]);

    return (
        <div className={`global-container home `}>
            <div className={`global-container__content ${canScroll ? '' : 'not-scroll'}`}>
                <Envelope setCanScroll={setCanScroll} hasSound={hasSound} />
                <Invitation canScroll={canScroll} />
            </div>
            <div className="global-container__sound-container" onClick={() => setHasSound(prev => !prev)}>
                {
                    hasSound &&
                    <img src="./icons/volume-on.webp" width={50} height={50} alt="on" />
                }
                {
                    !hasSound &&
                    <img src="./icons/volume-off.webp" width={50} height={50} alt="off" />
                }
            </div>
        </div>
    );
};

export default Home;