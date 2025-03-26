import style from '../../scss/components/_radioButton.module.scss';
import '../../scss/components/btn/types/_secondary.scss';
import icons from '../../shared/icons/sprite.svg';

import { useEffect, useState } from 'react';

function RadioButton() {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
      };

      const handleClose = () => {
        console.log('Закрито', selectedOption); 
        setSelectedOption(null);
      };

      useEffect(() => {
        console.log('selectedOption після оновлення:', selectedOption); 
      }, [selectedOption]);

  return (
    <div className={style.radioContainer}>
      <label className={style.radioLabel}>
        <input
          type="radio"
          value="popularity"
          checked={selectedOption === 'popularity'}
          onChange={handleChange}
          className={style.radioInput}
        />
          <div className={style.customRadio}>
            <span className={style.spanText}>Popular</span>
            {selectedOption === 'popularity' && (
            <svg width={12} height={12} className={style.iconClose}   
              onClick={handleClose}>
              <use xlinkHref={`${icons}#icon-close`} />
            </svg>
          )}
      </div>     
      </label>

      <label className={style.radioLabel}>
        <input
          type="radio"
          value="unpopular"
          checked={selectedOption === 'unpopular'}
          onChange={handleChange}
          className={style.radioInput}
        />
          <div className={style.customRadio}>
            <span className={style.spanText}>Unpopular</span>
            {selectedOption === 'unpopular' && (
            <svg width={12} height={12} className={style.iconClose}   
              onClick={handleClose}>
              <use xlinkHref={`${icons}#icon-close`} />
            </svg>
          )}
      </div>     
      </label>

      <label className={style.radioLabel}>
        <input
          type="radio"
          value="cheap"
          checked={selectedOption === 'cheap'}
          onChange={handleChange}
          className={style.radioInput}
        />
          <div className={style.customRadio}>
            <span className={style.spanText}>Cheap</span>
            {selectedOption === 'cheap' && (
            <svg width={12} height={12} className={style.iconClose}   
              onClick={handleClose}>
              <use xlinkHref={`${icons}#icon-close`} />
            </svg>
          )}
      </div>     
      </label>

      <label className={style.radioLabel}>
        <input
          type="radio"
          value="expensive"
          checked={selectedOption === 'expensive'}
          onChange={handleChange}
          className={style.radioInput}
        />
          <div className={style.customRadio}>
            <span className={style.spanText}>Expensive</span>
            {selectedOption === 'expensive' && (
            <svg width={12} height={12} className={style.iconClose}   
              onClick={handleClose}>
              <use xlinkHref={`${icons}#icon-close`} />
            </svg>
          )}
      </div>     
      </label>
    </div>
  )
};


export default RadioButton;
