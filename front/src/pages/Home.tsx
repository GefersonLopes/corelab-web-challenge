import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import CardMaker from '../components/CardMaker';
import RenderCards from '../components/RenderCards';

import { listCards } from '../services/listCards';

import { ICard } from '../types/Card';

import { hideLoading, showLoading } from '../features/loading';

const Home = () => {
  const [cards, setCards] = useState<ICard[]>([]);
  const [favorites, setFavorites] = useState<ICard[]>([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showLoading());
    const fetchCards = async () => {
      const cardsData = await listCards();
      setCards(cardsData.filter((i) => !i.isFavorite));
      setFavorites(cardsData.filter((i) => i.isFavorite));

      setTimeout(() => dispatch(hideLoading()), 1000);
    };

    fetchCards();
  }, []);

  return (
    <main>
      <CardMaker />
      <ul className="p-0 mx-3 mx-md-5 my-5">
        {favorites.length > 0 && <RenderCards cardList={favorites} />}
        {cards.length > 0 && <RenderCards cardList={cards} />}
      </ul>
    </main>
  );
};

export default Home;
