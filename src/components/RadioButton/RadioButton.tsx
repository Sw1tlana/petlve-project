import style from '../../scss/components/_radioButton.module.scss';
import '../../scss/components/btn/types/_secondary.scss';

import { useState } from 'react';

function RadioButton() {
    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
      };

  return (
    <div>
      <label className={style.radioLabel}>
        <input
          type="radio"
          value="option1"
          checked={selectedOption === 'option1'}
          onChange={handleChange}
          className={style.radioInput}
        />
        <span className="input input--secondary"> </span>
        
      </label>
    </div>
  )
};

export default RadioButton;
