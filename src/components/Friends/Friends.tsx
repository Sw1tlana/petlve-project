import { useDispatch, useSelector } from 'react-redux';


import style from '../../scss/components/_friends.module.scss';
import Container from '../../shared/components/Container/Container';
import { selectIsLoggedInFriends, selectItems } from '../../reduce/friends/selectors';
import Loader from '../../shared/components/Loader.tsx/Loader';
import { fetchFriends } from '../../reduce/friends/operations';
import { useEffect } from 'react';
import { AppDispatch } from '../../reduce/store';
import { Link } from 'react-router-dom';

type workDay = {
  _id: string;
  isOpen: boolean;
  from: string;
  to: string;
};

type Friend = {
  _id: string;
  imageUrl: string;
  title: string;
  url: string;
  address: string;
  addressUrl: string;
  phone: string;
  email: string;
  workDays: workDay[];
};

function Friends() {
  const dispatch = useDispatch<AppDispatch>();
  const rawFriends = useSelector(selectItems);
  const friends: Friend[] = Array.isArray(rawFriends) ? rawFriends : [];
  const loading = useSelector(selectIsLoggedInFriends);

  useEffect(() => {
    dispatch(fetchFriends())
  }, [dispatch]);

  console.log('Friends:', friends); 

  return (
    <section>
        <Container>
        <h2 className={style.friendsTitle}>Our friends</h2>
        {loading && <Loader />}
        {!loading && friends.length === 0 && <Loader/>}
        {friends.length > 0 && (
          <ul className={style.listFriends}>
            {friends.map((friend, index: number) => (
              <li key={`${friend._id}-${index}`} className={style.friendItem}>
                <img
                  src={friend.imageUrl}
                  alt={friend.title}
                  className={style.friendImage}
                />

                <div className={style.containerInfo}>
                <h3 className={style.friendTitle}>{friend.title}</h3>
                <Link
                    className={style.friendAddress}
                    to={friend.addressUrl} 
                    target="_blank" 
                    rel="noopener noreferrer">
                    {friend.address}
                </Link>
                <p className={style.friendText}><span className={style.miniWrapper}>Phone</span> {friend.phone}</p>
                <p className={style.friendText}><span className={style.miniWrapper}>Email</span> {friend.email}</p>
                </div>

                <div className={style.workDays}>
                  {friend.workDays.length > 0 ? (
                    <p className={style.infoTime}>
                      {
                        (() => {
                          const openDay = friend.workDays.find(day => day.isOpen);
                          return openDay ? `${openDay.from} : ${openDay.to}` : 'Closed';
                        })()
                      }
                    </p>
                  ) : (
                    <p className={style.textInfo}>No information about the schedule!</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
        </Container>
    </section>
  )
};

export default Friends;
