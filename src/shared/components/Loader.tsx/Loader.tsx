import style from '../../../scss/components/_loader.module.scss';
import { useState, useEffect } from "react";
import Container from '../Container/Container';

function Loader() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if(prev >= 100) {
            clearInterval(interval);

            return 100;
          }

          return prev + 1;
        })
      }, 50);
      return () => clearInterval(interval);
    }, []);

  return (
    <>
      <Container>
      <div className={style.loaderContainer}>
                        <svg width="100" height="100" viewBox="0 0 100 100" className={style.loaderSvg}>
                    <circle cx="50" cy="50" r="40" stroke="#ddd" strokeWidth="5" fill="none" />
                    <circle
                        cx="50" cy="50" 
                        r="40" 
                        stroke="#007bff" 
                        strokeWidth="5"
                        fill="none"
                        strokeDasharray="251.2"
                        strokeDashoffset={251.2 - (progress / 100) * 251.2}
                        strokeLinecap="round"
                    />
                    <text x="50" y="55" textAnchor="middle" fontSize="16" fill="#007bff">{progress}%</text>
                </svg>
      </div>
      </Container>
    </>
  )
};

export default Loader;
