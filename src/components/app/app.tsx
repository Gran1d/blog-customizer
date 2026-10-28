import { defaultArticleState } from '@/constants/articleProps.ts';
import { clsx } from 'clsx';
import { useState, type CSSProperties } from 'react';

import { ArticleParamsForm } from '@components/article-params-form';

import { Article } from '../article/Article';

import styles from './app.module.scss';

export const App = (): React.JSX.Element => {
  const [currentArticleState, setCurrentArticleState] = useState(defaultArticleState);

  return (
    <main
      className={clsx(styles.main)}
      style={
        {
          '--font-family': currentArticleState.fontFamilyOption.value,
          '--font-size': currentArticleState.fontSizeOption.value,
          '--font-color': currentArticleState.fontColor.value,
          '--container-width': currentArticleState.contentWidth.value,
          '--bg-color': currentArticleState.backgroundColor.value,
        } as CSSProperties
      }
    >
      <ArticleParamsForm onChange={setCurrentArticleState} />
      <Article />
    </main>
  );
};
