import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import landing from '../../assets/images/landing_image.png';
import './Landing.css';


function Landing() {
  const { authToken } = useContext(AuthContext);

  return (
    <div className='landing'>
      <div className="landing-layout">
        <div className="landing-image">
          <img src={landing} alt="Landing artwork" />
        </div>
        <div className='content'>
          <h1>أهلًا بك في مسحه</h1>
          <p>
                 وجهتك المميزة لشراء اللوحات الفنية. اكتشف مجموعة مختارة بعناية من الأعمال الفنية التي تعكس مختلف الأذواق، لتجد القطعة التي تعبّر عنك وتضيف لمسة فنية فريدة إلى مساحتك. استمتع بتجربة سهلة وممتعة في تصفح وشراء اللوحات، حيث يلتقي الفن بالجمال في مكان واحد.
          </p>
          <div className="btns">

            <Link to="/shopping">تسوق الآن</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing;
