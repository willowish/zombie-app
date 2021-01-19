import { Item } from '../../items/entities/item.entity';

export const extractItemsSumValue = (items: Item[], rates) =>
  items
    .map((i) => ({
      PLN: i.price,
      EUR: rates.find((r) => r.code === 'EUR').bid * i.price,
      USD: rates.find((r) => r.code === 'USD').bid * i.price,
    }))
    .reduce(({ EUR, PLN, USD }, item) => ({
      PLN: PLN + item.PLN,
      EUR: EUR + item.EUR,
      USD: USD + item.USD,
    }));
