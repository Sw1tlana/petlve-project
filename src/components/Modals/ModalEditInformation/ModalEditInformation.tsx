import style from '../../../scss/components/_modalEditInformation.module.scss';
import { useForm, SubmitHandler, Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AppDispatch } from '../../../reduce/store';
import { useDispatch, useSelector } from 'react-redux';
import { useId, useRef } from 'react';
import { editInformationSchema } from '../../../shemas/editInformationShema';
import { userCurrentEdit } from '../../../reduce/auth/operations';
import { selectUser } from '../../../reduce/auth/selectors';
import { User } from '../../../reduce/auth/slice';
import { CurrentFormData } from '../../../reduce/services/authServices';
import icons from '../../../shared/icons/sprite.svg';
import toast from 'react-hot-toast';

type formData = {
  name?: string | null | undefined;
  email?: string | null | undefined;
  phone?: string | null | undefined;
  photoUrl?: string | null | undefined;
  uploadPhoto?: File | null | undefined;
};

function ModalEditInformation() {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector(selectUser) as User | null;

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const getUserAvatarUrl = (avatar: string) => {
  const isAbsoluteUrl = /^https?:\/\//.test(avatar);
  return isAbsoluteUrl
    ? `${avatar}?t=${Date.now()}`
    : `https://petlve-api.onrender.com${avatar}?t=${Date.now()}`;
};

  const nameId = useId();
  const emailId = useId();
  const phoneId = useId();
  const photoUrlId = useId();
  const uploadPhoto = useId();

  const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<formData>({
    resolver: yupResolver(editInformationSchema) as Resolver<formData>,
    defaultValues: {
      name: undefined,
      email: undefined,
      phone: undefined,
      photoUrl: undefined,
      uploadPhoto: null,
    },
    mode: 'onTouched',
  });

  const phoneValue = watch('phone');
  const nameValue = watch('name');
  const emailValue = watch('email');
   const photoUrlValue = watch('photoUrl');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue("uploadPhoto", file, { shouldValidate: true });
    }
  };

const onSubmit: SubmitHandler<formData> = async (data) =>{
  if (!data.name && !data.email && !data.phone && !data.photoUrl && !data.uploadPhoto) {
    return;
  }

  try {
      const formDataForSubmit: Partial<CurrentFormData> = {};

      if (data.name) formDataForSubmit.name = data.name;
      if (data.email) formDataForSubmit.email = data.email;
      if (data.phone) formDataForSubmit.phone = data.phone;

      if (data.uploadPhoto) {
        formDataForSubmit.uploadPhoto = data.uploadPhoto;
        formDataForSubmit.photoUrl = ''; 
      } else if (data.photoUrl?.trim()) {
        formDataForSubmit.photoUrl = data.photoUrl.trim();
      }
    await dispatch(userCurrentEdit(formDataForSubmit as CurrentFormData)).unwrap();
    reset();
    } catch (err) {
    if (err instanceof Error) {
      toast.error('The data could not be updated. Check the link or try again.');  
  } else {
      toast.error('Unknown error occurred.');
  }
  }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const { ref: uploadPhotoRef, ...uploadPhotoRest } = register("uploadPhoto");

  return (
    <section className={style.sectionInformation}>
      <h2 className={style.titleInformation}>Edit information</h2>
        {user?.avatar ? (
          <img
            className={style.userPhoto}
            src={getUserAvatarUrl(user.avatar)}
            alt="User avatar"
          />
        ) : (
          <div className={style.avatar}>
            <svg width={44} height={44} className={style.iconAvatar}>
              <use xlinkHref={`${icons}#icon-avatar`} />
            </svg>
          </div>
        )}
      <form className={style.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <div className={style.containerUpload}>
          <div>
            <input
              id={photoUrlId}
              type="url"
              className={`input input--secondary ${style.inputUrl}`}
              placeholder="https://ftp.goit.study/img/pets/5.webp"
              {...register("photoUrl")}
              autoComplete="off"
              aria-required="true"
            />
            {errors.photoUrl?.message && (
              <p className={style.errorMsg}>{String(errors.photoUrl.message)}</p>
            )}

            {photoUrlValue && (
                <img
                  src={`${photoUrlValue}?t=${Date.now()}`}
                  alt="Preview"
                  className={style.previewImage}
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
            )}
          </div>

          <div className={style.uploadInput}>
            <input
              id={uploadPhoto}
              type="file"
              {...uploadPhotoRest}
              ref={(e) => {
                uploadPhotoRef(e);
                fileInputRef.current = e;
              }}
              onChange={handleFileChange}
              aria-required="true"
              style={{ display: "none" }}
            />
            <button
              onClick={handleButtonClick}
              type="button"
              className={`input input--secondary ${style.uploadButton}`}
            >
              <span className={style.spanBtn}>Upload photo</span>
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
            type="text"
            className={`input input--secondary ${!errors.name && nameValue ? "validName" : ''}`}
            placeholder="Name"
            {...register('name')}
            autoComplete="name"
            aria-required="true"
          />
          {errors.name?.message && (
            <p className={style.errorMsg}>{errors.name.message}</p>
          )}
        </div>

        <div className={style.iconContainerAuth}>
          <input
            id={emailId}
            type="email"
            className={`input input--secondary ${!errors.email && emailValue ? "validEmail" : ''}`}
            placeholder="Email"
            {...register('email')}
            autoComplete="email"
            aria-required="true"
          />
          {errors.email?.message && (
            <p className={style.errorMsg}>{errors.email.message}</p>
          )}
        </div>

        <div className={style.iconContainerAuth}>
          <input
            id={phoneId}
            className={`input input--secondary ${!errors.phone && phoneValue ? "validPhone" : ''}`}
            placeholder="+380 65 669 12 24"
            {...register('phone')}
            autoComplete="phone"
            aria-required="true"
          />
          {errors.phone?.message && (
            <p className={style.errorMsg}>{errors.phone.message}</p>
          )}
        </div>

        <button className={`btn btn--primary ${style.btnSave}`} type="submit">
         Save
        </button>
      </form>
    </section>
  );
}

export default ModalEditInformation;
