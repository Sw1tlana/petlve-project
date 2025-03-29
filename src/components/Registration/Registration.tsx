import Container from "../../shared/components/Container/Container";
import style from '../../scss/components/_registration.module.scss';
import authCat  from '../../shared/images/Auth/cat@2x.png';
import '../../scss/components/btn/types/_secondary.scss';
import '../../scss/components/btn/types/_primary.scss';
import icons from '../../shared/icons/sprite.svg';

import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom";

function Registration() {

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        mode: 'onTouched'
    });

    const onSubmit = () => {
      reset();
    }
    
  return (
    <section>
        <Container>
          <div className={style.wrapper}>
                <div className={style.containerImg}>

                <div className={style.containerNone}>
                <div className={style.containerAvatar}>
                  <div className={style.avatar}>
                      <svg width={30} height={30} className={style.iconAvatar}>
                        <use xlinkHref={`${icons}#icon-avatar`} />
                      </svg>
                    </div>
                  <div>
                  <div className={style.containerInfo}>
                    <h3 className={style.name}>Jack</h3>
                    <p className={style.data}>Birthday: 18.10.2021</p>
                  </div>
                    <p className={style.description}>
                        Jack is a gray Persian cat with green eyes. 
                        He loves to be pampered and groomed, 
                        and enjoys playing with toys.
                    </p>
                  </div>
                  </div>
              </div>
                  <img className={style.imgAuth} src={authCat} alt="cat"/>
                </div>

            <div className={style.containerForm}>
                <h3 className={style.titleForm}>
                   Registration
                </h3>
                <p className={style.textForm}>
                    Thank you for your interest in our platform. 
                </p>
                <form className={style.formAuth} onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <input
                        // id={namedId}
                        type="name"
                        className="input input--secondary"
                        placeholder="Name"
                        {...register('name')}
                        autoComplete="name"
                        aria-required="true"
                        />
                       {typeof errors.name?.message === "string" && 
                       <p className={style.errorMsg}>{errors.name.message}</p>}
                      <svg width={20} height={20} className={style.iconIncrement}>
                        <use xlinkHref={`${icons}#icon-eye`} />
                      </svg>
                      <svg width={20} height={20} className={style.iconIncrement}>
                        <use xlinkHref={`${icons}#icon-eye-off`} />
                      </svg>
                      <svg width={20} height={20} className={style.iconIncrement}>
                        <use xlinkHref={`${icons}#icon-close`} />
                      </svg>
                    </div>

                      <div>
                        <input
                        // id={emailId}
                        type="email"
                        className="input input--secondary"
                        placeholder="Email"
                        {...register('email')}
                        autoComplete="email"
                        aria-required="true"
                        />
                       {typeof errors.email?.message === "string" && 
                       <p className={style.errorMsg}>{errors.email.message}</p>}
                      <svg width={20} height={20} className={style.iconIncrement}>
                        <use xlinkHref={`${icons}#icon-eye`} />
                      </svg>
                      <svg width={20} height={20} className={style.iconIncrement}>
                        <use xlinkHref={`${icons}#icon-eye-off`} />
                      </svg>
                      <svg width={20} height={20} className={style.iconIncrement}>
                        <use xlinkHref={`${icons}#icon-close`} />
                      </svg>
                    </div>

                    <div>
                        <input
                        // id={passwordId}
                        type="password"
                        className="input input--secondary"
                        placeholder="Password"
                        {...register('password')}
                        autoComplete="current-password"
                        aria-required="true"
                        />
                       {typeof errors.password?.message === "string" && 
                       <p className={style.errorMsg}>{errors.password.message}</p>}
                      <svg width={20} height={20} className={style.iconIncrement}>
                        <use xlinkHref={`${icons}#icon-eye`} />
                      </svg>
                      <svg width={20} height={20} className={style.iconIncrement}>
                        <use xlinkHref={`${icons}#icon-eye-off`} />
                      </svg>
                      <svg width={20} height={20} className={style.iconIncrement}>
                        <use xlinkHref={`${icons}#icon-close`} />
                      </svg>
                    </div>

                    <div>
                        <input
                        // id={namedId}
                        type="password"
                        className="input input--secondary"
                        placeholder="Confirm password"
                        {...register('confirmPassword')}
                        autoComplete="new-password"
                        aria-required="true"
                        />
                       {typeof errors.password?.message === "string" && 
                       <p className={style.errorMsg}>{errors.password.message}</p>}
                      <svg width={20} height={20} className={style.iconIncrement}>
                        <use xlinkHref={`${icons}#icon-eye`} />
                      </svg>
                      <svg width={20} height={20} className={style.iconIncrement}>
                        <use xlinkHref={`${icons}#icon-eye-off`} />
                      </svg>
                      <svg width={20} height={20} className={style.iconIncrement}>
                        <use xlinkHref={`${icons}#icon-close`} />
                      </svg>
                    </div>

                    <div className={style.btnAuth}>
                        <button className="btn btn--primary" type="submit">Registration</button>
                    </div>
                    <Link className={style.linkForm} to="/register">Don’t have an account? 
                    <span className={style.span}>Register</span></Link>
                </form>
            </div>
          </div>
        </Container>

    </section>
  )
};

export default Registration;
