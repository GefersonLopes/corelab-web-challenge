import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import CardMaker from '../components/CardMaker';
import RenderCards from '../components/RenderCards';

import { listCards } from '../services/listCards';

import { hideLoading, showLoading } from '../features/loading';
import { useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { setCards } from '../features/cards';

const Home = () => {
  const { search } = useSelector((state: RootState) => state.params);
  const { favorites, noFavorites } = useSelector(
    (state: RootState) => state.cardsState,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showLoading());
    setTimeout(() => dispatch(hideLoading()), 1000);
  }, [favorites, noFavorites]);

  useEffect(() => {
    dispatch(showLoading());
    const fetchCards = async () => {
      const cardsFavorites = await listCards(
        `isFavorite=true${(search && '&' + search) || ''}`,
      );
      const cardsNotFavorites = await listCards(
        `isFavorite=false${(search && '&' + search) || ''}`,
      );
      dispatch(
        setCards({
          favorites: cardsFavorites,
          noFavorites: cardsNotFavorites,
        }),
      );

      setTimeout(() => dispatch(hideLoading()), 1000);
    };

    fetchCards();
  }, [search]);

  return (
    <main>
      <CardMaker />
      <ul className="p-0 mx-3 mx-md-5 my-5">
        {favorites.length > 0 && <RenderCards cardList={favorites} />}
        {noFavorites.length > 0 && <RenderCards cardList={noFavorites} />}
      </ul>
    </main>
  );
};

export default Home;
