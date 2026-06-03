import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faBullseye } from '@fortawesome/free-solid-svg-icons';
import "./About.css";


function About() {
    return (
        <div className="about">
            <div className="box">
                <div className="question">
                    <FontAwesomeIcon icon={faUsers} className="about-icon" />
                    <h2>من نحن ؟</h2>
                </div>
                <ul>
                    <li>منصة تفاعلية لجميع الفنانين ومحبي اقتناء الفن.</li>
                    <li>مساحة مفتوحة للتعبير الفني والتبادل الثقافي.</li>
                    <li>مساحة مخصصة لنشر الفنون السعودية.</li>
                </ul>
            </div>

            <div className="box">
                <div className="question">
                    <FontAwesomeIcon icon={faBullseye} className="about-icon" />
                    <h2> أهدافنا </h2>
                </div>
                <ul>
                    <li>
                        توفير بيئة رقمية متكاملة لعرض الأعمال الفنية .
                    </li>
                    <li>تسويق وبيع الأعمال الفنية لجمهور واسع.</li>
                    <li>
                        تعزيز التواصل بين محبي الفن، مما يساهم ذلك في نشر الوعي
                        الفني في المجتمع.
                    </li>
                    <li>تطوير وتنمية المهارات الفنية للفنانين.</li>
                </ul>
            </div>

            {/* <div className="box">
                <div className="question">
                    <img src={yellow_logo} alt="" />
                    <h3>ما الذي نقدمه ؟</h3>
                </div>
                <ul>
                    <li>معارض افتراضية تفاعلية.</li>
                    <li>واجهة مستخدم سهلة الاستخدام.</li>
                    <li>ميزات تفاعلية للتواصل مع الفنانين.</li>
                    <li>دورات تدريبية وموارد تعليمية للفنانين و محبي الفن.</li>
                </ul>
            </div> */}

            <div className='vision'>
                <blockquote>”نحن نؤمن بأهمية الفن في تعزيز التواصل والتفاعل الثقافي وتعميق فهمنا للعالم من حولنا”</blockquote>
                {/* <div className="vision-container">
                    <div className="vision-square">
                        <img src={vision} alt="" />
                        <div className="overlay">
                            <p>رسالتنا</p>
                        </div>
                        <div className="hover-content">
                            <p>المساهمة في زيادة نشر ثقافة الفنون البصرية بشكل أكبر تضامًنا مع رؤية المملكة ٢٠٣٠ ، وضم انواع الفنون التشكيلية المختلفة في تطبيق رائد قائم على فريق من الكوادر السعودية يسعى ان يصبح مركًزا فنيًا لتنمية الإبداع العملي والمعرفي.</p>
                        </div>
                    </div>
                    <div className="vision-square">
                        <img src={vision} alt="" />
                        <div className="overlay">
                            <p>رؤيتنا</p>
                        </div>
                        <div className="hover-content">
                            <p>نسعى ان نكون منصة رائدة لإستقطاب الفنون التشكيلية وخلق فرص مميزة لتنمية القدرات الإنتاجية و الإبداعية للمجتمع الفني والمحلي وتعزيز الإستثمار بالفنون.</p>
                        </div>
                    </div>
                </div> */}
            </div>

        </div>
    );
}

export default About;
