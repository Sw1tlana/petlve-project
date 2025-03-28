import { useState } from 'react';
import style from '../../scss/components/_searchFild.module.scss';
import icons from '../../shared/icons/sprite.svg';
import '../../scss/components/btn/types/_secondary.scss';
import toast from 'react-hot-toast';

interface SearchFieldProps {
    className?: string;
    placeholder?: string;
    onSearch?: (query: string) => void;
}

const SearchField: React.FC<SearchFieldProps> = ({ className, placeholder = "Search", onSearch }) => {  
    const [query, setQuery] = useState("");

    const handleSearch = () => {
        if (query.trim() !== "") {
            onSearch?.(query);
        } else {
            toast.error("Please enter a search query!");
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className={`${style.formSearch} ${className || ''}`}>
            <div className={style.inputSearch}>
                <input
                    type="text"
                    name="query"
                    placeholder={placeholder}
                    className={`input input--secondary ${className || ''}`}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                    <svg className={`${style.iconSearch} ${className || ''}`} width={12} height={12}>
                        <use xlinkHref={`${icons}#icon-search`} />
                    </svg>
            </div>
        </div>
    );
};

export default SearchField;

