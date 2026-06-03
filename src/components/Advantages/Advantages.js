import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFeather, faGem, faShield } from '@fortawesome/free-solid-svg-icons';
import './Advantages.css';

function Advantages() {
    return (
        <div className='advantages'>
            <div className='container'>
                <hr />
                <div className='question'>
                    <h1>لماذا مسحه ؟</h1>
                </div>
                <div className='cards'>
                    <div className='card'>
                        <FontAwesomeIcon icon={faFeather} className="advantage-icon" />
                        <div className="info">
                            <h2>فريدة</h2>
                            <p>
                                استكشف عالم الفن بروح فريدة، حيث تتجلى الإبداعات بجمالها الخاص وتنبض بالحياة
                            </p>
                        </div>
                    </div>
                    <div className='card'>
                        <FontAwesomeIcon icon={faGem} className="advantage-icon" />
                        <div className="info">
                            <h2>مميزة</h2>
                            <p>
                                استمتع بتجربة استثنائية في عالم الفن حيث يلتقي التميز بالتألق لتجعل رحلتك الفنية لا تُنسى
                            </p>
                        </div>
                    </div>
                    <div className='card'>
                        <FontAwesomeIcon icon={faShield} className="advantage-icon" />
                        <div className="info">
                            <h2>أصلية</h2>
                            <p>
                                نحن نقدم قطعًا أصلية تم التحقق منها من قبل فريقنا المتخصص
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Advantages;
