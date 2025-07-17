import { Request, Response } from 'express';
import { getTestCategories } from '../services/getCategories';

type categories = 'count' | 'time';

type testCategoriesResponseData = {
  category: categories;
  options: {
    length: number;
    label: string;
  }[];
};

export const testCategoriesConttroller = async (
  request: Request,
  response: Response
) => {
  try {
    const dbData = await getTestCategories();
    const results: testCategoriesResponseData[] = [
      {
        category: 'count',
        options: [],
      },
      {
        category: 'time',
        options: [],
      },
    ];

    for (const entry of dbData!) {
      if (entry.text_mode === 'count' && entry.word_count ) {
        results[0].options.push({
          length: entry.word_count,
          label: entry.label,
        });
      } else if (entry.text_mode === 'time' && entry.time_seconds) {
        results[1].options.push({
          length: entry.time_seconds,
          label: entry.label,
        });
      }
    }

    console.log('categories from db', dbData);
    response.status(201).send(results);
  } catch (err) {
    console.error(err);
    response.status(500).send(err);
  }
};
