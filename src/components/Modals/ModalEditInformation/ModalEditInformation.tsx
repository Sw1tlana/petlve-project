import style from '../../../scss/components/_modalEditInformation.module.scss';
import icons from '../../../shared/icons/sprite.svg';

import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
import { AppDispatch } from '../../../reduce/store';
import { useDispatch } from 'react-redux';
import { useId, useRef } from 'react';
// import { editInformationSchema } from '../../../shemas/editInformationShema';
// import { formValuesEditInform } from '../../../helpers/contacts';
import { userCurrentEdit } from '../../../reduce/auth/operations';

interface formData {
  uploadPhoto?: File | null;
  photoUrl: string;
  name: string;
  email: string;
  phone: string;
}

function ModalEditInformation() {
  const dispatch: AppDispatch = useDispatch();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

    const nameId = useId();
    const emailId = useId();
    const phoneId = useId();
    const photoUrl = useId();
    const uploadPhoto = useId();

      const { register, watch, reset, handleSubmit, formState: { errors } } = useForm<formData>({
        //  defaultValues: formValuesEditInform,
        //  resolver: yupResolver(editInformationSchema),
          mode: 'onTouched'
      });

      const phoneValue = watch('phone');
      const nameValue = watch('name');
      const emailValue = watch('email');

      // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      //   const file = event.target.files?.[0];
      //   if (file) {
      //     setValue("uploadPhoto", file, { shouldValidate: true });
      //   }
      // };

      const onSubmit = async (data: formData) => {
        try {
          const { uploadPhoto, ...rest } = data;

          const formDataForSubmit = {
            ...rest,
            uploadPhoto: uploadPhoto ?? new File([], "empty"),
          };
          
          await dispatch(userCurrentEdit(formDataForSubmit)).unwrap();
          reset(); 
        } catch (err) {
          console.error('Помилка редагування:', err);
        }
      };

      const handleButtonClick = () => {
        fileInputRef.current?.click();
      };

  return (
    <section className={style.sectionInformation}>
        <h2 className={style.titleInformation}>Edit information</h2>
        <div className={style.avatar}>
            <svg width={44} height={44} className={style.iconAvatar}>
                <use xlinkHref={`${icons}#icon-avatar`} />
            </svg>
        </div>
        <form className={style.formContainer} onSubmit={handleSubmit(onSubmit)}>
          <div className={style.containerUpload}>
              <div>
                <input
                        id={photoUrl}
                        type="url"
                        className={`input input--secondary ${style.inputUrl}`}
                        placeholder="https://ftp.goit.study/img/pets/5.webp"
                        {...register("photoUrl")}
                        autoComplete="off"
                        aria-required="true"
                      />
                      {errors.photoUrl?.message && 
                      (<p className={style.errorMsg}>{String(errors.photoUrl.message)}</p>)}
                    </div>
          
                    <div className={style.uploadInput}>
                      <input
      id={uploadPhoto}
      type="file"
      {...register("uploadPhoto")}
      ref={(e) => {
        register("uploadPhoto").ref(e);
        fileInputRef.current = e;
      }}
      aria-required="true"
      style={{ display: "none" }} 
                      />
                        <button 
                        onClick={handleButtonClick}
                        type="button"  
                        className={`input input--secondary ${style.uploadButton}`}>
                          <span className={style.spanBtn}>Uploat photo</span>
                        </button>
                      {errors.uploadPhoto?.message && (
                        <p className={style.errorMsg}>{String(errors.uploadPhoto.message)}</p>
                      )}
                      <svg width={20} height={20} className={style.iconUpload}>
                        <use xlinkHref={`${icons}#icon-upload-cloud`} />
                      </svg>
                    </div>
                  </div>

                    <div className={style.iconContainerAuth}>
                        <input
                        id={nameId}
                        type="name"
                        className={`input input--secondary ${!errors.name ? style.validName : ''}`}
                        placeholder="Name"
                        {...register('name')}
                        autoComplete="name"
                        aria-required="true"
                        />
                       {typeof errors.name?.message === "string" && 
                       <p className={style.errorMsg}>{errors.name.message}</p>}

                        {!errors.name && nameValue && (
                            <p className={style.successMsg}>Name is valid!</p>
                          )}

                       <div className="iconContainerAuth">
                       {errors.name && nameValue && (
                        <svg 
                          width={16} 
                          height={16} 
                          className={style.iconClose}>
                          <use xlinkHref={`${icons}#icon-close`} />
                        </svg>
                      )}
                      {!errors.name && nameValue && (
                        <svg 
                          width={16} 
                          height={16} 
                          className={style.iconCheck}>
                          <use xlinkHref={`${icons}#icon-check`} />
                        </svg>
                      )}
                      </div>
                    </div>

                      <div className={style.iconContainerAuth}>
                        <input
                        id={emailId}
                        type="email"
                        className={`input input--secondary ${!errors.email ? style.validEmail : ''}`}
                        placeholder="Email"
                        {...register('email')}
                        autoComplete="email"
                        aria-required="true"
                        />
                       {typeof errors.email?.message === "string" && 
                       <p className={style.errorMsg}>{errors.email.message}</p>}

                          {!errors.email && emailValue && (
                            <p className={style.successMsg}>Email is valid!</p>
                          )}

                          {errors.email && emailValue && (
                                <svg 
                                  width={16} 
                                  height={16} 
                                  className={style.iconClose}>
                                  <use xlinkHref={`${icons}#icon-close`} />
                                </svg>
                              )}
                              {!errors.email && emailValue && (
                                <svg 
                                  width={16} 
                                  height={16} 
                                  className={style.iconCheck}>
                                  <use xlinkHref={`${icons}#icon-check`} />
                                </svg>
                              )}
                        </div>
                        <div className={style.iconContainerAuth}>
                          <input
                          id={phoneId}
                           className={`input input--secondary ${!errors.phone && phoneValue ? style.validPhone : ''}`}
                          placeholder="+380 65 669 12 24"
                          {...register('phone')}
                          autoComplete="phone"
                          aria-required="true"
                          />
                       {typeof errors.phone?.message === "string" && 
                       <p className={style.errorMsg}>{errors.phone.message}</p>}

                        {!errors.phone && phoneValue && (
                          <p className={style.successMsg}>Email is valid!</p>
                          )}

                       <div>
                       {errors.phone&& phoneValue && (
                          <svg 
                            width={16} 
                            height={16} 
                            className={style.iconClose}>
                            <use xlinkHref={`${icons}#icon-close`} />
                          </svg>
                        )}
                        {!errors.phone && phoneValue && (
                          <svg 
                            width={16} 
                            height={16} 
                            className={style.iconCheck}>
                            <use xlinkHref={`${icons}#icon-check`} />
                          </svg>
                        )}  
                        </div> 
                    </div>

                    <button 
                        className={`btn btn--primary ${style.btnProfile}`} 
                        type="submit">
                          Go to profile
                    </button>
        </form>
    </section>
  )
};

export default ModalEditInformation;
