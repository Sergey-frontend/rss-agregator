import i18next from 'i18next';
import ru from './ru.js';

await i18next.init({
  lng: 'ru',
  debug: true,
  resources: {
    ru,
  },
});

